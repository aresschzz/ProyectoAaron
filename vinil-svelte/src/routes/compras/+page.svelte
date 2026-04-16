<script>
  const { data } = $props();
  
</script>

<svelte:head><title>VINIL | Mis compras</title></svelte:head>

<nav class="navbar navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <a href="/catalogo" class="btn btn-outline-light btn-sm">Catálogo</a>
  </div>
</nav>

<main class="container py-5">
  <h1 class="fw-bold mb-1">Mis compras</h1>
  <p class="text-muted mb-4">Historial de pedidos realizados</p>

  {#if data.ordenes.length === 0}
    <p class="text-muted">Aún no tienes pedidos.</p>
  {:else}
  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Pedido #</th>
            <th>Fecha</th>
            <th>Vinilos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {#each data.ordenes as o}
          <tr>
            <td>{o.id_orden}</td>
            <td>{new Date(o.fecha).toLocaleDateString('es-MX')}</td>
            <td>
              {#each o.detalle_ordens ?? [] as d}
                <span class="d-block">{d.vinilo?.catalogo_vinilo?.nombre_albums ?? '—'}</span>
              {/each}
            </td>
            <td>${o.total}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  {/if}
</main>
