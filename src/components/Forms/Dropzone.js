import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";

const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const binaryStr = reader.result;
          history.push("/forms/configure");
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [history]
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
