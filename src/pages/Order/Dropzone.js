import React from "react";
import { useDropzone } from "react-dropzone";
import { Cloud } from "../../svg/cloud";

export default function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div>
          <Cloud /> Drop files here or
          <span> Click to upload</span>
        </div>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </>
  );
}
