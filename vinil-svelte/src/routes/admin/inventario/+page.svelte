<script>
  const { data, form } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
  
</script>

<svelte:head><title>VINIL | Inventario</title></svelte:head>
<NavbarAdmin />

<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="fw-bold mb-1">Inventario</h1>
      <p class="text-muted mb-0">Control de stock y estado de vinilos</p>
    </div>
    <a href="/admin/agregar-vinilo" class="btn btn-primary">Agregar vinilo</a>
  </div>

  {#if form?.success}<div class="alert alert-success rounded-3">Operación realizada correctamente.</div>{/if}
  {#if form?.error}<div class="alert alert-danger rounded-3">{form.error}</div>{/if}

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>ID</th><th>Álbum</th><th>Artista</th><th>Género</th>
            <th>Estado</th><th>Precio venta</th><th>Disponible</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each data.vinilos as v}
          <tr>
            <td>{v.id_vinilo}</td>
            <td>{v.catalogo_vinilo?.nombre_albums ?? '—'}</td>
            <td>{v.catalogo_vinilo?.artista?.nombre ?? '—'}</td>
            <td>{v.catalogo_vinilo?.genero?.nombre ?? '—'}</td>
            <td>{v.estatus?.nombre ?? '—'}</td>
            <td>${v.precio_venta}</td>
            <td>
              {#if v.disponible}
                <span class="badge text-bg-success">Sí</span>
              {:else}
                <span class="badge text-bg-secondary">No</span>
              {/if}
            </td>
            <td class="d-flex gap-1">
              <form method="POST" action="?/toggleDisponibilidad">
                <input type="hidden" name="id_vinilo" value={v.id_vinilo}>
                <input type="hidden" name="disponible" value={v.disponible}>
                <button type="submit" class="btn btn-sm btn-outline-dark">
                  {v.disponible ? 'Desactivar' : 'Activar'}
                </button>
              </form>
              <form method="POST" action="?/eliminar" onsubmit="return confirm('¿Eliminar este vinilo?')">
                <input type="hidden" name="id_vinilo" value={v.id_vinilo}>
                <button type="submit" class="btn btn-sm btn-outline-danger">Eliminar</button>
              </form>
            </td>
          </tr>
          {/each}
          {#if data.vinilos.length === 0}
          <tr><td colspan="8" class="text-center text-muted">Sin vinilos registrados.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
