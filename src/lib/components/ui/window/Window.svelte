<dialog
  style={windowState}
  bind:this={dialog}
  use:movable={{ handle: "header", onPositionChange }}
  use:resizable={{ onSizeChange }}
>
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
  import type {
    PersistedWindowState,
    WindowComponent,
    WindowConfig,
  } from "./types";
  import IconButton from "../IconButton.svelte";
  import Button from "../Button.svelte";
  import type { SvelteComponent } from "svelte";
  import { movable, type ElementPosition } from "$lib/actions/movable";
  import { resizable, type ElementSize } from "$lib/actions/resizable";

  type ChildComponent = SvelteComponent<Record<string, never>, never, never> & {
    onSave: () => Promise<void>;
    onCancel: () => Promise<void>;
  } & { $$bindings: "" };

  type Props = {
    config: WindowConfig;
  };

  let { config }: Props = $props();

  let windowState = $state<string | null>(null);

  let dialog = $state.raw<HTMLDialogElement>();
  let component = $state.raw<ChildComponent>();

  const ViewComponent = $derived<WindowComponent>(config.component);

  export function show() {
    loadWindowState();
    dialog?.show();
  }

  export function close(event: MouseEvent) {
    event.stopImmediatePropagation();
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

  function onPositionChange(position: ElementPosition) {
    persistWindowState({ position });
  }

  function onSizeChange(size: ElementSize) {
    if (size.height > 0 && size.width > 0) {
      persistWindowState({ size });
    }
  }

  function loadWindowState() {
    const stateKey = `window-state-${config.id}`;
    const state = JSON.parse(
      localStorage.getItem(stateKey) ?? "{}"
    ) as PersistedWindowState;
    const styles: string[] = [];
    if (state.position) {
      styles.push("position: fixed;");
      styles.push("margin: 0;");
      styles.push(`left: ${state.position.x}px;`);
      styles.push(`top: ${state.position.y}px;`);
    }
    if (state.size) {
      styles.push(`width: ${state.size.width}px;`);
      styles.push(`height: ${state.size.height}px;`);
    }
    if (styles.length > 0) {
      windowState = styles.join(" ");
    }
  }

  function persistWindowState(state: PersistedWindowState) {
    const stateKey = `window-state-${config.id}`;
    const previousState = JSON.parse(
      localStorage.getItem(stateKey) ?? "{}"
    ) as PersistedWindowState;
    localStorage.setItem(
      stateKey,
      JSON.stringify({ ...previousState, ...state })
    );
  }
</script>
