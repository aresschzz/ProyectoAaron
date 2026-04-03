<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
</script>

<svelte:head>
  <title>VINIL | Ventas</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <h1 class="fw-bold mb-1">Ventas</h1>
  <p class="text-muted mb-4">Órdenes de venta en línea y sucursal</p>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Cliente</th>
            <th>Vinilo</th>
            <th>Total</th>
            <th>Canal</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>OV-001</td><td>Ana Ruiz</td><td>Nevermind</td><td>$350</td><td>Online</td><td><span class="badge text-bg-success">Pagado</span></td></tr>
          <tr><td>OV-002</td><td>Juan Pérez</td><td>Thriller</td><td>$680</td><td>Sucursal</td><td><span class="badge text-bg-primary">Entregado</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>