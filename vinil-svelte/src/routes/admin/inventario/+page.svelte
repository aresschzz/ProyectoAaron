<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
</script>

<svelte:head>
  <title>VINIL | Inventario</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="fw-bold mb-1">Inventario</h1>
      <p class="text-muted mb-0">Control de stock y estado de vinilos</p>
    </div>
    <a href="/admin/agregar-vinilo" class="btn btn-primary">Agregar vinilo</a>
  </div>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Álbum</th>
            <th>Artista</th>
            <th>Género</th>
            <th>Estado físico</th>
            <th>Stock</th>
            <th>Inventario</th>
            <th>Precio venta</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Nevermind</td><td>Nirvana</td><td>Rock</td><td>Usado - Bueno</td><td>1</td><td><span class="badge text-bg-success">Disponible</span></td><td>$350</td></tr>
          <tr><td>2</td><td>Thriller</td><td>Michael Jackson</td><td>Pop</td><td>Nuevo</td><td>3</td><td><span class="badge text-bg-success">Disponible</span></td><td>$680</td></tr>
          <tr><td>3</td><td>Unknown Pleasures</td><td>Joy Division</td><td>Post-Punk</td><td>Usado - Regular</td><td>1</td><td><span class="badge text-bg-warning">En revisión</span></td><td>$420</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>