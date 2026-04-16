<script>
  const { data, form } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
  
</script>

<svelte:head><title>VINIL | Usuarios</title></svelte:head>
<NavbarAdmin />

<div class="container py-5">
  <h1 class="fw-bold mb-1">Usuarios</h1>
  <p class="text-muted mb-4">Clientes y administradores registrados</p>

  {#if form?.success}<div class="alert alert-success rounded-3">Operación realizada.</div>{/if}
  {#if form?.error}<div class="alert alert-danger rounded-3">{form.error}</div>{/if}

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Rol</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {#each data.usuarios as u}
          <tr>
            <td>{u.id_user}</td>
            <td>{u.nombre} {u.apellido_pa}</td>
            <td>{u.correo}</td>
            <td>{u.telefono ?? '—'}</td>
            <td>
              <form method="POST" action="?/cambiarRol" class="d-flex gap-1">
                <input type="hidden" name="id_user" value={u.id_user}>
                <select name="id_rol" class="form-select form-select-sm" style="width:auto;">
                  {#each data.roles as r}
                    <option value={r.id_rol} selected={r.id_rol === u.id_rol}>{r.nombre}</option>
                  {/each}
                </select>
                <button type="submit" class="btn btn-sm btn-outline-dark">Cambiar</button>
              </form>
            </td>
            <td>
              <form method="POST" action="?/eliminar" onsubmit="return confirm('¿Eliminar usuario?')">
                <input type="hidden" name="id_user" value={u.id_user}>
                <button type="submit" class="btn btn-sm btn-outline-danger">Eliminar</button>
              </form>
            </td>
          </tr>
          {/each}
          {#if data.usuarios.length === 0}
          <tr><td colspan="6" class="text-center text-muted">Sin usuarios registrados.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
