<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';

  function registrarCompra(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    const proveedor = form.get('proveedor')?.toString().trim();
    const contacto = form.get('contacto')?.toString().trim();
    const album = form.get('album')?.toString().trim();
    const artista = form.get('artista')?.toString().trim();
    const genero = form.get('genero')?.toString().trim();
    const estado = form.get('estado')?.toString().trim();
    const precioCompra = form.get('precioCompra')?.toString().trim();
    const rareza = form.get('rareza')?.toString().trim();
    const resultado = form.get('resultado')?.toString().trim();
    const metodoPago = form.get('metodoPago')?.toString().trim();

    if (!proveedor || !contacto || !album || !artista || !genero || !estado || !precioCompra || !rareza || !resultado || !metodoPago) {
      alert('Llena todos los campos');
      return;
    }

    alert('Compra registrada');
    event.target.reset();
  }
</script>

<svelte:head>
  <title>VINIL | Nueva Compra</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold">Nueva compra de vinilos</h1>
    <p class="text-muted">Registra una compra realizada a un cliente/proveedor.</p>
  </div>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <form on:submit={registrarCompra}>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Proveedor / Cliente</label>
          <input type="text" class="form-control" name="proveedor">
        </div>

        <div class="col-md-6">
          <label class="form-label">Contacto</label>
          <input type="text" class="form-control" name="contacto">
        </div>

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
          <label class="form-label">Precio de compra</label>
          <input type="number" class="form-control" name="precioCompra">
        </div>

        <div class="col-md-4">
          <label class="form-label">Rareza</label>
          <select class="form-select" name="rareza">
            <option value="">Selecciona...</option>
            <option>Común</option>
            <option>Raro</option>
            <option>Edición limitada</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label">Resultado</label>
          <select class="form-select" name="resultado">
            <option value="">Selecciona...</option>
            <option>Aceptado</option>
            <option>Rechazado</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label">Método de pago</label>
          <select class="form-select" name="metodoPago">
            <option value="">Selecciona...</option>
            <option>Efectivo</option>
            <option>Transferencia</option>
          </select>
        </div>
      </div>

      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-success">Registrar compra</button>
        <a href="/admin/compras-vinilo" class="btn btn-secondary">Cancelar</a>
      </div>
    </form>
  </div>
</div>