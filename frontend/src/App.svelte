<script>
  import FileUpload from "./components/FileUpload.svelte";
  import FileList from "./components/FileList.svelte";
  import { hostname } from '../env';

  let files = null;

  const getFileList = async () => {
    const res = await fetch(`${hostname}/files`);
    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  };

  const submit = async () => {
    console.log('lol');
    const formdata = new FormData();
    formdata.append('file', files[0]);
    await fetch(`${hostname}/upload`, {
      method: 'POST',
      body: formdata,
    });
    files = null;
  };

  const fileList = getFileList();
</script>

<form on:submit|preventDefault={submit}>
  <FileUpload label="Select File" bind:files />
  <button type="submit">Upload</button>
</form>

{#await fileList}
  <p>...waiting</p>
{:then fileList}
  <FileList fileList={fileList} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
  button {
    display: inline-block;
    border: none;     
    border-radius: 4px;
    padding: 0.5rem;
    font-family: arial;    
    font-weight: bold;
    font-size: 1rem;
    background-color: var(--color-secondary);
    color: var(--color-white);
    cursor: pointer;
  }
</style>