"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContractList from "@/components/contract/ContractList";
import { createContract } from "@/lib/contractApi";
import { useAdminUser } from "../layout";

export default function ContractListPage() {
  const router = useRouter();
  const user = useAdminUser();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateContract = async () => {
    if (!user) {
      alert("User information missing. Please refresh the page.");
      return;
    }
    const title = window.prompt("Enter contract title:");
    if (!title) return;

    try {
      const res = await createContract(user.uid, title);
      router.push(`/tools/contract/${res.contract.contract_id}`);
    } catch (e) {
      console.error(e);
      alert("Failed to create contract");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-black uppercase tracking-tight mb-2">
          Contracts
        </h2>
        <p className="text-lg text-black/60 font-medium max-w-2xl">
          Manage, generate, and track your contracts.
        </p>
      </div>

      <ContractList
        userId={user?.uid || ""}
        refreshTrigger={refreshTrigger}
        onSelectContract={(c) => {
          router.push(`/tools/contract/${c.contract_id}`);
        }}
        onCreateNew={handleCreateContract}
      />
    </div>
  );
}
