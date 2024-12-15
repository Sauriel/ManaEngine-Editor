<li>
  <button {onmousedown}>
    {label}
  </button>
</li>

<style>
  li > button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: var(--color-front);
    transition: var(--transition);
    transition-property: background-color, color;
    padding: 0.5em 1em;
  }

  li > button:hover {
    background-color: var(--color-front);
    color: var(--color-back);
  }

  li > button:active,
  li > button:focus {
    color: var(--color-primary--lighter);
  }

  /* li > button.active {
    color: var(--color-primary);
  } */
</style>

<script lang="ts">
  import type { AppMenuItemProp } from "./types";

  let { label, onAction }: AppMenuItemProp = $props();

  function onmousedown() {
    onAction();
  }
</script>
