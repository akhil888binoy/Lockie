"use client";
import { useState } from "react";
import { uploadToPinata } from "../components/Upload";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (ipfsHash) {
      try {
        await navigator.clipboard.writeText(ipfsHash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
      } catch (error) {
        console.error("Failed to copy the text to clipboard", error);
      }
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await uploadToPinata(file);
      setIpfsHash(response.IpfsHash);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div
      className="h-full w-full  rounded-md p-6 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 "
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-black hover:file:text-white "
      />
      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-black font-mono text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-200"
      >
        Upload
      </button>
      {ipfsHash && (
        <div className="mt-4 bg-black p-4 rounded-lg">
          <p className="text-lg font-medium font-mono break-words text-white">
            IPFS Hash: {ipfsHash}
          </p>
        </div>
      )}
      <button
        onClick={copyToClipboard}
        className="mt-2 w-full bg-white text-black py-2 px-4 rounded-lg hover:bg-black font-mono hover:text-white transition duration-200"
      >
        {copied ? "Copied!" : "Copy Hash"}
      </button>
    </div>
  );
};

export default UploadComponent;
