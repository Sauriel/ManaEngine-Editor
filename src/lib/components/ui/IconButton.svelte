<button {onmousedown}>
  <Icon {icon} />
</button>

<style>
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    aspect-ratio: 1 / 1;
    height: 1.5em;
    transition: background var(--transition);
    border-radius: 0.25rem;
  }

  button:hover {
    background-color: var(--color-primary);
  }
</style>

<script lang="ts">
  import Icon from "@iconify/svelte";

  type Props = {
    icon: string;
    onmousedown: (
      event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => void;
  };

  let { icon, onmousedown }: Props = $props();
</script>
