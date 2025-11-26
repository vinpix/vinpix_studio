
export type ContractStatus = 'draft' | 'generated' | 'signed_by_owner' | 'published' | 'completed';

export interface ContractSignature {
  owner: string | null;
  partner: string | null;
}

export interface Contract {
  contract_id: string;
  user_id: string;
  title: string;
  status: ContractStatus;
  created_at: string;
  updated_at: string;
  html_content: string;
  input_data: Record<string, any>;
  signatures: ContractSignature;
  password?: string;
  s3_url?: string;
  input_data_s3_url?: string;
}

export interface ContractInput {
  title: string;
  // Dynamic fields based on contract type, but generally key-value pairs
  [key: string]: any;
}

