export type Portfolio = {
    charts: Charts;
    savingBalance: number;
    investmentBalance: number;
    categories: Category[];
}

export type Category = {
    id: number;
    title: string;
    balance: number;
    image: string;
    roi: number;
}

export type Charts = {
    series: number[];
    labels: string[];
    colors: string[];
}
