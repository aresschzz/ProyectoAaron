<script>
  const { data, form } = $props();
  
  
  const u = data.usuario;
</script>

<svelte:head><title>VINIL | Mi perfil</title></svelte:head>

<nav class="navbar navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/">VINIL</a>
    <a href="/catalogo" class="btn btn-outline-light btn-sm">Catálogo</a>
  </div>
</nav>

<main class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-7">
      <div class="card shadow-sm rounded-4 border-0 p-4">
        <h2 class="fw-bold mb-1">Mi perfil</h2>
        <p class="text-muted mb-4">Rol: {u.rol?.nombre ?? '—'}</p>

        {#if form?.success}
          <div class="alert alert-success rounded-3">Perfil actualizado correctamente.</div>
        {/if}
        {#if form?.error}
          <div class="alert alert-danger rounded-3">{form.error}</div>
        {/if}

        <form method="POST" action="?/actualizar">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Nombre</label>
              <input type="text" name="nombre" class="form-control" value={u.nombre ?? ''}>
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellido paterno</label>
              <input type="text" name="apellido_pa" class="form-control" value={u.apellido_pa ?? ''}>
            </div>
            <div class="col-md-6">
              <label class="form-label">Apellido materno</label>
              <input type="text" name="apellido_ma" class="form-control" value={u.apellido_ma ?? ''}>
            </div>
            <div class="col-md-6">
              <label class="form-label">Teléfono</label>
              <input type="text" name="telefono" class="form-control" value={u.telefono ?? ''}>
            </div>
            <div class="col-md-12">
              <label class="form-label">Correo</label>
              <input type="email" class="form-control" value={u.correo ?? ''} disabled>
            </div>
          </div>
          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-dark">Guardar cambios</button>
            <a href="/catalogo" class="btn btn-outline-secondary">Volver</a>
          </div>
        </form>

        <hr class="my-4">
        <form method="POST" action="?/cerrarSesion">
          <button type="submit" class="btn btn-outline-danger">Cerrar sesión</button>
        </form>
      </div>
    </div>
  </div>
</main>
