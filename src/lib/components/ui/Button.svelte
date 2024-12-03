<button {onclick} {disabled}>
  {@render children()}
</button>

<style>
  button {
    background-color: var(--color-front);
    color: var(--color-back);
    padding: 0.5em 1em;
    border-radius: 0.75em;
    border: 1px solid var(--color-front);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition:
      background 0.4s ease-in-out,
      color 0.4s ease-in-out;
  }

  button:disabled {
    cursor: not-allowed;
    background-color: var(--color-front--darker);
    color: var(--color-front--lighter);
  }

  button:hover {
    background-color: var(--color-back);
    color: var(--color-front);
  }
</style>

<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    onclick: (
      event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void;
    disabled?: boolean;
  }

  let { children, onclick, disabled = false }: Props = $props();
</script>
