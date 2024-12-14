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
  title: string;
  component: WindowComponent;
};
