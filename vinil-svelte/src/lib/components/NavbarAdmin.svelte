<script>
  let { title = 'VINIL Admin' } = $props();
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold" href="/admin/dashboard">{title}</a>

    <div class="ms-auto d-flex gap-2 flex-wrap">
      <a href="/admin/inventario" class="btn btn-outline-light btn-sm">Inventario</a>
      <a href="/admin/usuarios" class="btn btn-outline-light btn-sm">Usuarios</a>
      <a href="/admin/ventas" class="btn btn-outline-light btn-sm">Ventas</a>
      <a href="/admin/reportes" class="btn btn-outline-light btn-sm">Reportes</a>
      <a href="/login" class="btn btn-danger btn-sm">Cerrar sesión</a>
    </div>
  </div>
</nav>