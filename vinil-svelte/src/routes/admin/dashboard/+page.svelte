<script>
  const { data } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
  const { stats, movimientos } = data;
</script>

<NavbarAdmin />
<svelte:head><title>VINIL | Dashboard Admin</title></svelte:head>

<div class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold mb-1">Panel de Administración</h1>
    <p class="text-muted mb-0">Resumen general de la tienda VINIL</p>
  </div>

  <div class="row g-4 mb-4">
    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Vinilos en inventario</h6>
        <p class="display-6 fw-bold mb-0">{stats.totalVinilos}</p>
      </div>
    </div>
    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Compras a proveedor</h6>
        <p class="display-6 fw-bold mb-0">{stats.totalCompras}</p>
      </div>
    </div>
    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Ventas del mes</h6>
        <p class="display-6 fw-bold mb-0">{stats.ventasMes}</p>
      </div>
    </div>
    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Ganancia estimada</h6>
        <p class="display-6 fw-bold mb-0">${stats.gananciaEstimada}</p>
      </div>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-lg-8">
      <div class="card shadow-sm rounded-4 border-0 p-4">
        <h5 class="fw-bold mb-3">Últimos movimientos</h5>
        <div class="table-responsive">
          <table class="table align-middle">
            <thead>
              <tr><th>Tipo</th><th>Vinilo</th><th>Usuario</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {#each movimientos as m}
              <tr>
                <td>{m.tipo}</td>
                <td>{m.descripcion}</td>
                <td>{m.usuario}</td>
                <td><span class="badge text-bg-{m.badge}">{m.badgeTexto}</span></td>
              </tr>
              {/each}
              {#if movimientos.length === 0}
              <tr><td colspan="4" class="text-muted text-center">Sin movimientos recientes</td></tr>
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="card shadow-sm rounded-4 border-0 p-4">
        <h5 class="fw-bold mb-3">Acciones rápidas</h5>
        <div class="d-grid gap-2">
          <a href="/admin/agregar-vinilo" class="btn btn-dark">+ Agregar vinilo</a>
          <a href="/admin/nueva-compra" class="btn btn-outline-dark">Nueva compra</a>
          <a href="/admin/ventas" class="btn btn-outline-dark">Ver ventas</a>
          <a href="/admin/reportes" class="btn btn-outline-dark">Abrir reportes</a>
          <a href="/admin/usuarios" class="btn btn-outline-dark">Ver usuarios</a>
        </div>
      </div>
    </div>
  </div>
</div>
