<aside>
  <MapEditorTilemapGroups />
  <div style="height: 200px"></div>
</aside>

<style>
  aside {
    --layers-height: 200px;
    display: grid;
    grid-template-areas:
      "tilemap"
      "layers";
    grid-template-rows: 1fr var(--layers-height);
    border-left: 1px solid var(--color-back--lighter);
    max-height: calc(100dvh - var(--app-menu-height));
  }
</style>

<script lang="ts">
  import MapEditorTilemapGroups from "./MapEditorTilemapGroups.svelte";
</script>
