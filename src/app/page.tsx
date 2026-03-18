"use client";

import HomeContent from "@/components/HomeContent";
import {useAccount} from "wagmi";

export default function Home() {
  const account = useAccount();
  return (
   <div>
    {isConnected ? (
      <div>
        <HomeContent />
      </div>
      
    ) : (
      <div>
        please connect your wallet to use the app
      </div>
    )
    }
    
   </div>
  );
}
