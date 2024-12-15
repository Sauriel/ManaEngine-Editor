<div id="app">
  <AppMenu />
  <main>
    {#key data.url}
      <div
        in:fly={{ y: 200, duration: 300, delay: 300 }}
        out:fly={{ y: -200, duration: 300 }}
      >
        {@render children()}
      </div>
    {/key}
  </main>
</div>

<style>
  #app {
    min-height: 100dvh;
  }

  main {
    grid-area: content;
  }

  main > div {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>

<script lang="ts">
  import "../styles/base.css";
  import "@fontsource-variable/open-sans";
  import { fly } from "svelte/transition";
  import type { PageData } from "./$types";
  import type { Snippet } from "svelte";
  import AppMenu from "$lib/components/menu/AppMenu.svelte";

  type Props = {
    data: PageData;
    children: Snippet;
  };

  let { data, children }: Props = $props();
</script>
