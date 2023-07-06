'use client';
import React from 'react';
import styles from '../styles/colorPicker.module.css';
import Image from 'next/image';
import FileDropzone from './DropZone';
import { useToast, EToastTypes } from '../Context/ToastContext';

const ColourPicker = () => {
  const [colour, setColour] = React.useState<string>('#5524e7');
  const [image, setImage] = React.useState<string | null>(null);
  const { showTypedToast } = useToast();
  const openEyeDropper = async () => {
    // @ts-ignore - TS doesn't know about the EyeDropper API yet
    let eyeDropper = new EyeDropper();
    let { sRGBHex } = await eyeDropper.open();
    setColour(sRGBHex);
  };

  const handleCopyColour = async () => {
    try {
      await navigator.clipboard.writeText(colour);
      showTypedToast(EToastTypes.SUCCESS, 'Colour copied to clipboard');
    } catch (err) {
      showTypedToast(EToastTypes.ERROR, 'Failed to copy colour to clipboard');
    }
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      // Handle the dropped files here
      if (acceptedFiles.length > 0 && acceptedFiles[0]) {
        setImage(URL.createObjectURL(acceptedFiles[0]));
      } else {
        showTypedToast(EToastTypes.ERROR, 'No file was dropped.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftColumn}>
        <h1 className={styles.headingText}>Pick colour from image</h1>
        <div className={styles.formSection}>
          <p>1. Select an image</p>
          <FileDropzone
            onDrop={onDrop}
            onDropRejected={() => {
              showTypedToast(EToastTypes.ERROR, 'File type not supported');
            }}
          />
        </div>

        <div className={styles.formSection}>
          <p>2. Pick colour</p>
          <button className={styles.openPickerButton} onClick={openEyeDropper}>
            Open Eyedropper
          </button>
        </div>

        <div className={styles.formSection}>
          <p>3. Copy colour</p>
          <button
            className={styles.selectedColor}
            style={{ background: colour }}
            onClick={handleCopyColour}
          >
            <span>{colour}</span>
          </button>
        </div>
      </div>

      <div className={styles.rightColumn}>
        {image ? (
          <>
            <Image src={image} width={200} height={200} alt="Working Image" />
            <div style={{ backgroundImage: `url(${image})` }} />
          </>
        ) : (
          <svg
            fill="#FFFFFF"
            width="188px"
            height="188px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#FFFFFF"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z"></path>{' '}
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default ColourPicker;
