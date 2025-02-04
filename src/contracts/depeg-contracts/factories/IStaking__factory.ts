/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IStaking, IStakingInterface } from "../IStaking";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "stakeBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "actualBalance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "reserves",
        type: "int256",
      },
    ],
    name: "LogStakingDipBalanceChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldRewardRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newRewardRate",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardRateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardReservesIncreased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingRewardsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingStaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldStakingRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newStakingRate",
        type: "uint256",
      },
    ],
    name: "LogStakingStakingRateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "enum IStakingDataProvider.TargetType",
        name: "targetType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "LogStakingTargetRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newBalance",
        type: "uint256",
      },
    ],
    name: "LogStakingUnstaked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    name: "calculateCapitalSupport",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "calculateRequiredStaking",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "calculateRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "targetId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "stakeBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IStakingDataProvider.StakeInfo",
        name: "info",
        type: "tuple",
      },
    ],
    name: "calculateRewardsIncrement",
    outputs: [
      {
        internalType: "uint256",
        name: "incrementAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "capitalSupport",
    outputs: [
      {
        internalType: "uint256",
        name: "capitalAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "fromRate",
    outputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "divisor",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBundleRegistry",
    outputs: [
      {
        internalType: "contract BundleRegistry",
        name: "bundleRegistry",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "targetId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "stakeBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "rewardBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "createdAt",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IStakingDataProvider.StakeInfo",
        name: "info",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserveBalance",
    outputs: [
      {
        internalType: "int256",
        name: "reserves",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "rewardReserves",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardRate",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardReserves",
    outputs: [
      {
        internalType: "uint256",
        name: "rewardReserves",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStakeBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "stakeBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "getStakingRate",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStakingWallet",
    outputs: [
      {
        internalType: "address",
        name: "stakingWallet",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "getTarget",
    outputs: [
      {
        components: [
          {
            internalType: "enum IStakingDataProvider.TargetType",
            name: "targetType",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "instanceId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "componentId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bundleId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
        ],
        internalType: "struct IStakingDataProvider.Target",
        name: "target",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idx",
        type: "uint256",
      },
    ],
    name: "getTargetId",
    outputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
    ],
    name: "hasDefinedStakingRate",
    outputs: [
      {
        internalType: "bool",
        name: "hasRate",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "hasInfo",
    outputs: [
      {
        internalType: "bool",
        name: "hasInfos",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "increaseRewardReserves",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "isStakingSupported",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "isTarget",
    outputs: [
      {
        internalType: "bool",
        name: "isATarget",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "enum IStakingDataProvider.TargetType",
            name: "targetType",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "instanceId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "componentId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bundleId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
        ],
        internalType: "struct IStakingDataProvider.Target",
        name: "target",
        type: "tuple",
      },
    ],
    name: "isTargetRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "isRegistered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "isUnstakingSupported",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oneYear",
    outputs: [
      {
        internalType: "uint256",
        name: "yearInSeconds",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "enum IStakingDataProvider.TargetType",
            name: "targetType",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "instanceId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "componentId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bundleId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
        ],
        internalType: "struct IStakingDataProvider.Target",
        name: "target",
        type: "tuple",
      },
    ],
    name: "register",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rewardRate",
        type: "uint256",
      },
    ],
    name: "setRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakingRate",
        type: "uint256",
      },
    ],
    name: "setStakingRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint256",
        name: "dipAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "targets",
    outputs: [
      {
        internalType: "uint256",
        name: "numberOfTargets",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
    ],
    name: "toBundleTargetId",
    outputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
    ],
    name: "toComponentTargetId",
    outputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
    ],
    name: "toInstanceTargetId",
    outputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "int8",
        name: "exp",
        type: "int8",
      },
    ],
    name: "toRate",
    outputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum IStakingDataProvider.TargetType",
        name: "targetType",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "instanceId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "componentId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bundleId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "toTarget",
    outputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "enum IStakingDataProvider.TargetType",
            name: "targetType",
            type: "uint8",
          },
          {
            internalType: "bytes32",
            name: "instanceId",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "componentId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bundleId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
        ],
        internalType: "struct IStakingDataProvider.Target",
        name: "target",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
    ],
    name: "unstakeAndClaimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IStaking__factory {
  static readonly abi = _abi;
  static createInterface(): IStakingInterface {
    return new utils.Interface(_abi) as IStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IStaking {
    return new Contract(address, _abi, signerOrProvider) as IStaking;
  }
}
