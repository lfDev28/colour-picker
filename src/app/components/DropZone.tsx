'use client';
import React from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import Button from '@mui/material/Button';

type TDropzone = {
  onDrop: (acceptedFiles: File[]) => void;
  onDropRejected: (fileRejections: FileRejection[], event: DropEvent) => void;
};

const FileDropzone = ({ onDrop, onDropRejected }: TDropzone) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        'image/*': [],
      },
      onDrop,
      onDropRejected,
    });

  // Destructuring the root props to allow for onClick handler to only fire on button press
  const { onClick, ...rootProps } = getRootProps();

  return (
    <>
      <div
        {...rootProps}
        className="text-center p-20 border-2 border-dashed hover:border-blue-500 rounded-3xl "
      >
        <input
          className="input-zone"
          {...getInputProps({
            multiple: false,
          })}
        />
        <div className="w-full">
          {isDragActive ? (
            <p className="">Release to drop the file here</p>
          ) : (
            <p>Drag n drop an Image or Click to select </p>
          )}
          <div className="pt-10">
            <button
              onClick={onClick}
              className="rounded-lg p-2 bg-blue-500 hover:bg-blue-800"
            >
              Select File
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default FileDropzone;
