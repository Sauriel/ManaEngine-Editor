<Portal>
  <section use:movable={{ handle: "header" }}>
    <header><Icon icon="pajamas:drag" /> Layers</header>
    <ul>
      {#each layers as layer, index (index)}
        <li class:active={index === $activeLayerIndex}>
          <button onclick={() => activeLayerIndex.set(index)}>
            <span class="move-handle">
              <Icon icon="pajamas:drag-vertical" />
            </span>
            {layer.label}
          </button>
          <button class="delete-btn">
            <Icon icon="pajamas:remove" />
          </button>
        </li>
      {/each}
      <li class="actions">
        <button onclick={addLayer}>
          <Icon icon="fa-solid:plus" />
        </button>
      </li>
    </ul>
  </section>
</Portal>

<style>
  section {
    position: absolute;
    top: 10rem;
    left: 10rem;
    background-color: color-mix(in srgb, var(--color-back), transparent 25%);
    border: 1px solid var(--color-back--lighter);
    border-radius: 8px;
    overflow: hidden;
    opacity: 0.2;
    transition: opacity var(--transition);
  }

  section:hover {
    opacity: 1;
  }

  header {
    background-color: color-mix(in srgb, var(--color-back), transparent 25%);
    padding: 0.25em 0.5em;
    border-bottom: 1px solid var(--color-front--darker);
    display: flex;
    align-items: center;
    gap: 1ch;
    cursor: move;
    user-select: none;
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
    justify-content: center;
    overflow: hidden;
  }

  li.active {
    color: var(--color-front--lighter);
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
    cursor: pointer;
    height: 100%;
  }

  .move-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }

  .delete-btn {
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
  import { movable } from "$lib/actions/movable";
  import Portal from "../utils/Portal.svelte";

  const layers = $derived<ForgeMapLayer[]>($map.layers);

  function addLayer() {
    map.createLayer();
  }
</script>
