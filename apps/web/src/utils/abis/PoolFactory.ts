export const PoolFactoryABI = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        type: "address",
        name: "previousOwner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolCreated",
    inputs: [
      {
        type: "address",
        name: "issuer_",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "pool_",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProtocolFeeRateSet",
    inputs: [
      {
        type: "uint256",
        name: "protocolFeeRate_",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "createPool",
    inputs: [
      {
        type: "tuple",
        name: "configs",
        components: [
          {
            type: "address",
            name: "fundAsset",
            internalType: "address",
          },
          {
            type: "address",
            name: "issuer",
            internalType: "address",
          },
          {
            type: "string",
            name: "baseURI",
            internalType: "string",
          },
          {
            type: "uint256",
            name: "startTimestamp",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "endTimestamp",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "votingEndTimestamp",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "targetAmount",
            internalType: "uint256",
          },
          {
            type: "string[]",
            name: "names",
            internalType: "string[]",
          },
          {
            type: "uint256[]",
            name: "ids",
            internalType: "uint256[]",
          },
          {
            type: "uint256[]",
            name: "mintPrices",
            internalType: "uint256[]",
          },
          {
            type: "uint256[]",
            name: "maxSupplys",
            internalType: "uint256[]",
          },
        ],
        internalType: "struct Pool.Configs",
      },
    ],
    outputs: [
      {
        type: "address",
        name: "pool_",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "protocolFeeRate",
    inputs: [],
    outputs: [
      {
        type: "uint256",
        name: "",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setProtocolFeeRate",
    inputs: [
      {
        type: "uint256",
        name: "protocolFeeRate_",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        type: "address",
        name: "newOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      {
        type: "address",
        name: "fundAsset_",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
