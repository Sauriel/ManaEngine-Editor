<section id="map-editor">
  <MapEditorMap />
  <MapEditorTilemap />
</section>

<style>
  #map-editor {
    --header-size: 2.5rem;
    display: grid;
    grid-template-areas: "map tilemap";
    grid-template-columns: 1fr auto;
  }
</style>

<script lang="ts">
  import { gameloop } from "$lib/stores/gameloop";
  import MapEditorMap from "./MapEditorMap.svelte";
  import MapEditorTilemap from "./MapEditorTilemap.svelte";

  gameloop.start();
</script>
