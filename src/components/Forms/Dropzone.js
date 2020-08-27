import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ setUploaded, setBlob}) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          setBlob(file);
          setUploaded(true);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [setBlob, setUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return !loading ? (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <img
          alt="..."
          style={{ width: "60%" }}
          src={require("assets/img/brand/upload.png")}
        />
      </div>
    </div>
  ) : (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default Dropzone;
