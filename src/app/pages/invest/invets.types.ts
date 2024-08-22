export type Invest = {
    id: number;
    title: string;
    description: string;
    profilePhoto: string;
    coverImage: string;
    sector: string;
    investmentGrade: string;
    duration: string;
    daysLeft: string;
    roi: string;
    points: string,
    progress: number;
    shortFall: number;
    prodKey: string;
}

export type InvestData = {
    amount: number;
    phoneNumber: string;
    userName: string;
    pin: string;
    sysPkText: string;
}

export type SectorFilter = {
    label: string;
    value: string;
}