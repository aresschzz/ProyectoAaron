<script>
  const { data } = $props();
  

  const { items, total, noDisponibles } = data;
</script>

<svelte:head><title>VINIL | Carrito</title></svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <div class="ms-auto d-flex gap-2">
      <a href="/catalogo" class="btn btn-outline-light">Seguir comprando</a>
      <a href="/perfil" class="btn btn-primary">Mi perfil</a>
    </div>
  </div>
</nav>

<main class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold mb-1">Carrito</h1>
    <p class="text-muted mb-0">Revisa tus productos antes de finalizar tu compra</p>
  </div>

  {#if noDisponibles?.length > 0}
    <div class="alert alert-warning rounded-3">
      Algunos vinilos ya no están disponibles y fueron removidos del carrito.
    </div>
  {/if}

  {#if items.length === 0}
    <div class="text-center py-5">
      <p class="text-muted fs-5">Tu carrito está vacío.</p>
      <a href="/catalogo" class="btn btn-dark">Ver catálogo</a>
    </div>
  {:else}
  <div class="row g-4">
    <div class="col-lg-8">
      {#each items as v}
      <div class="card shadow-sm rounded-4 p-4 mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1 fw-bold">{v.catalogo_vinilo?.nombre_albums ?? '—'}</h5>
            <p class="text-muted mb-1">{v.catalogo_vinilo?.artista?.nombre ?? '—'}</p>
            <small class="text-secondary">Estado: {v.estatus?.nombre ?? '—'}</small>
          </div>
          <div class="text-end">
            <p class="fw-bold fs-5 mb-0">${v.precio_venta}</p>
          </div>
        </div>
      </div>
      {/each}
    </div>

    <div class="col-lg-4">
      <div class="card shadow-sm rounded-4 p-4">
        <h4 class="fw-bold mb-3">Resumen</h4>
        <div class="d-flex justify-content-between mb-2">
          <span>Subtotal ({items.length} {items.length === 1 ? 'vinilo' : 'vinilos'})</span>
          <span>${total}</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between mb-3">
          <strong>Total</strong>
          <strong>${total}</strong>
        </div>
        <div class="d-grid">
          <form method="POST" action="/checkout">
            <input type="hidden" name="items" value={JSON.stringify(items.map(v => ({ id_vinilo: v.id_vinilo })))}>
            <button type="submit" class="btn btn-success btn-lg rounded-3 w-100">Proceder al pago</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/if}
</main>
