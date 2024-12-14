<div id="app">
  <nav>
    <ul>
      <NavItem path="/" orientation="horizontal">
        <Icon icon="fa6-solid:house" />
      </NavItem>
      <Button onmousedown={showImportWindow}>Import</Button>
      <Window config={importWindowConfig} bind:this={importWindow} />
    </ul>
  </nav>
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

  nav {
    grid-area: menu;
    background-color: var(--color-back--darker);
    border-right: 1px solid var(--color-back--lighter);
  }

  nav > ul {
    margin: 0;
    padding: 0.5rem;
    list-style: none;
    display: flex;
    gap: 0.5rem;
    height: 100%;
  }

  /* nav {
    grid-area: menu;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-back);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  nav > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 1em;
    height: 100%;
  } */

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
  import Icon from "@iconify/svelte";
  import NavItem from "$lib/components/NavItem.svelte";
  import { fly } from "svelte/transition";
  import type { PageData } from "./$types";
  import type { Snippet } from "svelte";
  import Window from "$lib/components/ui/window/Window.svelte";
  import UploadView from "./import/components/UploadView.svelte";
  import type { WindowConfig } from "$lib/components/ui/window/types";
  import Button from "$lib/components/ui/Button.svelte";

  type Props = {
    data: PageData;
    children: Snippet;
  };

  let { data, children }: Props = $props();

  let importWindow = $state.raw<Window>();

  const importWindowConfig: WindowConfig = {
    id: "tilesets-import",
    title: "Import TileSets",
    component: UploadView,
  };

  function showImportWindow() {
    importWindow!.show();
  }
</script>
