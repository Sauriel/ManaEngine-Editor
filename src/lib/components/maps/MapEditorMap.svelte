<div id="map" style={`--tileSize: ${tileSize}px;`}>
  <canvas bind:this={canvas} {width} {height}></canvas>
  <MapTools
    selected={selectedTool}
    onselect={(value) => (selectedTool = value)}
  />
</div>

<style>
  #map {
    grid-area: map;
    overflow: auto;
    max-height: calc(100dvh - var(--header-size));
    position: relative;
  }
</style>

<script lang="ts">
  import MapTools from "./MapTools.svelte";
  import map from "$lib/stores/mapStore";
  import { drawCheckerBg } from "$lib/utils/canvas/checkerBg";
  import type { Tool } from "$lib/utils/map/types";

  let canvas: HTMLCanvasElement;

  const tileSize = $state<number>(48);
  let selectedTool = $state<Tool>("brush");

  const width = $derived<number>($map.width * tileSize);
  const height = $derived<number>($map.height * tileSize);

  $effect(() => {
    if (canvas) {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          drawCheckerBg(ctx, tileSize, x, y);
        }
      }
    }
  });
</script>
