"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import UploadComponent from "./Uploadcomponent";
import { QuestionStorageABI, QuestionStorageAddress } from "@/constants";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  // Check if the user's wallet is connected, and it's address using Wagmi's hooks.
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: hash, writeContract } = useWriteContract();
  const [questionPaperIndex, setQuestionPaperIndex] = useState(null);
  const [questionPaperHash, setQuestionPaperHash] = useState("");

  const { data: questionPaperHashes } = useReadContract({
    abi: QuestionStorageABI,
    address: QuestionStorageAddress,
    functionName: "getAllQuestions",
  });
  console.log("Question paper hashes", questionPaperHashes);

  const { data: singlequestionPaperHash } = useReadContract({
    abi: QuestionStorageABI,
    address: QuestionStorageAddress,
    functionName: "getQuestionByIndex",
    args: [questionPaperIndex],
  });
  const ipfsUrl = `https://ipfs.io/ipfs/${singlequestionPaperHash}`;

  async function addHash() {
    setLoading(true);
    if (!isConnected) {
      window.alert("Please connect your wallet to create a proposal.");
      setLoading(false);
      return;
    }

    try {
      await writeContract({
        address: QuestionStorageAddress,
        abi: QuestionStorageABI,
        functionName: "addhash",
        args: [questionPaperHash],
      });
    } catch (error) {
      console.error(error);
      window.alert(error);
    }
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  console.log("isConfirmed", isConfirmed);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!isConnected)
    return (
      <div
        className={`${inter.className} bg-[url('/mainbackground.jpg')] bg-cover bg-center min-h-screen`}
      >
        <div className="container mx-auto p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-mono font-semibold text-white">
              Lockie
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center mt-10 bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
            <div className="w-full lg:w-3/5">
              <p className="text-white font-mono text-base sm:text-lg md:text-xl leading-relaxed">
                Welcome to Lockie – the decentralized solution for securely
                storing and retrieving question papers. Our platform leverages
                the power of IPFS and blockchain technology to ensure that your
                documents are safely stored and easily accessible. With Lockie,
                you can confidently upload your question papers, store their
                IPFS hashes on the blockchain, and retrieve them anytime using a
                unique index number. Embrace the future of secure academic
                storage and enjoy a seamless, tamper-proof experience with
                Lockie.
              </p>
              <div className="mt-5 flex justify-center lg:justify-start">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  console.log(address);

  return (
    <div
      className={`${inter.className} bg-[url('/mainbackground.jpg')] min-h-screen bg-cover bg-center`}
    >
      <Head>
        <title>Lockie Dapp</title>
        <meta name="description" content="Lockie Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-mono font-semibold text-white">
            Lockie
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-1/2">
            <p className="text-white font-mono text-base sm:text-lg md:text-xl leading-relaxed">
              Welcome to Lockie – the decentralized solution for securely
              storing and retrieving question papers. Our platform leverages the
              power of IPFS and blockchain technology to ensure that your
              documents are safely stored and easily accessible. With Lockie,
              you can confidently upload your question papers, store their IPFS
              hashes on the blockchain, and retrieve them anytime using a unique
              index number. Embrace the future of secure academic storage and
              enjoy a seamless, tamper-proof experience with Lockie.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <UploadComponent />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-1/2 rounded-md p-6 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black bg-opacity-50 shadow-lg">
            <label className="block text-lg font-medium mb-2 text-white font-mono">
              Add Question Paper Hash:
            </label>
            <input
              className="w-full p-2 text-white rounded-lg mb-4 bg-black bg-opacity-70 placeholder-gray-500"
              placeholder="Add Question Paper Hash"
              type="string"
              onChange={(e) => setQuestionPaperHash(e.target.value)}
            />
            <button
              className="w-full font-mono bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-200"
              onClick={addHash}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
          <div className="w-full lg:w-1/2 rounded-md p-6 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black bg-opacity-50 shadow-lg">
            <label className="block text-lg font-medium font-mono mb-2 text-white">
              Index of Question Paper:
            </label>
            <input
              className="w-full p-2 text-white rounded-lg mb-4 bg-black bg-opacity-70 placeholder-gray-500"
              placeholder="Index of Question Paper"
              type="number"
              onChange={(e) => setQuestionPaperIndex(Number(e.target.value))}
            />
            {singlequestionPaperHash && (
              <div className="mt-4 p-4 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 bg-black bg-opacity-50 shadow-lg">
                <p className="text-lg font-mono break-words text-white">
                  Question Paper Hash: {singlequestionPaperHash}
                </p>
                <button
                  className="mt-2 bg-black font-mono text-white py-1 px-2 rounded-lg hover:bg-white hover:text-black transition duration-200"
                  onClick={() => {
                    navigator.clipboard.writeText(singlequestionPaperHash);
                  }}
                >
                  Copy to Clipboard
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between mt-20 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl font-mono text-white mb-4">
              Your Question Paper Hashes
            </h2>
            {questionPaperHashes?.map((t, index) => (
              <div
                key={index}
                className="bg-black text-white p-4 rounded-lg shadow-md border"
              >
                <p className="font-semibold">
                  Question Paper Hash Index: {index}
                </p>
                <p className="break-words">{t}</p>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            {singlequestionPaperHash && (
              <div>
                <p className="font-semibold text-white font-mono">
                  View the image:
                </p>
                <img
                  src={ipfsUrl}
                  alt="IPFS content"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <button
                  className="mt-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black border transition duration-200"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = ipfsUrl;
                    link.download = "image.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
