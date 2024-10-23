<ul>
  <li class:active={selected === "brush"}>
    <button aria-label="paint" onclick={() => onselect("brush")}>
      <Icon icon="heroicons:paint-brush-solid" />
    </button>
  </li>
  <li class:active={selected === "line"}>
    <button aria-label="line" onclick={() => onselect("line")}>
      <Icon icon="proicons:line-diagonal" />
    </button>
  </li>
  <li class:active={selected === "rect-fill"}>
    <button aria-label="rect-fill" onclick={() => onselect("rect-fill")}>
      <Icon icon="ph:rectangle-fill" />
    </button>
  </li>
  <li class:active={selected === "rect-border"}>
    <button aria-label="rect-border" onclick={() => onselect("rect-border")}>
      <Icon icon="ph:rectangle-bold" />
    </button>
  </li>
  <li class:active={selected === "circle-fill"}>
    <button aria-label="circle-fill" onclick={() => onselect("circle-fill")}>
      <Icon icon="ph:circle-fill" />
    </button>
  </li>
  <li class:active={selected === "circle-border"}>
    <button
      aria-label="circle-border"
      onclick={() => onselect("circle-border")}
    >
      <Icon icon="ph:circle-bold" />
    </button>
  </li>
  <li class:active={selected === "fill"}>
    <button aria-label="fill" onclick={() => onselect("fill")}>
      <Icon icon="ph:paint-bucket-fill" />
    </button>
  </li>
  <li class:active={selected === "eraser"}>
    <button aria-label="erase" onclick={() => onselect("eraser")}>
      <Icon icon="bi:eraser-fill" />
    </button>
  </li>
</ul>

<style>
  ul {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 0.25em;
    margin: 0;
    list-style: none;
    background-color: var(--color-back--darker);
    width: 3rem;
    border-radius: 1.5rem;
    border: 1px solid var(--color-back--lighter);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25em;
    font-size: 1.5rem;
  }

  li {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }

  li.active {
    background-color: var(--color-primary);
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
    cursor: pointer;
    width: 100%;
    height: 100%;
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
