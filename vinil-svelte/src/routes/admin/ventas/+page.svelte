<script>
  const { data } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
</script>

<svelte:head><title>VINIL | Ventas</title></svelte:head>
<NavbarAdmin />

<div class="container py-5">
  <h1 class="fw-bold mb-1">Ventas</h1>
  <p class="text-muted mb-4">Órdenes de venta registradas</p>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr><th>ID</th><th>Cliente</th><th>Vinilos</th><th>Fecha</th><th>Total</th></tr>
        </thead>
        <tbody>
          {#each data.ordenes as o}
          <tr>
            <td>{o.id_orden}</td>
            <td>{o.usuario ? `${o.usuario.nombre} ${o.usuario.apellido_pa}` : '—'}</td>
            <td>
              {#each o.detalle_ordens ?? [] as d}
                <span class="d-block">{d.vinilo?.catalogo_vinilo?.nombre_albums ?? '—'}</span>
              {/each}
            </td>
            <td>{new Date(o.fecha).toLocaleDateString('es-MX')}</td>
            <td>${o.total}</td>
          </tr>
          {/each}
          {#if data.ordenes.length === 0}
          <tr><td colspan="5" class="text-center text-muted">Sin ventas registradas.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
