<div id="tilemaps">
  <ul>
    {#each $tilemapStore as tilemapGroup, index (index)}
      <li>
        <button
          class:active={selectedGroupIndex === index}
          onclick={() => (selectedGroupIndex = index)}
        >
          {tilemapGroup.name}
        </button>
      </li>
    {/each}
  </ul>
  <section>
    <MapEditorTilemap tilemaps={selectedTilemaps} />
  </section>
</div>

<style>
  #tilemaps {
    display: grid;
    grid-template-areas: "tabs tilemaps";
  }

  ul {
    grid-area: tabs;
    display: flex;
    flex-direction: column;
    padding: 0;
    padding-top: 0.25rem;
    margin: 0;
    list-style: none;
    gap: 0.25rem;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    padding: 0.25em;
    min-height: 1.5em;
    aspect-ratio: 1 / 1;
    background-color: var(--color-back--darker);
    border: 1px solid var(--color-back--lighter);
    border-top-left-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
    line-height: 1;
    transition:
      background var(--transition),
      border var(--transition);
  }

  button:hover {
    background-color: var(--color-primary--lighter);
  }

  button.active {
    background-color: var(--color-primary);
    border-color: var(--color-primary--darker);
  }

  section {
    grid-area: tilemaps;
    border-left: 1px solid var(--color-back--lighter);
  }
</style>

<script lang="ts">
  import tilemapStore from "$lib/stores/tilemapStore";
  import type { TileRendererConfig } from "$lib/utils/canvas/rpgmaker/types";
  import MapEditorTilemap from "./MapEditorTilemap.svelte";

  let selectedGroupIndex = $state<number>(0);
  const selectedTilemaps = $derived<TileRendererConfig[]>(
    $tilemapStore[selectedGroupIndex]?.configs ?? []
  );
</script>
