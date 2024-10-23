<li>
  <a href={path} class:active={$page.url.pathname === path}>
    <slot />
  </a>
</li>

<style>
  li > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1;
    text-decoration: none;
    color: var(--color-front);
    transition: all 0.4s ease-in-out;
    border-radius: 0.25rem;
  }

  li > a:hover {
    background-color: var(--color-front);
    color: var(--color-back);
  }

  li > a:active,
  li > a:focus {
    color: var(--color-primary--lighter);
  }

  li > a.active {
    color: var(--color-primary);
  }
</style>

<script lang="ts">
  import { page } from "$app/stores";

  export let path: string;
</script>
