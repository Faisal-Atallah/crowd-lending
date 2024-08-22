import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/prime-ng';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from "ng-apexcharts";
import { ChartOptions } from './chart.types';
import { Charts } from '../portfolio.types';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-portfolio-chart',
  standalone: true,
  imports: [CommonModule, PrimeNgModule, NgApexchartsModule, TranslateModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input() charts: Charts;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _translateService: TranslateService
  ) {

  }

  /**
   * On Init
   */
  ngOnInit(): void {
    this._initChart();
  }

  /**
   * Init Chart
   */
  private _initChart(): void {
    this.chartOptions = {
      series: this.charts.series,
      chart: {
        type: "donut",
        height: 450,
        width: 600
      },
      plotOptions: {
        pie: {
          customScale: 0.7,
          donut: {
            size: '75%',
            labels: {
              show: true,
              name: {
                show: false,
              },
              value: {
                fontSize: '22px',
                fontFamily: 'Inter',
                fontWeight: 700,
                color: '#10194E',
                show: true,
                formatter: (val: any) => {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w: any) => {
                  return (
                    [w.globals.seriesTotals.reduce((a: any, b: any) => { return a + b; }, 0), this._translateService.instant('net-worth')]
                  );
                },
              }
            },
          },
        },
      },
      colors: this.charts.colors,
      labels: this.charts.labels,
      stroke: {
        show: false,
        width: 0
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
        position: "bottom",
        fontSize: '16px',
        fontFamily: 'Inter',
        fontWeight: 500,
        offsetX: 0,
        offsetY: -30,
        color: '#10194E',
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    value: {
                      fontSize: '13px',
                      fontWeight: 700
                    }
                  },
                },
              },
            },
            chart: {
              width: 300,
              height: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this._changeDetectorRef.markForCheck();
  }
}
