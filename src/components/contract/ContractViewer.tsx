import React, { useState, useRef } from "react";
import { Contract } from "@/types/contract";
import {
  signContract,
  updateContractStatus,
  saveDraft,
  deleteSignature,
} from "@/lib/contractApi";
import {
  ArrowLeft,
  Check,
  Copy,
  Key,
  PenTool,
  Share2,
  Loader2,
  Save,
  Edit,
  Eraser,
  Download,
  Trash2,
} from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

interface ContractViewerProps {
  userId: string;
  contract: Contract;
  onBack?: () => void;
  onUpdate: (contract: Contract) => void;
  onEdit?: () => void;
  isPublicView?: boolean;
}

export default function ContractViewer({
  userId,
  contract,
  onBack,
  onUpdate,
  onEdit,
  isPublicView = false,
}: ContractViewerProps) {
  const [isSigning, setIsSigning] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [signatureText, setSignatureText] = useState("");
  // const [signMode, setSignMode] = useState<'type' | 'draw'>('type'); // Removed
  const sigCanvas = useRef<InstanceType<typeof SignatureCanvas> | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editableHtml, setEditableHtml] = useState(contract.html_content);

  // Derive state
  const isOwnerSigned = !!contract.signatures?.owner;
  const isPartnerSigned = !!contract.signatures?.partner;
  const isPublished =
    contract.status === "published" || contract.status === "completed";
  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/contract/${contract.contract_id}`
      : "";

  // Determine role for signing
  const signingRole = isPublicView ? "partner" : "owner";

  // Allow signing if:
  // 1. Not signed yet
  // 2. OR Signed but not fully completed/locked (so they can update signature)
  // For simplicity, we allow re-signing always unless it's strictly locked by business logic (which we don't have yet)
  const hasSigned = isPublicView ? isPartnerSigned : isOwnerSigned;
  const canSign = true; // Always allow opening the sign modal to sign or re-sign

  const handleSign = async () => {
    // Validate inputs
    if (!signatureText.trim()) {
      alert("Please type your full name.");
      return;
    }
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert("Please draw your signature.");
      return;
    }

    // Safely extract signature image
    let finalSignature: string;
    try {
      const instance = sigCanvas.current as unknown as {
        getTrimmedCanvas?: () => HTMLCanvasElement;
        getCanvas?: () => HTMLCanvasElement;
      };
      if (instance && typeof instance.getTrimmedCanvas === "function") {
        try {
          const trimmedCanvas = instance.getTrimmedCanvas();
          if (trimmedCanvas && typeof trimmedCanvas.toDataURL === "function") {
            finalSignature = trimmedCanvas.toDataURL("image/png");
          } else {
            throw new Error("Trimmed canvas missing toDataURL");
          }
        } catch {
          // If trimmed fails in production builds, fallback to full canvas
          if (typeof instance.getCanvas === "function") {
            finalSignature = instance.getCanvas().toDataURL("image/png");
          } else {
            alert("Failed to process signature. Please try again.");
            return;
          }
        }
      } else if (instance && typeof instance.getCanvas === "function") {
        // Fallback for environments without getTrimmedCanvas
        finalSignature = instance.getCanvas().toDataURL("image/png");
      } else {
        alert("Signature canvas is not ready. Please try again.");
        return;
      }
    } catch (error) {
      console.error("Error getting signature:", error);
      // Final fallback attempt
      const instance = sigCanvas.current as unknown as {
        getCanvas?: () => HTMLCanvasElement;
      };
      if (instance && typeof instance.getCanvas === "function") {
        finalSignature = instance.getCanvas().toDataURL("image/png");
      } else {
        alert("Failed to process signature. Please try again.");
        return;
      }
    }
    const signerName = signatureText.trim();

    try {
      setLoading(true);
      const res = await signContract(
        contract.contract_id,
        signingRole,
        finalSignature,
        signerName,
        isPublicView ? undefined : userId
      );

      // Optimistic update: Update signatures immediately
      const updatedSignatures = {
        ...contract.signatures,
        [signingRole]: finalSignature,
      };

      // Determine new status
      const newStatus =
        updatedSignatures.owner && updatedSignatures.partner
          ? "completed"
          : signingRole === "owner" && contract.status === "generated"
          ? "signed_by_owner"
          : contract.status;

      const updatedContract = {
        ...contract,
        signatures: updatedSignatures,
        html_content: res.htmlContent || contract.html_content, // Update HTML content
        s3_url: res.s3Url || contract.s3_url,
        status: newStatus,
        updated_at: new Date().toISOString(), // Update timestamp
      } as Contract;

      if (res.htmlContent) {
        setEditableHtml(res.htmlContent);
      }

      // Update local state immediately (optimistic update)
      onUpdate(updatedContract);
      setIsSigning(false);

      // Clear signature inputs
      setSignatureText("");
      if (sigCanvas.current) {
        sigCanvas.current.clear();
      }
    } catch (error) {
      console.error("Sign failed", error);
      alert("Failed to sign contract.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      await updateContractStatus(
        contract.contract_id,
        "published",
        userId,
        password
      );

      const updatedContract = {
        ...contract,
        status: "published",
        password: password,
      } as Contract;

      onUpdate(updatedContract);
      setIsPublishing(false);
    } catch (error) {
      console.error("Publish failed", error);
      alert("Failed to publish contract.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (isPublicView) return;
    try {
      setSaving(true);
      // Save the edited HTML content
      await saveDraft(contract.contract_id, userId, undefined, editableHtml);

      // Update local state to reflect saved content
      const updatedContract = {
        ...contract,
        html_content: editableHtml,
      };
      onUpdate(updatedContract);

      alert("Contract saved successfully.");
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save contract.");
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl);
    alert("URL copied to clipboard!");
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleDeleteSignature = async (role: "owner" | "partner") => {
    if (!confirm(`Are you sure you want to delete the ${role} signature?`)) {
      return;
    }

    try {
      setLoading(true);
      const res = await deleteSignature(
        contract.contract_id,
        role,
        isPublicView ? undefined : userId
      );

      // Update local state
      const updatedSignatures = {
        ...contract.signatures,
        [role]: null,
      };

      const updatedContract = {
        ...contract,
        signatures: updatedSignatures,
        html_content: res.htmlContent || contract.html_content,
        updated_at: new Date().toISOString(),
      } as Contract;

      if (res.htmlContent) {
        setEditableHtml(res.htmlContent);
      }

      onUpdate(updatedContract);
      alert(`${role} signature deleted successfully.`);
    } catch (error) {
      console.error("Delete signature failed", error);
      alert("Failed to delete signature.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col bg-gray-100 relative ${
        isPublicView ? "min-h-screen" : "h-full"
      }`}
    >
      {/* Toolbar */}
      <div className="bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between shrink-0 print:hidden">
        <div className="flex items-center gap-4">
          {!isPublicView && onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h2 className="font-bold text-lg leading-none">{contract.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono text-black/50">
                ID: {contract.contract_id}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                  contract.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {contract.status.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isPublicView && onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 text-black text-sm font-bold uppercase hover:bg-gray-50 transition-colors rounded"
            >
              <Edit size={16} />
              Input
            </button>
          )}

          {!isPublicView && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 text-black text-sm font-bold uppercase hover:bg-gray-50 transition-colors rounded"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              Save
            </button>
          )}

          {canSign && (
            <button
              onClick={() => setIsSigning(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase hover:bg-blue-700 transition-colors rounded"
            >
              <PenTool size={16} />{" "}
              {hasSigned
                ? `Re-sign as ${signingRole}`
                : `Sign as ${signingRole}`}
            </button>
          )}

          {!isPublicView && !isPublished && (
            <button
              onClick={() => setIsPublishing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold uppercase hover:bg-gray-800 transition-colors rounded"
            >
              <Share2 size={16} /> Publish
            </button>
          )}

          {!isPublicView && isPublished && (
            <button
              onClick={() => setIsPublishing(true)}
              className="flex items-center gap-2 px-4 py-2 border border-black/20 text-black text-sm font-bold uppercase hover:bg-gray-50 transition-colors rounded"
            >
              <Key size={16} /> Settings
            </button>
          )}

          {isPublicView && isPartnerSigned && (
            <div className="px-4 py-2 bg-green-100 text-green-800 text-sm font-bold uppercase rounded flex items-center gap-2">
              <Check size={16} /> You have signed
            </div>
          )}
        </div>
      </div>

      {/* Floating Export PDF button - available for both owner and partner */}
      <button
        onClick={handleExportPDF}
        className="print:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black text-white px-4 py-3 font-bold uppercase text-sm tracking-wider hover:bg-blue-600 transition-colors shadow-lg border-2 border-black"
      >
        <Download size={16} />
        Export PDF
      </button>

      <div
        className={`flex-1 flex relative print:block print:h-auto print:min-h-0 ${
          isPublicView ? "" : "overflow-hidden"
        }`}
      >
        {/* Document Preview */}
        <div
          className={`contract-preview-container flex-1 p-8 flex justify-center bg-[#525659] print:bg-white print:p-0 print:block print:h-auto print:min-h-0 ${
            isPublicView ? "" : "overflow-y-auto"
          }`}
        >
          <div className="contract-document bg-white w-full max-w-[800px] min-h-[1100px] shadow-2xl p-[50px] text-black relative print:shadow-none print:max-w-full print:min-h-0 print:p-8">
            {/* Editable Content Area */}
            <div
              contentEditable={!isPublicView} // Only editable by owner/admin
              suppressContentEditableWarning={true}
              onBlur={(e) => setEditableHtml(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: contract.html_content }} // Initialize
              className="outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-4 rounded p-1 transition-shadow"
            />

            {/* Signature Area Visualization */}
            <div className="mt-12 pt-8 border-t border-black/10 grid grid-cols-2 gap-12 print:hidden">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold uppercase text-xs">Signed by Owner</p>
                  {isOwnerSigned && !isPublicView && (
                    <button
                      onClick={() => handleDeleteSignature("owner")}
                      disabled={loading}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      title="Delete owner signature"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                {isOwnerSigned && contract.signatures.owner ? (
                  contract.signatures.owner.startsWith("http") ||
                  contract.signatures.owner.startsWith("data:") ? (
                    <img
                      src={contract.signatures.owner}
                      alt="Owner Signature"
                      className="h-16 object-contain border-b border-black/20 pb-2"
                    />
                  ) : (
                    <div className="font-script text-2xl text-blue-900 border-b border-black/20 pb-2">
                      {contract.signatures.owner}
                    </div>
                  )
                ) : (
                  <div className="h-10 border-b border-black/20 bg-gray-50 flex items-end">
                    <span className="text-[10px] text-black/20 px-1">
                      Waiting for signature...
                    </span>
                  </div>
                )}
                <p className="text-xs text-black/40 mt-1">
                  Date:{" "}
                  {isOwnerSigned
                    ? new Date(contract.updated_at).toLocaleDateString()
                    : ""}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold uppercase text-xs">
                    Signed by Partner
                  </p>
                  {isPartnerSigned && (
                    <button
                      onClick={() => handleDeleteSignature("partner")}
                      disabled={loading}
                      className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      title="Delete partner signature"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                {isPartnerSigned && contract.signatures.partner ? (
                  contract.signatures.partner.startsWith("http") ||
                  contract.signatures.partner.startsWith("data:") ? (
                    <img
                      src={contract.signatures.partner}
                      alt="Partner Signature"
                      className="h-16 object-contain border-b border-black/20 pb-2"
                    />
                  ) : (
                    <div className="font-script text-2xl text-blue-900 border-b border-black/20 pb-2">
                      {contract.signatures.partner}
                    </div>
                  )
                ) : (
                  <div className="h-10 border-b border-black/20 bg-gray-50 flex items-end">
                    <span className="text-[10px] text-black/20 px-1">
                      Waiting for signature...
                    </span>
                  </div>
                )}
                <p className="text-xs text-black/40 mt-1">
                  Date:{" "}
                  {isPartnerSigned
                    ? new Date(contract.updated_at).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modals/Overlays - Centered with Fixed Positioning */}
        {isSigning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
            <div className="bg-white p-6 max-w-md w-full shadow-2xl border-2 border-black animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold uppercase mb-4">
                Sign Contract
              </h3>
              <p className="text-sm text-black/60 mb-4">
                I, the undersigned, hereby agree to the terms and conditions set
                forth in this agreement.
              </p>

              <div className="mb-4">
                <label className="text-xs font-bold uppercase block mb-2">
                  1. Type your full name
                </label>
                <input
                  type="text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="e.g. Nguyen Van A"
                  className="w-full p-3 border border-black/20 font-bold text-lg focus:border-black outline-none"
                  autoFocus
                />
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold uppercase block mb-2">
                  2. Draw your signature
                </label>
                <div className="border border-black/20 relative bg-gray-50">
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: "sigCanvas",
                    }}
                  />
                  <button
                    onClick={() => sigCanvas.current?.clear()}
                    className="absolute top-2 right-2 p-1 text-black/20 hover:text-black"
                    title="Clear"
                  >
                    <Eraser size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSign}
                  disabled={loading}
                  className="flex-1 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    "Sign Document"
                  )}
                </button>
                <button
                  onClick={() => setIsSigning(false)}
                  className="px-4 py-3 border border-black/10 font-bold uppercase hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isPublishing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
            <div className="bg-white p-6 max-w-md w-full shadow-2xl border-2 border-black animate-in zoom-in-95 duration-200">
              <h3 className="text-xl font-bold uppercase mb-4">
                Publish & Share
              </h3>

              {isPublished ? (
                <div className="mb-6">
                  <p className="text-sm font-bold text-green-600 flex items-center gap-2 mb-4">
                    <Check size={16} /> Published Successfully
                  </p>
                  <div className="p-3 bg-gray-50 border border-black/10 flex items-center justify-between gap-2 mb-2">
                    <div className="truncate text-xs font-mono">
                      {publicUrl}
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="text-black hover:text-blue-600"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-black/60 mb-4">
                  Set a password to protect this document before sharing.
                </p>
              )}

              <div className="mb-4">
                <label className="text-xs font-bold uppercase block mb-1">
                  Access Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set a password (optional)"
                  className="w-full p-3 border border-black/20 focus:border-black outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex-1 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : isPublished ? (
                    "Update Settings"
                  ) : (
                    "Publish Now"
                  )}
                </button>
                <button
                  onClick={() => setIsPublishing(false)}
                  className="px-4 py-3 border border-black/10 font-bold uppercase hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
