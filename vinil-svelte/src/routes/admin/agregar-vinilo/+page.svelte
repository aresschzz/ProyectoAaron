<script>
  const { data, form } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
  
</script>

<svelte:head><title>VINIL | Agregar Vinilo</title></svelte:head>
<NavbarAdmin />

<div class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold">Agregar vinilo</h1>
    <p class="text-muted">Registra un nuevo vinilo al inventario.</p>
  </div>

  {#if form?.success}<div class="alert alert-success rounded-4">¡Vinilo guardado correctamente!</div>{/if}
  {#if form?.error}<div class="alert alert-danger rounded-4">{form.error}</div>{/if}

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <form method="POST">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Álbum</label>
          <input type="text" class="form-control" name="album" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Artista</label>
          <input type="text" class="form-control" name="artista" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Género</label>
          <select class="form-select" name="id_genero">
            <option value="">Sin género</option>
            {#each data.generos as g}
              <option value={g.id_genero}>{g.nombre}</option>
            {/each}
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Empresa</label>
          <select class="form-select" name="id_empresa">
            <option value="">Sin empresa</option>
            {#each data.empresas as e}
              <option value={e.id_empresa}>{e.nombre}</option>
            {/each}
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Estado físico</label>
          <select class="form-select" name="id_estatus" required>
            <option value="">Selecciona...</option>
            {#each data.estatus as e}
              <option value={e.id_estatus}>{e.nombre}</option>
            {/each}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">Precio de compra</label>
          <input type="number" step="0.01" class="form-control" name="precio_compra" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Precio de venta</label>
          <input type="number" step="0.01" class="form-control" name="precio_venta" required>
        </div>
      </div>
      <div class="d-flex gap-2 mt-4">
        <button type="submit" class="btn btn-success">Guardar vinilo</button>
        <a href="/admin/inventario" class="btn btn-secondary">Cancelar</a>
      </div>
    </form>
  </div>
</div>
