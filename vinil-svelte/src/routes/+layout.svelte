<script>
  import 'bootstrap/dist/css/bootstrap.min.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/styles.css" />
  <script src="/js/app.js" defer></script>
</svelte:head>

{@render children()}