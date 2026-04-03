<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
</script>

<svelte:head>
  <title>VINIL | Clientes y Proveedores</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <h1 class="fw-bold mb-1">Clientes / Proveedores</h1>
  <p class="text-muted mb-4">Historial de compras y ventas a la tienda</p>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Tipo</th>
            <th>Compras</th>
            <th>Ventas a tienda</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Carlos Méndez</td><td>55 1111 2222</td><td>Proveedor</td><td>0</td><td>3</td></tr>
          <tr><td>Ana Ruiz</td><td>55 3333 4444</td><td>Cliente</td><td>2</td><td>0</td></tr>
          <tr><td>Laura Torres</td><td>55 7777 8888</td><td>Ambos</td><td>1</td><td>2</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>