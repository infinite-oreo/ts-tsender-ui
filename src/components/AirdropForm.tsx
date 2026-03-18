"use client";

import { InputForm as InputField } from "@/components/ui/InputField";
import { useState,useMemo } from "react";
import { chainsToTSender,tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract} from "wagmi";
import {readContract, waitForTransactionReceipt} from "@wagmi/core";
import { calculateTotal } from "@/utils";


export default function AirdropForm() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amounts, setAmounts] = useState("");
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total: number = useMemo(() => calculateTotal(amounts),[amounts]);
    const {data: hash, isPending, writeContractAsync} = useWriteContract();

    async function getApprovedAmount(tSenderAddress:string | null):Promise<number> {
        if(!tSenderAddress) {
            alert("No address found. Please use a valid chain.")
            return 0;
        }
        const response = await readContract(config,{
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [account.address, tSenderAddress as `0x${string}`]
        });
        
        return response as number;
    }

    async function handleSubmit() {
        // 1a.If approved, moved to step 2
        // 1b. Approve our tsender contract to send our tokens
        // 2.Call the airdrop function on the tsender contract
        // 3.Wait for the transaction to be minjed
        const tSenderAddress = chainsToTSender[chainId]["tsender"];
        const approvedAmount = await getApprovedAmount(tSenderAddress);

        if(approvedAmount < total) {
            const approvalHash = await writeContractAsync({
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "approve",
            args: [tSenderAddress as `0x${string}`, BigInt(total)]
            })
        const approvalReceipt = await waitForTransactionReceipt(config, {
            hash: approvalHash,
            })
        console.log("Approval confirmed", approvalReceipt);

        await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            })

        }else{
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            })
        }
    }


    return (
        <div>
            <InputField 
            label="Token address" 
            placeholder="0x" 
            value = {tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}   
            />
            <InputField 
            label="Recipients" 
            placeholder="0x229320, 0x123123, 0x123123" 
            value = {recipients}
            onChange={e => setRecipients(e.target.value)}  
            large = {true} 
            />
            <InputField 
            label="Amounts" 
            placeholder="100,200,300" 
            value = {amounts}
            onChange={e => setAmounts(e.target.value)}   
            large = {true} 
            />
            <button onClick={handleSubmit}>
                Send Tokens
            </button>
        </div>
    )
}
