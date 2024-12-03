<li>
  <a
    href={path}
    class={`orientation-${orientation}`}
    class:active={$page.url.pathname === path}
  >
    {@render children?.()}
  </a>
</li>

<style>
  li > a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: var(--color-front);
    transition: all 0.4s ease-in-out;
    border-radius: 0.25rem;
  }

  li > a.orientation-vertical {
    width: 100%;
    aspect-ratio: 1;
  }

  li > a.orientation-horizontal {
    padding: 0.5em 1em;
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
  import type { Snippet } from "svelte";

  interface Props {
    orientation?: "horizontal" | "vertical";
    path: string;
    children?: Snippet;
  }

  let { orientation = "vertical", path, children }: Props = $props();
</script>
