
import React, { useEffect, useState } from "react";
import { getContracts, deleteContract } from "@/lib/contractApi";
import { Contract } from "@/types/contract";
import { Plus, FileText, ExternalLink, Loader2, Trash2 } from "lucide-react";

interface ContractListProps {
  userId: string;
  onSelectContract: (contract: Contract) => void;
  onCreateNew: () => void;
  refreshTrigger?: number; // Trigger refresh when this changes
}

export default function ContractList({ userId, onSelectContract, onCreateNew, refreshTrigger }: ContractListProps) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadContracts();
  }, [userId, refreshTrigger]);

  const loadContracts = async () => {
    try {
      setIsLoading(true);
      const res = await getContracts(userId);
      setContracts(res.contracts || []);
    } catch (error) {
      console.error("Failed to load contracts", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Expose refresh function via useEffect callback pattern
  // This allows parent to trigger refresh by changing refreshTrigger

  const handleDelete = async (e: React.MouseEvent, contractId: string) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this contract? This cannot be undone.")) {
      return;
    }

    try {
      setDeletingId(contractId);
      await deleteContract(contractId, userId);
      setContracts(contracts.filter(c => c.contract_id !== contractId));
    } catch (error) {
      console.error("Failed to delete contract", error);
      alert("Failed to delete contract");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "generated":
        return "bg-blue-100 text-blue-700";
      case "signed_by_owner":
        return "bg-purple-100 text-purple-700";
      case "published":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold uppercase tracking-wide">My Contracts</h3>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} /> New Contract
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-black/20" size={32} />
        </div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-black/10 rounded">
          <p className="text-black/40 font-medium">No contracts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contracts.map((contract) => (
            <div
              key={contract.contract_id}
              onClick={() => onSelectContract(contract)}
              className="bg-white border border-black/10 p-4 hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group relative flex flex-col justify-between h-[180px]"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-gray-50 rounded group-hover:bg-black group-hover:text-white transition-colors">
                    <FileText size={20} />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${getStatusColor(
                      contract.status
                    )}`}
                  >
                    {contract.status.replace(/_/g, " ")}
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-1 truncate pr-8">{contract.title}</h4>
                <p className="text-xs text-black/50 font-mono">
                  Created: {new Date(contract.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-4 border-t border-black/5 pt-3">
                <div className="text-xs font-bold uppercase text-black/40 group-hover:text-black flex items-center gap-1">
                  {contract.html_content ? "View Contract" : "Continue Editing"} <ExternalLink size={10} />
                </div>
                
                <button
                  onClick={(e) => handleDelete(e, contract.contract_id)}
                  disabled={deletingId === contract.contract_id}
                  className="text-black/20 hover:text-red-500 p-1.5 rounded hover:bg-red-50 transition-colors z-10"
                  title="Delete Contract"
                >
                  {deletingId === contract.contract_id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
