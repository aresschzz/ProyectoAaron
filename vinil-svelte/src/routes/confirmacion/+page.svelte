<script>
  const { data } = $props();
  
  const orden = data.orden;
</script>

<svelte:head><title>VINIL | Compra confirmada</title></svelte:head>

<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-7">
      <div class="card shadow-lg rounded-4 border-0 p-5 text-center">
        <div class="display-1 mb-4">✅</div>
        <h1 class="fw-bold mb-3">¡Compra confirmada!</h1>
        <p class="text-muted fs-5">Tu pedido ha sido registrado correctamente.</p>

        <div class="card bg-body-tertiary border-0 rounded-4 p-4 mt-4 mb-4 text-start">
          <h5 class="fw-bold mb-3">Resumen</h5>
          <p class="mb-2"><strong>Pedido #:</strong> {orden.id_orden}</p>
          <p class="mb-2"><strong>Fecha:</strong> {new Date(orden.fecha).toLocaleDateString('es-MX')}</p>
          <p class="mb-2"><strong>Total:</strong> ${orden.total}</p>
          <p class="mb-3"><strong>Productos:</strong></p>
          <ul class="list-unstyled mb-0">
            {#each orden.detalle_ordens ?? [] as d}
              <li class="mb-1">
                — {d.vinilo?.catalogo_vinilo?.nombre_albums ?? '—'}
                <span class="text-muted">· {d.vinilo?.catalogo_vinilo?.artista?.nombre ?? ''}</span>
                <span class="fw-bold float-end">${d.precio}</span>
              </li>
            {/each}
          </ul>
        </div>

        <div class="d-flex flex-column flex-md-row gap-3 justify-content-center">
          <a href="/compras" class="btn btn-dark btn-lg rounded-3">Ver mis compras</a>
          <a href="/catalogo" class="btn btn-outline-dark btn-lg rounded-3">Seguir comprando</a>
        </div>
      </div>
    </div>
  </div>
</div>
