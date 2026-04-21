from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from rapidfuzz import fuzz
import warnings
import random

warnings.filterwarnings("ignore", category=UserWarning, module='scipy')

corpus = [
    "quiero pop de lady gaga",
    "busco musica pop de taylor swift",
    "me gusta el rock de nirvana",
    "quiero jazz de miles davis",
    "busco vinilos de jazz de john coltrane",
    "busco vinilos de rock de metallica",
]

stopwords_es = [
    "de","la","el","que","y","a","en",
    "un","una","me","mi","por","para",
    "con","lo","los","las","del",
]

intenciones = {
    "busqueda": [
        "busco", "quiero", "dame", "muéstrame", "tienen", "hay",
        "buscando", "buscar", "información", "informacion",        # ← nuevas
        "tienes", "existe", "existir", "ver", "mostrar", "muestrame"
    ],
    "compra": ["comprar", "precio", "cuánto", "costo", "vale", "compra"],
    "saludo": ["hola", "buenas", "hey", "buenos"],
    "despedida": ["adiós", "bye", "nos vemos", "gracias", "adios"]
}

PALABRAS_CONTEXTO = [
    "artista", "artistas", "genero", "género",
    "disquera", "disqueras", "banda", "grupo",
]

plantillas_busqueda = [
    "Buscando vinilos sobre el artista {artista}",
    "Buscando informacion sobre el genero {genero}",
    "Buscando la disquera {disquera}",
    
    "Buscando vinilos de {artista} del genero {genero}",
    "Buscando vinilos de {genero} de {artista}",
    "Buscando vinilos de {artista} de la disquera {disquera}",
    "Buscando vinilos de la disquera {disquera} del artista {artista}",
    "Buscando vinilos del genero {genero} de la disquera {disquera}",
    "Buscando vinilos de la disquera {disquera} del genero {genero}",

    "Buscando vinilos de {artista} del genero {genero} de la disquera {disquera}",
    "Buscando vinilos de {artista} de la disquera {disquera} del genero {genero}",
    "Buscando vinilos del genero {genero} de {artista} de la disquera {disquera}",
    "Buscando vinilos del genero {genero} de la disquera {disquera} de {artista}",
    "Buscando vinilos de la disquera {disquera} de {artista} del genero {genero}",
    "Buscando vinilos de la disquera {disquera} del genero {genero} de {artista}",
]

vectorizer = CountVectorizer(stop_words=stopwords_es, ngram_range=(1,2))
X = vectorizer.fit_transform(corpus)

contexto = {"genero": None, "artista": None, "disquera": None}

def limpiar_texto(texto):
    t = texto.lower()
    for p in PALABRAS_CONTEXTO:
        t = t.replace(p, " ")
    return " ".join(t.split())  


def detectar_artista(texto, lista_artistas):
    texto = texto.lower()

    # 1. Match directo
    for artista in lista_artistas:
        if artista in texto:
            return artista

    # 2. Fuzzy match
    mejor_score = 0
    mejor = None
    for artista in lista_artistas:
        if len(artista) < 4:
            continue
        score = fuzz.token_set_ratio(artista, texto)
        if score > mejor_score:
            mejor_score = score
            mejor = artista

    if mejor_score >= 85:
        return mejor

    # 🔥 3. NUEVO: detectar posible nombre libre
    palabras = texto.split()
    if len(palabras) >= 2:
        posible = " ".join(palabras[-2:])
        return posible  # ← esto permite "lady gaga"

    return None

def detectar_genero(texto, lista_generos):
    texto = texto.lower()
    mejor_score = 0
    mejor = None

    for genero in lista_generos:
        score = fuzz.partial_ratio(genero, texto)
        if score > mejor_score:
            mejor_score = score
            mejor = genero

    return mejor if mejor_score >= 80 else None

def detectar_disquera(texto, lista_disqueras):
    texto = texto.lower()
    mejor_score= 0
    mejor = None

    for disquera in lista_disqueras:
        score = fuzz.partial_ratio(disquera, texto)
        if score > mejor_score:
            mejor_score = score
            mejor = disquera

    return mejor if mejor_score >= 90 else None

def detectar_intencion(texto, artista_detectado, genero_detectado, disquera_detectado):
    texto = texto.lower()

    for i, palabras in intenciones.items():
        if any(p in texto for p in palabras):
            return i

    if artista_detectado or genero_detectado or disquera_detectado:
        return "busqueda"

    return "desconocida"

palabras_continuacion = ["y", "pero", "también", "o", "ahora", "qué", "que"]

def es_continuacion(texto):
    texto = texto.lower().strip()
    palabras = texto.split()
    return palabras[0] in palabras_continuacion 


def procesar_mensaje(texto, artistas_db, generos_db, disqueras_db):
    texto_limpio = limpiar_texto(texto)
    genero_detectado   = detectar_genero(texto_limpio, generos_db)  
    artista_detectado  = detectar_artista(texto_limpio, artistas_db)  
    disquera_detectado = detectar_disquera(texto_limpio, disqueras_db) 
    intencion = detectar_intencion(texto, artista_detectado, genero_detectado, disquera_detectado)

    continuacion = es_continuacion(texto)

    if artista_detectado:
        contexto["artista"] = artista_detectado
    elif continuacion and contexto["artista"]:
        artista_detectado = contexto["artista"]
    else:
        contexto["artista"] = None

    if genero_detectado:
        contexto["genero"] = genero_detectado
    elif continuacion and contexto["genero"]:
        genero_detectado = contexto["genero"]

    if disquera_detectado:
        contexto["disquera"] = disquera_detectado
    elif continuacion and contexto["disquera"]:
        disquera_detectado = contexto["disquera"]
    else:
        contexto["disquera"] = None  

    resultado = {
        "intencion": intencion,
        "genero": genero_detectado,
        "artista": artista_detectado,
        "disquera": disquera_detectado,
        "confianza": 0.0
    }

    try:
        frase_vec = vectorizer.transform([texto])
        similitudes = cosine_similarity(frase_vec, X)
        resultado["confianza"] = float(similitudes[0][np.argmax(similitudes)])
    except:
        pass

    return resultado

def generar_respuesta(resultado):

    i = resultado["intencion"]
    genero = resultado.get("genero")
    artista = resultado.get("artista")
    disquera = resultado.get("disquera")

    if i == "saludo":
        return "¡Hola! Mucho gusto, soy una chatbot en su fase beta, puedo buscar informacion sobre cualquier vinilo, si no encuentro informacion prueba con otras palabras :)"

    if i == "despedida":
        contexto["genero"] = None
        contexto["artista"] = None
        contexto["disquera"] = None
        return "¡Hasta luego! "



    if i == "busqueda":
        if artista and genero and disquera:
            plantillas_3 = [p for p in plantillas_busqueda if '{artista}' in p and '{genero}' in p and '{disquera}' in p]
            return random.choice(plantillas_3).format(artista=artista, genero=genero, disquera=disquera)
        elif artista and genero:
            plantillas_2 = [p for p in plantillas_busqueda if '{artista}' in p and '{genero}' in p and '{disquera}' not in p]
            return random.choice(plantillas_2).format(artista=artista, genero=genero)
        elif artista and disquera:
            plantillas_2 = [p for p in plantillas_busqueda if '{artista}' in p and '{disquera}' in p and '{genero}' not in p]
            return random.choice(plantillas_2).format(artista=artista, disquera=disquera)
        elif genero and disquera:
            plantillas_2 = [p for p in plantillas_busqueda if '{genero}' in p and '{disquera}' in p and '{artista}' not in p]
            return random.choice(plantillas_2).format(genero=genero, disquera=disquera)
        elif artista:
            return f"Claro, buscaré vinilos de: {artista}"
        elif genero:
            return f"Buscando vinilos del género {genero}"
        elif disquera:
            return f"Buscando vinilos de la disquera {disquera}"
        else:
            return "¿Qué artista o género te interesa?"
            
    if i == "compra":
        return "Claro, te puedo ayudar a comprar cualquier vinilo"

    if artista or genero:
        partes = []
        if artista:
            partes.append(f"{artista}")
        if genero:
            partes.append(f"{genero}")
        if disquera:
            partes.append(f"{disquera}")

        return f"Claro, buscare vinilos de {' '.join(partes)}"

    return "No logro identificar la intencion, si buscas un artista intenta poner la palabra artista antes"