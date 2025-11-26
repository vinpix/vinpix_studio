
import React, { useState, useEffect } from "react";
import { generateContract, evaluateContractInputs, saveDraft, EvaluationResult } from "@/lib/contractApi";
import { Contract } from "@/types/contract";
import { Plus, Trash, Wand2, Loader2, Expand, X, BrainCircuit, AlertTriangle, CheckCircle, Save } from "lucide-react";

interface ContractGeneratorProps {
  userId: string;
  contract: Contract;
  onGenerated: (contract: Contract) => void;
  onCancel: () => void;
}

interface ContextItem {
  id: string;
  content: string;
}

export default function ContractGenerator({
  userId,
  contract,
  onGenerated,
  onCancel,
}: ContractGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState<{ key: string; value: string }[]>([
    { key: "Party A Name", value: "" },
    { key: "Party B Name", value: "" },
    { key: "Effective Date", value: "" },
    { key: "Payment Amount", value: "" },
  ]);
  
  const [contexts, setContexts] = useState<ContextItem[]>([
    { id: "1", content: "" }
  ]);
  
  const [expandedContextId, setExpandedContextId] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  // Load initial data from contract input_data if available
  useEffect(() => {
    if (contract.input_data) {
      // Restore fields
      const loadedFields: { key: string; value: string }[] = [];
      const loadedContexts: ContextItem[] = [];
      
      Object.entries(contract.input_data).forEach(([key, value]) => {
        if (key === "Additional Contexts" && Array.isArray(value)) {
          value.forEach((ctxContent: string, idx: number) => {
            loadedContexts.push({
              id: Date.now().toString() + idx, // unique id
              content: ctxContent
            });
          });
        } else if (key !== "Contract Title") {
          // Assume other keys are fields
          loadedFields.push({ key, value: String(value) });
        }
      });

      if (loadedFields.length > 0) {
        setFields(loadedFields);
      }
      if (loadedContexts.length > 0) {
        setContexts(loadedContexts);
      }
    }
  }, [contract.input_data]);

  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: string) => {
    const newFields = [...fields];
    newFields[index] = { key, value };
    setFields(newFields);
  };

  const addContext = () => {
    setContexts([...contexts, { id: Date.now().toString(), content: "" }]);
  };

  const removeContext = (id: string) => {
    setContexts(contexts.filter(c => c.id !== id));
  };

  const updateContext = (id: string, content: string) => {
    setContexts(contexts.map(c => c.id === id ? { ...c, content } : c));
  };

  const getCombinedInputData = () => {
    const inputData: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.key) inputData[f.key] = f.value;
    });
    
    // Filter empty contexts
    const validContexts = contexts.filter(c => c.content.trim()).map(c => c.content);
    if (validContexts.length > 0) {
      inputData["Additional Contexts"] = validContexts;
    }
    inputData["Contract Title"] = contract.title;
    return inputData;
  };

  const handleEvaluate = async () => {
    try {
      setEvaluating(true);
      setEvaluation(null);
      const inputData = getCombinedInputData();
      const res = await evaluateContractInputs(inputData);
      setEvaluation(res.evaluation);
    } catch (error) {
      console.error("Evaluation failed", error);
      alert("Failed to evaluate inputs.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setSaving(true);
      const inputData = getCombinedInputData();
      await saveDraft(contract.contract_id, userId, inputData);
      alert("Draft saved successfully.");
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save draft.");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const inputData = getCombinedInputData();

      const res = await generateContract(contract.contract_id, userId, inputData);
      
      const updatedContract: Contract = {
        ...contract,
        status: "generated",
        html_content: res.htmlContent,
        input_data: inputData,
        updated_at: new Date().toISOString(),
      };
      
      onGenerated(updatedContract);
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-6xl mx-auto relative">
      <div className="mb-6 border-b-2 border-black/10 pb-4 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-1">
            Generate Contract
          </h2>
          <p className="text-black/60 font-medium">
            Define data points for "{contract.title}" and evaluate before drafting.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Data Points */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                Key Data Points
              </label>
              <button
                onClick={addField}
                className="text-xs bg-black text-white px-2 py-1 font-bold uppercase hover:bg-gray-800 flex items-center gap-1"
              >
                <Plus size={12} /> Add Field
              </button>
            </div>
            <div className="space-y-2">
              {fields.map((field, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Field Name (e.g. Salary)"
                    value={field.key}
                    onChange={(e) => updateField(idx, e.target.value, field.value)}
                    className="flex-1 p-2 border border-black/20 text-sm focus:border-black outline-none font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => updateField(idx, field.key, e.target.value)}
                    className="flex-1 p-2 border border-black/20 text-sm focus:border-black outline-none"
                  />
                  <button
                    onClick={() => removeField(idx)}
                    className="p-2 text-black/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Contexts List */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
                Additional Context / Terms
              </label>
              <button
                onClick={addContext}
                className="text-xs bg-black text-white px-2 py-1 font-bold uppercase hover:bg-gray-800 flex items-center gap-1"
              >
                <Plus size={12} /> Add Context
              </button>
            </div>
            
            <div className="space-y-3">
              {contexts.map((ctx, idx) => (
                <div key={ctx.id} className="relative group">
                  <textarea
                    value={ctx.content}
                    onChange={(e) => updateContext(ctx.id, e.target.value)}
                    placeholder={`Context section ${idx + 1}...`}
                    className="w-full h-24 p-3 border border-black/20 text-sm focus:border-black outline-none resize-y pr-10"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                     <button
                      onClick={() => setExpandedContextId(ctx.id)}
                      className="p-1.5 bg-white border border-black/10 text-black/60 hover:text-black hover:border-black transition-colors shadow-sm"
                      title="Expand View"
                    >
                      <Expand size={14} />
                    </button>
                    {contexts.length > 1 && (
                      <button
                        onClick={() => removeContext(ctx.id)}
                        className="p-1.5 bg-white border border-black/10 text-red-400 hover:text-red-600 hover:border-red-600 transition-colors shadow-sm"
                        title="Remove"
                      >
                        <Trash size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Evaluation */}
        <div className="space-y-6">
          {/* Evaluation Result Card */}
          {evaluation && (
            <div className="bg-gray-50 border border-black/10 p-4 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-start mb-3 border-b border-black/5 pb-2">
                <h4 className="font-bold uppercase text-sm flex items-center gap-2">
                  <BrainCircuit size={16} className="text-purple-600"/> Analysis
                </h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  evaluation.score > 80 ? 'bg-green-100 text-green-800' : 
                  evaluation.score > 50 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  Score: {evaluation.score}/100
                </span>
              </div>
              
              <div className="space-y-4 text-xs">
                <div>
                  <p className="font-bold text-black/70 mb-1">Risk Level</p>
                  <span className={`font-bold uppercase ${
                    evaluation.risk_level === 'High' ? 'text-red-600' : 
                    evaluation.risk_level === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {evaluation.risk_level}
                  </span>
                </div>

                {evaluation.missing_info.length > 0 && (
                  <div>
                    <p className="font-bold text-black/70 mb-1 flex items-center gap-1">
                      <AlertTriangle size={12} className="text-orange-500"/> Missing Info
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5 text-black/60">
                      {evaluation.missing_info.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {evaluation.suggestions.length > 0 && (
                  <div>
                    <p className="font-bold text-black/70 mb-1 flex items-center gap-1">
                      <CheckCircle size={12} className="text-blue-500"/> Suggestions
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5 text-black/60">
                      {evaluation.suggestions.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 sticky top-6">
            <button
              onClick={handleEvaluate}
              disabled={evaluating || loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-purple-600 text-purple-700 font-bold uppercase tracking-wide hover:bg-purple-50 disabled:opacity-50 transition-all"
            >
              {evaluating ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Evaluating...
                </>
              ) : (
                <>
                  <BrainCircuit size={18} /> Evaluate Inputs
                </>
              )}
            </button>

            <button
              onClick={handleSaveDraft}
              disabled={loading || saving}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-black text-black font-bold uppercase tracking-wide hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> Save Draft
                </>
              )}
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading || evaluating}
              className="w-full flex items-center justify-center gap-2 py-4 bg-black text-white font-bold uppercase tracking-wide hover:bg-gray-800 disabled:opacity-50 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Generating...
                </>
              ) : (
                <>
                  <Wand2 size={20} /> Generate Draft
                </>
              )}
            </button>
            
            <button
              onClick={onCancel}
              disabled={loading}
              className="w-full py-3 text-black/50 font-bold uppercase text-sm hover:text-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Expand Modal */}
      {expandedContextId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl h-[80vh] shadow-2xl border-2 border-black flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-black/10">
              <h3 className="font-bold uppercase">Edit Context</h3>
              <button
                onClick={() => setExpandedContextId(null)}
                className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 p-0">
              <textarea
                value={contexts.find(c => c.id === expandedContextId)?.content || ""}
                onChange={(e) => updateContext(expandedContextId, e.target.value)}
                className="w-full h-full p-6 resize-none focus:outline-none text-base font-mono leading-relaxed"
                placeholder="Enter detailed context here..."
                autoFocus
              />
            </div>
            <div className="p-4 border-t border-black/10 bg-gray-50 flex justify-end">
              <button
                onClick={() => setExpandedContextId(null)}
                className="px-6 py-2 bg-black text-white font-bold uppercase hover:bg-gray-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
