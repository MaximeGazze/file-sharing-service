<script>
  export let label;
  export let files;
</script>

<div class="root">
  <label for="file">
    <div class="container">
      <div class="label">{label}</div>
      <div class="filename">
        {#if files && files[0]}
          {files[0].name}
        {:else}
          No files selected
        {/if}
      </div>
    </div>
  </label>
  <input hidden type="file" id="file" bind:files />
</div>

<style>
  .root {
    display: inline-block;
    font-family: arial;
  }
  
  label {
    cursor: pointer;
  }

  .container {
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    font-weight: bold;
  }

  .label, .filename {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .label {
    background-color: var(--color-secondary);
    color: var(--color-white);
  }

  .filename {
    background-color: var(--color-white);
  }
</style>
