import { callLambdaFunction } from "./auth";
import { Contract, ContractInput } from "@/types/contract";

export async function createContract(
  userId: string,
  title: string
): Promise<{ contract: Contract }> {
  const result = await callLambdaFunction("create_contract", { userId, title });
  return result as { contract: Contract };
}

export async function getContracts(
  userId: string
): Promise<{ contracts: Contract[] }> {
  const result = await callLambdaFunction("get_contracts", { userId });
  return result as { contracts: Contract[] };
}

export async function getContractDetails(
  contractId: string,
  userId?: string
): Promise<{ contract: Contract }> {
  const result = await callLambdaFunction("get_contract_details", {
    contractId,
    userId,
  });
  return result as { contract: Contract };
}

export async function generateContract(
  contractId: string,
  userId: string,
  inputData: ContractInput
): Promise<{ message: string; htmlContent: string }> {
  const result = await callLambdaFunction("generate_contract", {
    contractId,
    userId,
    inputData,
  });
  return result as { message: string; htmlContent: string };
}

export async function signContract(
  contractId: string,
  role: "owner" | "partner",
  signatureData: string,
  signerName: string,
  userId?: string
): Promise<{ message: string; htmlContent?: string; s3Url?: string }> {
  const result = await callLambdaFunction("sign_contract", {
    contractId,
    role,
    signatureData,
    signerName,
    userId,
  });
  return result as { message: string; htmlContent?: string; s3Url?: string };
}

export async function updateContractStatus(
  contractId: string,
  status: string,
  userId: string,
  password?: string
): Promise<{ message: string }> {
  const result = await callLambdaFunction("update_contract_status", {
    contractId,
    status,
    userId,
    password,
  });
  return result as { message: string };
}

export async function getPublicContract(
  contractId: string,
  password?: string
): Promise<{ contract: Contract; requirePassword?: boolean }> {
  const result = await callLambdaFunction("get_public_contract", {
    contractId,
    password,
  });
  return result as { contract: Contract; requirePassword?: boolean };
}

export interface EvaluationResult {
  score: number;
  missing_info: string[];
  suggestions: string[];
  risk_level: "Low" | "Medium" | "High";
  summary: string;
}

export async function evaluateContractInputs(
  inputData: ContractInput
): Promise<{ evaluation: EvaluationResult }> {
  const result = await callLambdaFunction("evaluate_contract_inputs", {
    inputData,
  });
  return result as { evaluation: EvaluationResult };
}

export async function saveDraft(
  contractId: string,
  userId: string,
  inputData?: ContractInput,
  htmlContent?: string
): Promise<{ message: string }> {
  const result = await callLambdaFunction("save_draft", {
    contractId,
    userId,
    inputData,
    htmlContent,
  });
  return result as { message: string };
}

export async function deleteContract(
  contractId: string,
  userId: string
): Promise<{ message: string }> {
  const result = await callLambdaFunction("delete_contract", {
    contractId,
    userId,
  });
  return result as { message: string };
}

export async function deleteSignature(
  contractId: string,
  role: "owner" | "partner",
  userId?: string
): Promise<{ message: string; htmlContent?: string }> {
  const result = await callLambdaFunction("delete_signature", {
    contractId,
    role,
    userId,
  });
  return result as { message: string; htmlContent?: string };
}
