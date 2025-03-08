<ul>
  <li>
    <button
      class:active={selected === "brush"}
      aria-label="paint"
      onclick={() => onselect("brush")}
    >
      <Icon icon="heroicons:paint-brush-solid" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "line"}
      disabled
      aria-label="line"
      onclick={() => onselect("line")}
    >
      <Icon icon="proicons:line-diagonal" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "rect-fill"}
      disabled
      aria-label="rect-fill"
      onclick={() => onselect("rect-fill")}
    >
      <Icon icon="ph:rectangle-fill" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "rect-border"}
      disabled
      aria-label="rect-border"
      onclick={() => onselect("rect-border")}
    >
      <Icon icon="ph:rectangle-bold" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "circle-fill"}
      disabled
      aria-label="circle-fill"
      onclick={() => onselect("circle-fill")}
    >
      <Icon icon="ph:circle-fill" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "circle-border"}
      disabled
      aria-label="circle-border"
      onclick={() => onselect("circle-border")}
    >
      <Icon icon="ph:circle-bold" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "fill"}
      aria-label="fill"
      onclick={() => onselect("fill")}
    >
      <Icon icon="ph:paint-bucket-fill" />
    </button>
  </li>
  <li>
    <button
      class:active={selected === "eraser"}
      aria-label="erase"
      onclick={() => onselect("eraser")}
    >
      <Icon icon="bi:eraser-fill" />
    </button>
  </li>
</ul>

<style>
  ul {
    --gaps: 4px;
    grid-area: tools;
    padding: var(--gaps);
    margin: 0;
    list-style: none;
    background-color: var(--color-back--darker);
    width: 3rem;
    border-left: 1px solid var(--color-back--lighter);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--gaps);
    font-size: 1.5rem;
  }

  li {
    width: 100%;
  }

  button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 1;
  }

  button.active {
    background-color: var(--color-primary);
  }

  button:hover {
    background-color: var(--color-front--darker);
    color: var(--color-back);
  }

  button:disabled {
    opacity: 0.2;
    pointer-events: none;
  }
</style>

<script lang="ts">
  import type { Tool } from "$lib/utils/map/types";
  import Icon from "@iconify/svelte";

  type Props = {
    selected: Tool;
    onselect: (value: Tool) => void;
  };

  let { selected, onselect }: Props = $props();
</script>
