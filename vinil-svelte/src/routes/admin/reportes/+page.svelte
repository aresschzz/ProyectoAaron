<script>
  import NavbarAdmin from '$lib/components/NavbarAdmin.svelte';
</script>

<svelte:head>
  <title>VINIL | Reportes</title>
</svelte:head>

<NavbarAdmin />

<div class="container py-5">
  <div class="mb-4">
    <h1 class="fw-bold">Reportes</h1>
    <p class="text-muted">Resumen general de ventas, compras e inventario.</p>
  </div>

  <div class="row g-4 mb-4">
    <div class="col-md-3"><div class="card shadow-sm rounded-4 border-0 p-4 text-center"><h6 class="text-muted">Ganancia total</h6><p class="display-6 fw-bold mb-0">$12,450</p></div></div>
    <div class="col-md-3"><div class="card shadow-sm rounded-4 border-0 p-4 text-center"><h6 class="text-muted">Vinilos vendidos</h6><p class="display-6 fw-bold mb-0">38</p></div></div>
    <div class="col-md-3"><div class="card shadow-sm rounded-4 border-0 p-4 text-center"><h6 class="text-muted">Vinilos comprados</h6><p class="display-6 fw-bold mb-0">21</p></div></div>
    <div class="col-md-3"><div class="card shadow-sm rounded-4 border-0 p-4 text-center"><h6 class="text-muted">Inventario actual</h6><p class="display-6 fw-bold mb-0">64</p></div></div>
  </div>

  <div class="card shadow-sm rounded-4 border-0 p-4 mb-4">
    <h5 class="fw-bold mb-3">Vinilos más vendidos</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Abbey Road – The Beatles</li>
      <li class="list-group-item">Nevermind – Nirvana</li>
      <li class="list-group-item">Back in Black – AC/DC</li>
    </ul>
  </div>

  <div class="card shadow-sm rounded-4 border-0 p-4">
    <h5 class="fw-bold mb-3">Vinilos más comprados</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">The Dark Side of the Moon – Pink Floyd</li>
      <li class="list-group-item">Thriller – Michael Jackson</li>
      <li class="list-group-item">Rumours – Fleetwood Mac</li>
    </ul>
  </div>
</div>