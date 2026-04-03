<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <div class="ms-auto d-flex gap-2">
      <a href="/catalogo" class="btn btn-outline-light">Seguir comprando</a>
      <a href="/perfil" class="btn btn-primary">Mi perfil</a>
    </div>
  </div>
</nav>

<main class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold mb-1">Carrito</h1>
    <p class="text-muted mb-0">Revisa tus productos antes de finalizar tu compra</p>
  </div>

  <div class="row g-4">
    <div class="col-lg-8">
      <div class="card shadow-sm rounded-4 p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1 fw-bold">Nevermind</h5>
            <p class="text-muted mb-1">Nirvana</p>
            <small class="text-secondary">Estado: Usado - Bueno</small>
          </div>
          <div class="text-end">
            <p class="fw-bold fs-5 mb-2">$350</p>
            <button class="btn btn-sm btn-outline-danger rounded-3">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4">
      <div class="card shadow-sm rounded-4 p-4">
        <h4 class="fw-bold mb-3">Resumen</h4>
        <div class="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>$350</span>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <span>Envío</span>
          <span>$120</span>
        </div>
        <hr>
        <div class="d-flex justify-content-between mb-3">
          <strong>Total</strong>
          <strong>$470</strong>
        </div>

        <div class="d-grid">
          <a href="/checkout" class="btn btn-success btn-lg rounded-3">Proceder al pago</a>
        </div>
      </div>
    </div>
  </div>
</main>
