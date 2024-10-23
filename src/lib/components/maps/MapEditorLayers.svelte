<ul>
  {#each layers as layer, index (index)}
    <li class:active={index === activeLayerIndex}>
      <button onclick={() => (activeLayerIndex = index)}>
        <span class="move-handle">
          <Icon icon="fa6-solid:grip-vertical" />
        </span>
        {layer.label}
      </button>
    </li>
  {/each}
  <li>
    <button onclick={addLayer}>
      <Icon icon="fa-solid:plus" />
    </button>
  </li>
</ul>

<style>
  ul {
    grid-area: layers;
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 2px;
    border-bottom: 1px solid var(--color-back--lighter);
    padding: 0.5rem 1rem 0;
    height: 2.5rem;
  }

  li {
    border: 1px solid var(--color-back--lighter);
    border-bottom: none;
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    color: var(--color-front--darker);
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  li.active {
    color: var(--color-front);
    border-top-color: var(--color-front--darker);
    border-left-color: var(--color-front--darker);
    border-right-color: var(--color-front--darker);
  }

  li:hover {
    background-color: var(--color-front--darker);
    color: var(--color-back);
  }

  button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1ch;
    padding: 0.25em 1em;
    cursor: pointer;
    height: 100%;
  }

  .move-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
  }
</style>

<script lang="ts">
  import Icon from "@iconify/svelte";

  type MapLayer = {
    label: string;
  };

  const layers = $state<MapLayer[]>([
    { label: "Ebene 1" },
    { label: "Ebene 2" },
  ]);

  let activeLayerIndex = $state<number>(0);

  function addLayer() {
    layers.push({ label: `Ebene ${layers.length + 1}` });
  }
</script>
