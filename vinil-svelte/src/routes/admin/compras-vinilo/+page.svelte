<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
</script>

<svelte:head>
  <title>VINIL | Compras de Vinilos</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="fw-bold">Compras de Vinilos</h1>
      <p class="text-muted mb-0">Registro de compras hechas a clientes/proveedores.</p>
    </div>
    <a href="/admin/nueva-compra" class="btn btn-success">+ Nueva compra</a>
  </div>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Proveedor</th>
            <th>Vinilo</th>
            <th>Estado</th>
            <th>Total pagado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>C001</td>
            <td>Juan Ramírez</td>
            <td>Nevermind - Nirvana</td>
            <td><span class="badge text-bg-warning">En revisión</span></td>
            <td>$200</td>
            <td>29/03/2026</td>
          </tr>
          <tr>
            <td>C002</td>
            <td>Laura Sánchez</td>
            <td>Thriller - Michael Jackson</td>
            <td><span class="badge text-bg-success">Disponible</span></td>
            <td>$350</td>
            <td>28/03/2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>