<div id="app">
  <nav>
    <ul>
      <NavItem path="/">
        <Icon icon="fa6-solid:house" />
      </NavItem>
      <!-- <NavItem path="/user">
        <Icon icon="fa6-solid:user" />
      </NavItem> -->
      <NavItem path="/import">
        <Icon icon="fa6-solid:file-import" />
      </NavItem>
    </ul>
  </nav>
  <main>
    {#key data.url}
      <div
        in:fly={{ y: 200, duration: 300, delay: 300 }}
        out:fly={{ y: -200, duration: 300 }}
      >
        {@render children()}
      </div>
    {/key}
  </main>
</div>

<style>
  #app {
    display: grid;
    grid-template-areas: "menu content";
    grid-template-columns: 50px auto;
    min-height: 100dvh;
  }

  nav {
    grid-area: menu;
    background-color: var(--color-back--darker);
    border-right: 1px solid var(--color-back--lighter);
  }

  nav > ul {
    margin: 0;
    padding: 0.5rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 100%;
  }

  /* nav {
    grid-area: menu;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-back);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  nav > ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 1em;
    height: 100%;
  } */

  main {
    grid-area: content;
  }

  main > div {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>

<script lang="ts">
  import "../styles/base.css";
  import "@fontsource-variable/open-sans";
  import Icon from "@iconify/svelte";
  import NavItem from "$lib/components/NavItem.svelte";
  import { fly } from "svelte/transition";
  import type { PageData } from "./$types";
  import type { Snippet } from "svelte";

  interface Props {
    data: PageData;
    children: Snippet;
  }

  let { data, children }: Props = $props();
</script>
