import { COLOR_MAP } from "./utils";

export interface InvestorDetailsDataType {
    key?: string;
    id?: string;
    assetClass: string;
    amount: number;
    amountFormatted?: string;
    currency: string;
    updatedDate: Date;
}


export interface InvestorDataType {
    key: string;
    id: string;
    name: string;
    type: number;
    createdDate: Date;
    address: string;
    totalCommitment: number;
    commitments?: InvestorDetailsDataType[];
}

export interface InvestorDetailsProps {
    investor: InvestorDataType;
    onClose: () => void;
}

export type AssetClassType = keyof typeof COLOR_MAP | 'All';