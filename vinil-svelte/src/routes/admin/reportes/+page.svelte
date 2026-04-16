<script>
  const { data } = $props();
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
  
  const { stats, masVendidos, masComprados, ventasPorGenero, filtros } = data;
</script>

<svelte:head><title>VINIL | Reportes</title></svelte:head>
<NavbarAdmin />

<div class="container py-5">
  <div class="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
    <div>
      <h1 class="fw-bold">Reportes</h1>
      <p class="text-muted">Resumen general de ventas, compras e inventario.</p>
    </div>
    <form method="GET" class="d-flex gap-2 align-items-end flex-wrap">
      <div>
        <label class="form-label mb-1 small">Desde</label>
        <input type="date" name="desde" class="form-control form-control-sm" value={filtros.desde ?? ''}>
      </div>
      <div>
        <label class="form-label mb-1 small">Hasta</label>
        <input type="date" name="hasta" class="form-control form-control-sm" value={filtros.hasta ?? ''}>
      </div>
      <button type="submit" class="btn btn-dark btn-sm">Filtrar</button>
    </form>
  </div>

  <div class="row g-4 mb-4">
    <div class="col-md-3">
      <div class="card shadow-sm rounded-4 border-0 p-4 text-center">
        <h6 class="text-muted">Ganancia neta</h6>
        <p class="display-6 fw-bold mb-0">${stats.gananciaNeta}</p>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm rounded-4 border-0 p-4 text-center">
        <h6 class="text-muted">Vinilos vendidos</h6>
        <p class="display-6 fw-bold mb-0">{stats.vinilosVendidos}</p>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm rounded-4 border-0 p-4 text-center">
        <h6 class="text-muted">Vinilos comprados</h6>
        <p class="display-6 fw-bold mb-0">{stats.vinilosComprados}</p>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm rounded-4 border-0 p-4 text-center">
        <h6 class="text-muted">Inventario actual</h6>
        <p class="display-6 fw-bold mb-0">{stats.totalVinilosInventario}</p>
      </div>
    </div>
  </div>

  <div class="row g-4">
    <div class="col-lg-4">
      <div class="card shadow-sm rounded-4 border-0 p-4">
        <h5 class="fw-bold mb-3">Más vendidos</h5>
        <ul class="list-group list-group-flush">
          {#each masVendidos as v}
            <li class="list-group-item d-flex justify-content-between">
              <span>{v.nombre} – {v.artista}</span>
              <span class="badge text-bg-dark">{v.total}</span>
            </li>
          {/each}
          {#if masVendidos.length === 0}<li class="list-group-item text-muted">Sin datos</li>{/if}
        </ul>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card shadow-sm rounded-4 border-0 p-4">
        <h5 class="fw-bold mb-3">Más comprados</h5>
        <ul class="list-group list-group-flush">
          {#each masComprados as v}
            <li class="list-group-item d-flex justify-content-between">
              <span>{v.nombre} – {v.artista}</span>
              <span class="badge text-bg-secondary">{v.total}</span>
            </li>
          {/each}
          {#if masComprados.length === 0}<li class="list-group-item text-muted">Sin datos</li>{/if}
        </ul>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="card shadow-sm rounded-4 border-0 p-4">
        <h5 class="fw-bold mb-3">Ventas por género</h5>
        <ul class="list-group list-group-flush">
          {#each ventasPorGenero as g}
            <li class="list-group-item d-flex justify-content-between">
              <span>{g.genero}</span>
              <span class="badge text-bg-dark">{g.total}</span>
            </li>
          {/each}
          {#if ventasPorGenero.length === 0}<li class="list-group-item text-muted">Sin datos</li>{/if}
        </ul>
      </div>
    </div>
  </div>
</div>
