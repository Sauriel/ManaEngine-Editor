<label
  class="file-uploader"
  class:hover={isDragOver}
  class:fluid
  for="file-upload"
  {ondragover}
  {ondragleave}
  {ondrop}
>
  <input
    id="file-upload"
    type="file"
    accept="image/*"
    multiple
    bind:this={fileUpload}
    onchange={onFileUpload}
  />
  <Icon icon="fa6-solid:upload" />
  <span>Click or drop images to upload</span>
</label>

<style>
  .file-uploader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2em;
    font-size: 10vh;
    border: 4px dashed var(--color-front);
    border-radius: 1vw;
    padding: 0.2em;
    cursor: pointer;
    transition: background 0.4s ease-in-out;
  }

  .file-uploader.fluid {
    height: 100%;
  }

  .file-uploader:not(.fluid) {
    width: 25vw;
    aspect-ratio: 4/3;
  }

  .file-uploader:hover,
  .file-uploader.hover {
    background-color: var(--color-back--lighter);
  }

  .file-uploader > input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .file-uploader > span {
    font-size: 0.2em;
  }
</style>

<script lang="ts">
  import Icon from "@iconify/svelte";

  interface Props {
    fluid?: boolean;
    onUpload: (files: FileList) => void;
  }

  let { onUpload, fluid = false }: Props = $props();

  let fileUpload = $state.raw<HTMLInputElement>();

  let isDragOver = $state<boolean>(false);

  function ondragover(event: DragEvent) {
    event.preventDefault();
    isDragOver = true;
  }

  function ondragleave(event: DragEvent) {
    event.preventDefault();
    isDragOver = false;
  }

  function ondrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) {
      onUpload(files);
    }
  }

  function onFileUpload(
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      onUpload(files);
    }
  }
</script>
