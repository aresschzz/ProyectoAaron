<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';

  function guardarVinilo(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    const album = form.get('album')?.toString().trim();
    const artista = form.get('artista')?.toString().trim();
    const genero = form.get('genero')?.toString().trim();
    const estado = form.get('estado')?.toString().trim();
    const stock = form.get('stock')?.toString().trim();
    const precioCompra = form.get('precioCompra')?.toString().trim();
    const precioVenta = form.get('precioVenta')?.toString().trim();

    if (!album || !artista || !genero || !estado || !stock || !precioCompra || !precioVenta) {
      alert('Llena todos los campos');
      return;
    }

    alert('Vinilo agregado');
    event.target.reset();
  }
</script>

<svelte:head>
  <title>VINIL | Agregar Vinilo</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold">Agregar vinilo</h1>
    <p class="text-muted">Registra un nuevo vinilo al inventario.</p>
  </div>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <form on:submit={guardarVinilo}>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Álbum</label>
          <input type="text" class="form-control" name="album">
        </div>

        <div class="col-md-6">
          <label class="form-label">Artista</label>
          <input type="text" class="form-control" name="artista">
        </div>

        <div class="col-md-4">
          <label class="form-label">Género</label>
          <input type="text" class="form-control" name="genero">
        </div>

        <div class="col-md-4">
          <label class="form-label">Estado</label>
          <select class="form-select" name="estado">
            <option value="">Selecciona...</option>
            <option>Nuevo</option>
            <option>Usado - Bueno</option>
            <option>Usado - Regular</option>
            <option>Usado - Malo</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label">Stock</label>
          <input type="number" class="form-control" name="stock">
        </div>

        <div class="col-md-6">
          <label class="form-label">Precio de compra estimado</label>
          <input type="number" class="form-control" name="precioCompra">
        </div>

        <div class="col-md-6">
          <label class="form-label">Precio de venta</label>
          <input type="number" class="form-control" name="precioVenta">
        </div>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-success">Guardar vinilo</button>
        <a href="/admin/inventario" class="btn btn-secondary">Cancelar</a>
      </div>
    </form>
  </div>
</div>