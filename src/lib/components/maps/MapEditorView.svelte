<section id="map-editor">
  <MapEditorMap />
  <MapEditorTilemapGroups />
</section>

<style>
  #map-editor {
    --header-size: 2.5rem;
    display: grid;
    grid-template-areas: "tools map tilemap";
    grid-template-columns: auto 1fr auto;
  }
</style>

<script lang="ts">
  import { gameloop } from "$lib/stores/gameloop";
  import MapEditorMap from "./MapEditorMap.svelte";
  import MapEditorTilemapGroups from "./MapEditorTilemapGroups.svelte";

  gameloop.start();
</script>
