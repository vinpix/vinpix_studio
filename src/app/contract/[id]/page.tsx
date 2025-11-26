
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPublicContract } from "@/lib/contractApi";
import ContractViewer from "@/components/contract/ContractViewer";
import { Contract } from "@/types/contract";
import { Lock, Loader2, ArrowRight } from "lucide-react";

export default function PublicContractPage() {
  const params = useParams<{ id: string }>();
  const contractId = params.id;

  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contractId) {
      fetchContract(contractId);
    }
  }, [contractId]);

  const fetchContract = async (id: string, pwd?: string) => {
    try {
      setLoading(true);
      setError("");
      
      const res = await getPublicContract(id, pwd);
      
      if (res.requirePassword) {
          setPasswordRequired(true);
          setIsAuthorized(false);
      } else if (res.contract) {
          setContract(res.contract);
          setIsAuthorized(true);
          setPasswordRequired(false);
      }
      
    } catch (err: any) {
        console.error("Fetch error", err);
        if (err.message && (err.message.includes("Password required") || err.message.includes("401"))) {
            setPasswordRequired(true);
            setIsAuthorized(false);
        } else if (err.message && (err.message.includes("Invalid password") || err.message.includes("403"))) {
             setError("Invalid password. Please try again.");
             setPasswordRequired(true);
        } else {
            setError("Failed to load contract. It may not exist or is not public.");
        }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (contractId) {
        fetchContract(contractId, password);
      }
  };

  if (loading && !contract) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!isAuthorized || passwordRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 max-w-md w-full shadow-2xl border-2 border-black">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-black uppercase text-center mb-2">
            Protected Document
          </h1>
          <p className="text-center text-black/60 mb-8">
            This contract is password protected. Please enter the access code to view and sign.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full p-4 border-2 border-black/10 focus:border-black outline-none text-center text-lg font-bold tracking-widest placeholder:font-normal placeholder:tracking-normal"
                    autoFocus
                />
            </div>
            
            {error && (
                <div className="p-3 bg-red-100 text-red-700 text-sm font-bold text-center border border-red-200">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <>Access Document <ArrowRight size={18}/></>}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!contract) {
       return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
            <h1 className="text-2xl font-black uppercase mb-2">Not Found</h1>
             <p className="text-black/60">{error || "Contract not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <ContractViewer
        userId="" 
        contract={contract}
        isPublicView={true}
        onUpdate={(updated) => setContract(updated)}
      />
    </div>
  );
}
