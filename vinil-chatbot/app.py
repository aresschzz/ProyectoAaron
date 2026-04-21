from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot_core import procesar_mensaje, generar_respuesta
import psycopg2
import os
from rapidfuzz import process  

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    "dbname": os.getenv("DB_NAME", ""),
    "user": os.getenv("DB_USER", ""),
    "password": os.getenv("DB_PASS", ""),
    "host": os.getenv("DB_HOST", ""),
    "port": os.getenv("DB_PORT", ""),
}
def sugerir(nombre, lista):
    if not lista:
        return None
    resultado = process.extractOne(nombre, lista, score_cutoff=65)
    return resultado[0] if resultado else None

def obtener_datos_db():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    cur.execute("SELECT nombre FROM artista;")
    artistas = [r[0].lower() for r in cur.fetchall()]

    cur.execute("SELECT nombre FROM genero;")
    generos = [r[0].lower() for r in cur.fetchall()]

    cur.execute("SELECT nombre FROM empresa;")
    disqueras = [r[0].lower() for r in cur.fetchall()]

    cur.close()
    conn.close()

    return artistas, generos, disqueras

def buscar_vinilos_db(artista=None, genero=None, disquera=None):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()

    artista_q = artista.lower() if artista else None
    genero_q  = genero.lower()  if genero  else None
    disquera_q = disquera.lower() if disquera else None

    query = """
        SELECT c.nombre_albums, a.nombre, g.nombre, e.nombre, v.precio_venta
        FROM vinilo v
        JOIN catalogo_vinilo c ON v.id_catalogo = c.id_catalogo_vinilo
        JOIN artista a ON c.id_artista = a.id_artista
        JOIN genero g ON c.id_genero = g.id_genero
        JOIN empresa e ON c.id_empresa = e.id_empresa
        WHERE v.disponible = true
          AND (%s IS NULL OR a.nombre ILIKE %s)
          AND (%s IS NULL OR g.nombre ILIKE %s)
          AND (%s IS NULL OR e.nombre ILIKE %s)
        LIMIT 10;
    """

    cur.execute(query, (
        artista_q, f"%{artista_q}%" if artista_q else None,
        genero_q,  f"%{genero_q}%"  if genero_q  else None,
        disquera_q, f"%{disquera_q}%" if disquera_q else None,
    ))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    return [
        {
            "album": r[0],
            "artista": r[1],
            "genero": r[2],
            "disquera": r[3],
            "precio": float(r[4])
        }
        for r in rows
    ]

@app.route("/chat", methods=["POST"])
def chat():
    CONF_MIN = 0.15

    data = request.get_json() or {}
    mensaje = data.get("mensaje", "")
    mensaje_lower = mensaje.lower()

    artistas_db, generos_db, disqueras_db = obtener_datos_db()

    resultado = procesar_mensaje(mensaje, artistas_db, generos_db, disqueras_db)
    respuesta_base = generar_respuesta(resultado)

    artista = resultado.get("artista")
    genero = resultado.get("genero")
    disquera = resultado.get("disquera")
    intencion = resultado["intencion"]


    if intencion in ["busqueda", "compra"]:
        if not artista and not genero and not disquera:
            return jsonify({"respuesta": "Lamento mucho las molestias pero no logre identificar a lo que te referias  ..."})
        

        if resultado["confianza"] < CONF_MIN and not artista and not genero and not disquera:
            return jsonify({"respuesta": "No estoy seguro..."})

            if resultado["confianza"] < CONF_MIN:
                if not artista and not genero and not disquera:  # ← agregar esta condición
                    return jsonify({
                        "respuesta": "No estoy seguro de haber entendido, intenta reformular tu búsqueda, para una mayor poosibilidad de busqueda intenta poer artista, disquera o genero justo antes."
                    })

    advertencia = None
    if artista and artista not in artistas_db:
        sug = sugerir(artista, artistas_db)
        if sug:
            advertencia = f"No encontré '{artista}' exactamente, mostrando resultados para '{sug}'."
            artista = sug  


    if genero and genero not in generos_db:
        sug = sugerir(genero, generos_db)
        return jsonify({
            "respuesta": f"No encontré el género '{genero}' "
                         + (f"\n¿Quisiste decir '{sug}'?" if sug else "")
        })

    if disquera and disquera not in disqueras_db:
        sug = sugerir(disquera, disqueras_db)
        return jsonify({
            "respuesta": f"No encontré la disquera '{disquera}'"
                         + (f"\n¿Quisiste decir '{sug}'?" if sug else "")
        })

    if intencion in ["busqueda", "compra"] and (artista or genero or disquera):

        items = buscar_vinilos_db(
            artista=artista,
            genero=genero,
            disquera=disquera
        )

        if items:
            lista = "\n".join(
                [f"- {i['album']} ({i['artista']} - {i['disquera']}) — ${i['precio']}" for i in items]
            )

            respuesta = f"{respuesta_base}\n\nEncontré {len(items)} vinilos:\n{lista}"

            if advertencia:
                respuesta = advertencia + "\n\n" + respuesta

        else:
            criterio = " / ".join(filter(None, [artista, genero, disquera]))
            respuesta = (
                f"No encontré resultados para '{criterio}' \n"
                "Puede que no exista o esté agotado."
            )

    else:
        respuesta = respuesta_base

    return jsonify({
        "respuesta": respuesta,
        "debug": resultado
    })
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)