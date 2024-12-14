import type { ElementPosition } from "$lib/actions/movable";
import type { ElementSize } from "$lib/actions/resizable";
import type { Component } from "svelte";

export type WindowComponent = Component<
  Record<string, never>,
  {
    onSave: () => Promise<void>;
    onCancel: () => Promise<void>;
  },
  ""
>;

export type WindowConfig = {
  id: string;
  title: string;
  component: WindowComponent;
};

export type PersistedWindowState = {
  position?: ElementPosition;
  size?: ElementSize;
};
