<button class={flavor} {onmousedown} {disabled}>
  {@render children()}
</button>

<style>
  button {
    background-color: var(--color-front);
    color: var(--color-back);
    padding: 0.5em 1em;
    border-radius: 0.25em;
    border: 1px solid var(--color-primary--darker);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition:
      background 0.4s ease-in-out,
      color 0.4s ease-in-out;
  }

  button:hover {
    background-color: var(--color-front--darker);
    color: var(--color-back--lighter);
  }

  button.primary {
    background-color: var(--color-primary);
    color: var(--color-front);
  }

  button.primary:hover {
    background-color: var(--color-primary--lighter);
    color: var(--color-front--darker);
  }

  button:disabled {
    cursor: not-allowed;
    background-color: var(--color-back--lighter);
    color: var(--color-front--darker);
    border-color: var(--color-front--darker);
  }

  button:disabled:hover {
    background-color: var(--color-back--darker);
  }
</style>

<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    onmousedown: (
      event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void;
    disabled?: boolean;
    flavor?: "primary" | "secondary";
  }

  let {
    children,
    onmousedown,
    disabled = false,
    flavor = "primary",
  }: Props = $props();
</script>
