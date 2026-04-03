<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
</script>

<NavbarAdmin />

<svelte:head>
  <title>VINIL | Dashboard Admin</title>
</svelte:head>

<div class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold mb-1">Panel de Administración</h1>
    <p class="text-muted mb-0">Resumen general de la tienda VINIL</p>
  </div>

  <div class="row g-4 mb-4">
    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Vinilos en inventario</h6>
        <p class="display-6 fw-bold mb-0">128</p>
      </div>
    </div>

    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Compras a proveedor</h6>
        <p class="display-6 fw-bold mb-0">42</p>
      </div>
    </div>

    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Ventas del mes</h6>
        <p class="display-6 fw-bold mb-0">$12,500</p>
      </div>
    </div>

    <div class="col-md-6 col-lg-3">
      <div class="card p-4 rounded-4 border-0 shadow-sm">
        <h6 class="text-muted">Ganancia estimada</h6>
        <p class="display-6 fw-bold mb-0">$4,850</p>
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
              <tr>
                <th>Fecha</th>
                <th>Movimiento</th>
                <th>Usuario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30/03/2026</td>
                <td>Compra de “Nevermind”</td>
                <td>Proveedor</td>
                <td><span class="badge text-bg-warning">En revisión</span></td>
              </tr>
              <tr>
                <td>30/03/2026</td>
                <td>Venta “Thriller”</td>
                <td>Cliente</td>
                <td><span class="badge text-bg-success">Pagado</span></td>
              </tr>
              <tr>
                <td>29/03/2026</td>
                <td>Alta de vinilo</td>
                <td>Admin</td>
                <td><span class="badge text-bg-dark">Inventario</span></td>
              </tr>
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