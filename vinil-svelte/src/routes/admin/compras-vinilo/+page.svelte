<script>
  const { data, form } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
  
</script>

<svelte:head><title>VINIL | Compras de Vinilos</title></svelte:head>
<NavbarAdmin />

<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="fw-bold">Compras de Vinilos</h1>
      <p class="text-muted mb-0">Registro de compras hechas a clientes/proveedores.</p>
    </div>
    <a href="/admin/nueva-compra" class="btn btn-success">+ Nueva compra</a>
  </div>

  {#if form?.success}<div class="alert alert-success rounded-3">Compra registrada correctamente.</div>{/if}
  {#if form?.error}<div class="alert alert-danger rounded-3">{form.error}</div>{/if}

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr><th>ID</th><th>Registrado por</th><th>Vinilo</th><th>Estado</th><th>Precio pagado</th></tr>
        </thead>
        <tbody>
          {#each data.compras as c}
          <tr>
            <td>{c.id_compra_vinilo}</td>
            <td>{c.usuario ? `${c.usuario.nombre} ${c.usuario.apellido_pa}` : '—'}</td>
            <td>
              {#each c.detalle_compras ?? [] as d}
                <span class="d-block">{d.vinilo?.catalogo_vinilo?.nombre_albums ?? '—'}</span>
              {/each}
            </td>
            <td>
              {#each c.detalle_compras ?? [] as d}
                <span class="badge text-bg-secondary d-block">{d.estado ?? '—'}</span>
              {/each}
            </td>
            <td>
              {#each c.detalle_compras ?? [] as d}
                <span class="d-block">${d.precio_compra}</span>
              {/each}
            </td>
          </tr>
          {/each}
          {#if data.compras.length === 0}
          <tr><td colspan="5" class="text-center text-muted">Sin compras registradas.</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
