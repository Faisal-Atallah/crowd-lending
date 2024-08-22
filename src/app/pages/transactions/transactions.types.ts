export interface TransactionData {
    id: number;
    sectorId: null;
    title: string;
    subTitle: string;
    totalaInvestment: number;
    investmentDuration: number;
    logo: string;
    coverImage: string;
    investmentRemaining: number;
    investmentGrade: string;
    roi: number;
    description: string;
    transactions: Transaction[];
}


export interface Transaction {
    id: number;
    amount: number;
    title: string;
    date: null;
    logo: string;
    status: string;
    roi: number;
}

