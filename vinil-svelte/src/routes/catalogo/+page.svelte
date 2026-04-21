<script>
  const { data } = $props();
  let busqueda = $state('');
  let generoFiltro = $state('');
  let chatAbierto = $state(false);
  let mensaje = $state('');
  let mensajes = $state([
    { tipo: 'bot', texto: '¡Hola! Mucho gusto, soy una chatbot en su fase beta, puedo buscar informacion sobre cualquier vinilo, si no encuentro informacion prueba con otras palabras :)' }
  ]);

  const generos = $derived([...new Set(data.vinilos.map(v => v.catalogo_vinilo?.genero?.nombre).filter(Boolean))]);
  const vinilosFiltrados = $derived(data.vinilos.filter(v => {
    const album   = v.catalogo_vinilo?.nombre_albums?.toLowerCase() ?? '';
    const artista = v.catalogo_vinilo?.artista?.nombre?.toLowerCase() ?? '';
    const genero  = v.catalogo_vinilo?.genero?.nombre ?? '';
    const coincideBusqueda = album.includes(busqueda.toLowerCase()) || artista.includes(busqueda.toLowerCase());
    const coincideGenero   = generoFiltro === '' || genero === generoFiltro;
    return coincideBusqueda && coincideGenero;
  }));

  async function enviarMensaje() {
    if (!mensaje.trim()) return;
    const textoUsuario = mensaje;
    mensajes = [...mensajes, { tipo: 'user', texto: textoUsuario }];
    mensaje = '';

    try {
      const res = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: textoUsuario })
      });
      const data = await res.json();
      mensajes = [...mensajes, { tipo: 'bot', texto: data.respuesta }];
    } catch (err) {
      mensajes = [...mensajes, { tipo: 'bot', texto: 'Error al conectar 😕' }];
    }
  }
</script>

<svelte:head><title>VINIL | Catálogo</title></svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuVinil">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menuVinil">
      <ul class="navbar-nav me-auto ms-3">
        <li class="nav-item"><a class="nav-link active" href="/catalogo">Catálogo</a></li>
        <li class="nav-item"><a class="nav-link" href="/compras">Mis compras</a></li>
        <li class="nav-item"><a class="nav-link" href="/perfil">Perfil</a></li>
      </ul>
      <div class="d-flex gap-2">
        <a href="/carrito" class="btn btn-outline-light">Carrito</a>
        <a href="/login" class="btn btn-primary">Entrar</a>
      </div>
    </div>
  </div>
</nav>

<main class="container py-5">
  <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
    <div>
      <h1 class="fw-bold mb-1">Catálogo de Vinilos</h1>
      <p class="text-muted mb-0">Disponibles, ediciones especiales y piezas únicas</p>
    </div>
    <div class="d-flex gap-2 flex-wrap">
      <input type="text" class="form-control" placeholder="Buscar álbum o artista..." style="max-width:260px;" bind:value={busqueda}>
      <select class="form-select" style="max-width:180px;" bind:value={generoFiltro}>
        <option value="">Todos los géneros</option>
        {#each generos as g}
          <option value={g}>{g}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if vinilosFiltrados.length === 0}
    <p class="text-muted">No se encontraron vinilos.</p>
  {:else}
  <div class="row g-4">
    {#each vinilosFiltrados as v}
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm rounded-4 overflow-hidden border-0">
        <div class="vinyl-placeholder"></div>
        <div class="card-body">
          {#if v.catalogo_vinilo?.genero?.nombre}
            <span class="badge text-bg-dark mb-2">{v.catalogo_vinilo.genero.nombre}</span>
          {/if}
          <h5 class="card-title fw-bold">{v.catalogo_vinilo?.nombre_albums ?? '—'}</h5>
          <p class="text-muted mb-1">{v.catalogo_vinilo?.artista?.nombre ?? '—'}</p>
          <p class="mb-2">Estado: {v.estado_vinilo?.nombre ?? '—'}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-5">${v.precio_venta}</span>
            <a href="/detalle?id={v.id_vinilo}" class="btn btn-dark rounded-3">Ver vinilo</a>
          </div>
        </div>
      </div>
    </div>
    {/each}
  </div>
  {/if}
</main>

<button class="chat-toggle" on:click={() => chatAbierto = !chatAbierto}>
  💬
</button>

{#if chatAbierto}
<div class="chat-box shadow">
  <div class="chat-header">
    Bot Viniles (Beta)
    <button class="chat-close" on:click={() => chatAbierto = false}>✕</button>
  </div>
  <div class="chat-body">
    {#each mensajes as m}
      <div class="msg {m.tipo}">{m.texto}</div>
    {/each}
  </div>
  <div class="chat-footer">
    <input
      type="text"
      placeholder="Escribe tu mensaje..."
      bind:value={mensaje}
      on:keydown={(e) => e.key === 'Enter' && enviarMensaje()}
    />
    <button on:click={enviarMensaje}>➤</button>
  </div>
</div>
{/if}

<style>
  .chat-toggle {
    position: fixed;
    bottom: 20px;
    left: 20px;
    border: none;
    background: black;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 22px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  .chat-box {
    position: fixed;
    bottom: 90px;
    left: 20px;
    width: 320px;
    height: 420px;
    background: white;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 999;
  }

  .chat-header {
    background: black;
    color: white;
    padding: 10px 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-close {
    background: none;
    border: none;
    color: white;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .msg {
    padding: 8px 12px;
    border-radius: 12px;
    max-width: 80%;
    font-size: 14px;
  }

  .msg.user {
    background: #0d6efd;
    color: white;
    align-self: flex-end;
  }

  .msg.bot {
    background: #f1f1f1;
    color: #111;
    align-self: flex-start;
  }

  .chat-footer {
    display: flex;
    border-top: 1px solid #ddd;
  }

  .chat-footer input {
    flex: 1;
    border: none;
    padding: 10px;
    outline: none;
    font-size: 14px;
  }

  .chat-footer button {
    border: none;
    background: black;
    color: white;
    padding: 10px 14px;
    cursor: pointer;
    font-size: 15px;
  }
</style>