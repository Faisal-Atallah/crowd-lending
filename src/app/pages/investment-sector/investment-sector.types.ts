export interface Welcome6 {
    id: number;
    totalInvestments: null;
    image: string;
    sectorName: string;
    roi: number;
    investments: DetailedCustInvestmentsDtoList[];
}

export interface DetailedCustInvestmentsDtoList {
    id: number;
    profilePhoto: string;
    coverImage: string;
    title: string;
    subTilte: string;
    investmentAmount: number;
    investmentDuration: number;
    investmentRemaining: number;
    investmentGrade: string;
    roi: number;
}