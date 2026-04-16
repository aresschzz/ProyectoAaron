<script>
  const { data, form } = $props();
  
</script>

<svelte:head><title>VINIL | Crear cuenta</title></svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
  </div>
</nav>

<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-7">
      <div class="card shadow-lg border-0 rounded-4 p-4">
        <h2 class="fw-bold mb-3 text-center">Crear cuenta</h2>
        <p class="text-muted text-center mb-4">Regístrate para comprar vinilos</p>

        {#if form?.success}
          <div class="alert alert-success rounded-3">¡Cuenta creada! <a href="/login">Inicia sesión</a></div>
        {/if}
        {#if form?.error}
          <div class="alert alert-danger rounded-3">{form.error}</div>
        {/if}

        <form method="POST">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Nombre</label>
              <input type="text" name="nombre" class="form-control" placeholder="Nombre" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellido paterno</label>
              <input type="text" name="apellido_pa" class="form-control" placeholder="Apellido paterno">
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellido materno</label>
              <input type="text" name="apellido_ma" class="form-control" placeholder="Apellido materno">
            </div>
            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input type="text" name="telefono" class="form-control" placeholder="55...">
            </div>
            <div class="col-md-6">
              <label class="form-label">Correo</label>
              <input type="email" name="correo" class="form-control" placeholder="correo@ejemplo.com" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">Contraseña</label>
              <input type="password" name="password" class="form-control" placeholder="••••••••" required>
            </div>
          </div>
          <div class="d-grid mt-4">
            <button type="submit" class="btn btn-dark btn-lg rounded-3">Registrarme</button>
          </div>
        </form>

        <div class="text-center mt-4">
          <a href="/login" class="text-decoration-none">Ya tengo cuenta</a>
        </div>
      </div>
    </div>
  </div>
</div>
