<script>
  const { data, form } = $props();
  
  
  const dir = data.direccion;
</script>

<svelte:head><title>VINIL | Checkout</title></svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <div class="ms-auto d-flex gap-2">
      <a href="/catalogo" class="btn btn-outline-light">Seguir comprando</a>
      <a href="/carrito" class="btn btn-primary">Carrito</a>
    </div>
  </div>
</nav>

<main class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold mb-1">Proceder al pago</h1>
    <p class="text-muted mb-0">Finaliza tu compra</p>
  </div>

  {#if form?.error}
    <div class="alert alert-danger rounded-3">{form.error}</div>
  {/if}

  <form method="POST">
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card shadow-sm rounded-4 p-4 mb-4">
          <h4 class="fw-bold mb-3">Datos de envío</h4>
          <div class="row g-3">
            <div class="col-md-8">
              <label class="form-label">Calle</label>
              <input type="text" name="calle" class="form-control" value={dir?.calle ?? ''} required>
            </div>
            <div class="col-md-4">
              <label class="form-label">Núm. exterior</label>
              <input type="text" name="numero_ext" class="form-control" value={dir?.numero_ext ?? ''}>
            </div>
            <div class="col-md-4">
              <label class="form-label">Colonia</label>
              <input type="text" name="colonia" class="form-control" value={dir?.colonia ?? ''} required>
            </div>
            <div class="col-md-4">
              <label class="form-label">Ciudad</label>
              <input type="text" name="ciudad" class="form-control" value={dir?.ciudad ?? ''} required>
            </div>
            <div class="col-md-4">
              <label class="form-label">Código postal</label>
              <input type="text" name="codigo_postal" class="form-control" value={dir?.codigo_postal ?? ''} required>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm rounded-4 p-4">
          <h4 class="fw-bold mb-3">Resumen</h4>
          <p class="text-muted">Los artículos de tu carrito serán procesados al confirmar.</p>
          <hr>
          <div class="d-grid">
            <button type="submit" class="btn btn-success btn-lg rounded-3">Confirmar compra</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</main>
