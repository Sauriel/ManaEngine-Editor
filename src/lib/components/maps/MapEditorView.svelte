<section id="map-editor">
  <MapEditorLayers />
  <MapEditorMap />
  <MapEditorTilemap />
</section>

<style>
  #map-editor {
    --header-size: 2.5rem;
    display: grid;
    grid-template-areas:
      "layers tilemap"
      "map tilemap";
    grid-template-columns: 1fr auto;
    grid-template-rows: var(--header-size) 1fr;
  }
</style>

<script lang="ts">
  import { gameloop } from "$lib/stores/gameloop";
  import MapEditorLayers from "./MapEditorLayers.svelte";
  import MapEditorMap from "./MapEditorMap.svelte";
  import MapEditorTilemap from "./MapEditorTilemap.svelte";

  gameloop.start();
</script>
