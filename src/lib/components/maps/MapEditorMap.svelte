<div id="map" style={`--tileSize: ${tileSize}px;`}>
  <canvas bind:this={canvas} {width} {height}></canvas>
</div>

<style>
  #map {
    grid-area: map;
    overflow: auto;
    max-height: calc(100dvh - var(--header-size));
  }
</style>

<script lang="ts">
  import { drawCheckerBg } from "$lib/utils/canvas/checkerBg";

  let canvas: HTMLCanvasElement;

  const tileSize = $state<number>(48);

  const width = $derived<number>(35 * tileSize);
  const height = $derived<number>(25 * tileSize);

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
