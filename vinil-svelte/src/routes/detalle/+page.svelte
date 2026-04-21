<script>
  const { data } = $props();
  
  const v = data.vinilo;
</script>

<svelte:head><title>VINIL | {v.catalogo_vinilo?.nombre_albums ?? 'Detalle'}</title></svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <div class="ms-auto d-flex gap-2">
      <a href="/catalogo" class="btn btn-outline-light">Catálogo</a>
      <a href="/carrito" class="btn btn-primary">Carrito</a>
    </div>
  </div>
</nav>

<main class="container py-5">
  <div class="row g-5 align-items-start">
    <div class="col-lg-5">
      <div class="card shadow rounded-4 border-0 overflow-hidden">
        <div class="vinyl-placeholder"></div>
      </div>
    </div>

    <div class="col-lg-7">
      {#if v.catalogo_vinilo?.genero?.nombre}
        <span class="badge text-bg-dark mb-2">{v.catalogo_vinilo.genero.nombre}</span>
      {/if}
      <h1 class="fw-bold mb-1">{v.catalogo_vinilo?.nombre_albums ?? '—'}</h1>
      <p class="fs-5 text-muted mb-3">{v.catalogo_vinilo?.artista?.nombre ?? '—'}</p>
      <h3 class="fw-bold text-success mb-3">${v.precio_venta}</h3>

      <div class="mb-4">
        <p class="mb-2"><strong>Estado físico:</strong> {v.estado_vinilo?.nombre ?? '—'}</p>
        <p class="mb-2"><strong>Empresa:</strong> {v.catalogo_vinilo?.empresa?.nombre ?? '—'}</p>
        <p class="mb-2"><strong>Año:</strong> {v.catalogo_vinilo?.anio ?? '—'}</p>
        <p class="mb-0"><strong>Disponibilidad:</strong>
          {#if v.disponible}
            <span class="badge text-bg-success">Disponible</span>
          {:else}
            <span class="badge text-bg-danger">No disponible</span>
          {/if}
        </p>
      </div>

      {#if v.disponible}
      <div class="d-flex gap-2 mt-4">
        <a href="/carrito?ids={v.id_vinilo}" class="btn btn-dark">Agregar al carrito</a>
      </div>
      {/if}
    </div>
  </div>
</main>
