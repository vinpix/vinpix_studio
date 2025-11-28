"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import ContractGenerator from "@/components/contract/ContractGenerator";
import ContractViewer from "@/components/contract/ContractViewer";
import { getContractDetails } from "@/lib/contractApi";
import { Contract } from "@/types/contract";
import { ArrowLeft } from "lucide-react";
import { useAdminUser } from "../../layout";

export default function ContractDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const user = useAdminUser();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"view" | "edit">("view");

  useEffect(() => {
    const fetchContract = async () => {
      if (!unwrappedParams.id || !user?.uid) return;

      try {
        setIsLoading(true);
        const res = await getContractDetails(unwrappedParams.id, user.uid);
        setContract(res.contract);

        // If no content, default to edit mode
        if (!res.contract.html_content) {
          setViewMode("edit");
        }
      } catch (error) {
        console.error("Failed to load contract", error);
        alert("Failed to load contract details");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchContract();
    }
  }, [unwrappedParams.id, user]);

  const handleBack = () => {
    router.push("/tools/contract");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <div className="font-mono text-sm uppercase">Loading Contract...</div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <p>Contract not found</p>
        <button onClick={handleBack} className="mt-4 underline">
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-black/60 hover:text-black font-bold uppercase text-xs tracking-wide transition-colors mb-4"
        >
          <ArrowLeft size={14} /> Back to Contracts
        </button>
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {contract.title}
        </h2>
      </div>

      {viewMode === "edit" ? (
        <ContractGenerator
          userId={user?.uid || ""}
          contract={contract}
          onGenerated={(updatedContract) => {
            setContract(updatedContract);
            setViewMode("view");
          }}
          onCancel={() => {
            if (contract.html_content) {
              setViewMode("view");
            } else {
              handleBack();
            }
          }}
        />
      ) : (
        <ContractViewer
          userId={user?.uid || ""}
          contract={contract}
          onUpdate={(updatedContract) => setContract(updatedContract)}
          onBack={handleBack}
          onEdit={() => setViewMode("edit")}
        />
      )}
    </div>
  );
}

