/**
 * [INPUT]:  依赖 @/components/ui/InputField，依赖 @/constants 的 chainsToTSender/tsenderAbi/erc20Abi，依赖 @/utils 的 calculateTotal
 * [OUTPUT]: 导出 AirdropForm 组件，执行 ERC20 approve + airdropERC20 两步合约交互
 * [POS]:    components/ 的核心业务组件，被 HomeContent 唯一消费
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
"use client";

import { InputForm as InputField } from "@/components/ui/InputField";
import { useState, useMemo } from "react";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total: number = useMemo(() => calculateTotal(amounts), [amounts]);
  const { isPending, writeContractAsync } = useWriteContract();

  async function getApprovedAmount(
    tSenderAddress: string | null,
  ): Promise<bigint> {
    if (!tSenderAddress) {
      alert("No address found. Please use a valid chain.");
      return 0n;
    }
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });
    return response as bigint;
  }

  async function handleSubmit() {
    if (!chainsToTSender[chainId]) {
      alert("当前链不受支持，请切换到支持的网络。");
      return;
    }
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    const totalBigInt = BigInt(total);

    if (approvedAmount < totalBigInt) {
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, totalBigInt],
      });
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      });
      console.log("Approval confirmed", approvalReceipt);
    }

    await writeContractAsync({
      abi: tsenderAbi,
      address: tSenderAddress as `0x${string}`,
      functionName: "airdropERC20",
      args: [
        tokenAddress,
        recipients
          .split(/[,\n]+/)
          .map((addr) => addr.trim())
          .filter((addr) => addr !== ""),
        amounts
          .split(/[,\n]+/)
          .map((amt) => amt.trim())
          .filter((amt) => amt !== "")
          .map((amt) => BigInt(amt)),
        totalBigInt,
      ],
    });
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-6">
      <InputField
        label="Token address"
        placeholder="0x"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <InputField
        label="Recipients"
        placeholder="0x229320, 0x123123, 0x123123"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        large={true}
      />
      <InputField
        label="Amounts"
        placeholder="100,200,300"
        value={amounts}
        onChange={(e) => setAmounts(e.target.value)}
        large={true}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="mt-2 w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-700 disabled:bg-zinc-400 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Send Tokens"}
      </button>
    </div>
  );
}
