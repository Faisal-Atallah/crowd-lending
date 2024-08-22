import { ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries | any;
    chart: ApexChart | any;
    responsive: ApexResponsive[] | any;
    labels: any;
    colors: string[] | any;
    fill: ApexFill;
    dataLabels: ApexDataLabels | any;
    plotOptions: ApexPlotOptions | any;
    legend: ApexLegend | any;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    stroke: any;
};