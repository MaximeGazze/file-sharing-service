<script>
  import DownloadIcon from "../assets/icons/download.svelte";
  import { hostname } from "../../env";

  export let fileList;

  const formatFileSize = (bytes) => {
    const aux = (b, u) =>
      b < 1000
        ? `${b.toFixed(1)} ${["B", "kB", "MB", "GB", "TB", "PB"][u]}`
        : aux(b / 1000, u + 1);
    return aux(bytes, 0);
  };

  const formatDate = (/** @type {Date} */date) => {
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${dateString} ${timeString}`;
  };
</script>

<ul>
  <li class="header">
    <div class="row-start">
      <div class="index">#</div>
      <div class="filename">Filename</div>
    </div>
  </li>
  {#each fileList as file, index}
    <li class="file">
      <div class="row-start">
        <div class="index">
          {index + 1}
        </div>
        <div class="filename">
          {file.name}
        </div>
      </div>
      <div class="row-end">
        <div class="date">
          {formatDate(new Date(Number(file.uploadDate)))}
        </div>
        <div class="filesize">
          {formatFileSize(file.size)}
        </div>
        <a
          class="svg-icon"
          type="button"
          download={file.id}
          href={`${hostname}/download?file=${file.id}`}
        >
          <DownloadIcon />
        </a>
      </div>
    </li>
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  .header {
    border-radius: 0px;
    border-bottom: solid 1px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem;
    font-weight: bold;
  }

  .row-start, .row-end {
    display: flex;
    gap: 1rem;
    white-space: nowrap;
  }

  .row-start {
    min-width: 0;
  }

  .row-end {
    justify-content: space-between;
  }

  .index, .filesize, .date {
    font-family: "Overpass Mono", monospace;
  }

  .filename {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .filesize {
    display: flex;
    align-items: center;
    justify-content: right;
    min-width: 5rem;
  }

  .date {
    display: flex;
    align-items: center;
  }

  .file {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 4px;
    padding: 0.5rem;
    transition: 0.1s;
  }

  .file:hover {
    color: var(--color-white);
    background-color: var(--color-secondary);
  }

  @media (max-width: 480px) {
    .file {
      display: block;
    }
  }

  .svg-icon {
    display: flex;
    align-items: center;
    color: black;
    background-color: rgba(0, 0, 0, 0);
    height: 100%;
    padding: 0;
    padding: 0;
  }
</style>
