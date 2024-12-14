<dialog bind:this={dialog}>
  <header>
    {config.title}
    <IconButton icon="fa6-solid:x" onmousedown={close} />
  </header>
  <section>
    <ViewComponent bind:this={component} />
  </section>
  <footer>
    <Button flavor="secondary" onmousedown={close}>Cancel</Button>
    <Button onmousedown={save}>Save</Button>
  </footer>
</dialog>

<style>
  dialog {
    --margin: 2rem;
    --header-size: 3.125rem;
    --footer-size: 4.5rem;
    display: none;
    grid-template-rows: var(--header-size) 1fr var(--footer-size);
    grid-template-areas: "header" "content" "footer";
    z-index: 999999;
    margin: var(--margin) auto;
    width: max-content;
    max-width: calc(100vw - (2 * var(--margin)));
    background-color: var(--color-back);
    color: var(--color-front);
    border: 1px solid var(--color-back--lighter);
    border-radius: 0.5rem;
    box-shadow: 0.5rem 0.5rem 1rem var(--__color-dark--darker);
  }

  dialog[open] {
    display: grid;
  }

  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25em;
    background-color: var(--color-back--lighter);
    padding: 0.5em 1em;
  }

  section {
    grid-area: content;
    padding: 1rem;
    max-height: calc(
      100dvh - (2 * var(--margin)) - var(--header-size) - var(--footer-size)
    );
    overflow-y: auto;
  }

  footer {
    grid-area: footer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid var(--color-back--lighter);
  }
</style>

<script lang="ts">
  import type { WindowComponent, WindowConfig } from "./types";
  import IconButton from "../IconButton.svelte";
  import Button from "../Button.svelte";
  import type { SvelteComponent } from "svelte";

  type ChildComponent = SvelteComponent<Record<string, never>, never, never> & {
    onSave: () => Promise<void>;
    onCancel: () => Promise<void>;
  } & { $$bindings: "" };

  type Props = {
    config: WindowConfig;
  };

  let { config }: Props = $props();

  let dialog = $state.raw<HTMLDialogElement>();
  let component = $state.raw<ChildComponent>();

  const ViewComponent = $derived<WindowComponent>(config.component);

  export function show() {
    dialog?.show();
  }

  export function close() {
    if (component) {
      component.onCancel().then(() => dialog?.close());
    }
    dialog?.close();
  }

  function save() {
    if (component) {
      component.onSave().then(() => dialog?.close());
    }
    dialog?.close();
  }
</script>
