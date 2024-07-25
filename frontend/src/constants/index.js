export const QuestionStorageAddress =
  "0x880EfB6962BC84B5D8cE121977EA20C1a266a339";

export const QuestionStorageABI = [
  {
    type: "function",
    name: "addhash",
    inputs: [{ name: "questionHash", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAllQuestions",
    inputs: [],
    outputs: [{ name: "", type: "string[]", internalType: "string[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getQuestionByIndex",
    inputs: [
      { name: "questionIndex", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
]; // REPLACE THIS WITH THE NFT CONTRACT ABI
