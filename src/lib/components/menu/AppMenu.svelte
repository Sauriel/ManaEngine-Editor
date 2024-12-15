<menu>
  {#each menuItems as item (item.label)}
    <AppMenuItem {...item} />
  {/each}
  <Window config={importWindowConfig} bind:this={importWindow} />
</menu>

<style>
  menu {
    grid-area: menu;
    background-color: var(--color-back--darker);
    border-bottom: 1px solid var(--color-back--lighter);
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }
</style>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import NavItem from "$lib/components/NavItem.svelte";
  import Window from "$lib/components/ui/window/Window.svelte";
  import UploadView from "$lib/../routes/import/components/UploadView.svelte";
  import type { WindowConfig } from "$lib/components/ui/window/types";
  import Button from "$lib/components/ui/Button.svelte";
  import type { AppMenuItemProp } from "./types";
  import AppMenuItem from "./AppMenuItem.svelte";

  const menuItems: AppMenuItemProp[] = [
    {
      label: "Import",
      onAction: showImportWindow,
    },
  ];

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
