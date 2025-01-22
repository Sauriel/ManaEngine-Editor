<section id="map-editor">
  <MapEditorMap />
  <MapEditorSidebar />
</section>

<style>
  #map-editor {
    --header-size: 2.5rem;
    display: grid;
    grid-template-areas: "tools map sidebar";
    grid-template-columns: auto 1fr auto;
  }
</style>

<script lang="ts">
  import GameLoop from "$lib/stores/gameloop";
  import { GLOBAL_SHOW_ANIMATIONS } from "$lib/utils/constants";
  import MapEditorMap from "./MapEditorMap.svelte";
  import MapEditorSidebar from "./MapEditorSidebar.svelte";

  if (GLOBAL_SHOW_ANIMATIONS) {
    GameLoop.start();
  }
</script>
