<section>
  <header>Layers</header>
  <ul>
    {#each orderedLayers as layer (layer.order)}
      <li class:active={layer.order === $activeLayerIndex}>
        <button
          type="button"
          class="layer-select"
          onclick={() => activeLayerIndex.set(layer.order)}
          ondblclick={() => renameLayer(layer.order)}
        >
          <span class="move-handle">
            <Icon icon="pajamas:drag-vertical" />
          </span>
          {layer.label}
        </button>
        {#if orderedLayers.length > 1}
          <button
            type="button"
            class="delete-btn"
            onclick={() => removeLayer(layer.order)}
          >
            <Icon icon="pajamas:remove" />
          </button>
        {/if}
      </li>
    {/each}
    <li class="actions">
      <button type="button" onclick={addLayer}>
        <Icon icon="fa-solid:plus" />
        Add new Layer
      </button>
    </li>
  </ul>
</section>

<style>
  header {
    background-color: var(--color-back--lighter);
    padding: 0.25em 0.5em;
    border-bottom: 1px solid var(--color-front--darker);
    display: flex;
    align-items: center;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    color: var(--color-front--darker);
    transition: all var(--transition);
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  li.active {
    color: var(--color-front--lighter);
    background-color: var(--color-primary);
  }

  li:hover {
    background-color: var(--color-front--darker);
    color: var(--color-back);
  }

  li:hover .delete-btn {
    opacity: 1;
  }

  li.actions {
    border-top: 1px solid var(--color-front--darker);
  }

  li:not(.actions) {
    height: 2em;
  }

  button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1ch;
    padding: 0.25em 1em 0.25em 0.5em;
    height: 100%;
  }

  .layer-select {
    flex: 1 0 auto;
  }

  .move-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }

  .delete-btn {
    flex: 0 0 auto;
    opacity: 0;
    transition: opacity var(--transition);
    color: var(--color-primary);
  }
</style>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import map from "$lib/stores/mapStore";
  import type { ForgeMapLayer } from "$lib/utils/map/types";
  import activeLayerIndex from "$lib/stores/layerStore";

  type OrderedLayer = Pick<ForgeMapLayer, "label"> & { order: number };

  const layers = $derived<ForgeMapLayer[]>($map.layers);
  const orderedLayers = $derived<OrderedLayer[]>(
    layers
      .map((layer, index) => ({ label: layer.label, order: index }))
      .toReversed()
  );

  function addLayer() {
    map.createLayer();
  }

  function removeLayer(index: number) {
    map.removeLayer(index);
  }

  function renameLayer(index: number) {
    const newLabel = prompt("Enter new layer name");
    if (newLabel) {
      map.renameLayer(index, newLabel);
    }
  }
</script>
