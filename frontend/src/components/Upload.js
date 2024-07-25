"use client";
import axios from "axios";

const pinataApiKey = "31cb1eeb4f6899c4cc0b";
const pinataSecretApiKey =
  "7ff5a8e4654a42a56c570b812465402c8e2873369e332634b4d0a49ed7ce8d63";

export const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "Question File",
  });
  data.append("pinataMetadata", metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  data.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    throw error;
  }
};
