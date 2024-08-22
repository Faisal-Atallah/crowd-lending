import { Routes } from "@angular/router";
import { PortfolioComponent } from "./portfolio.component";
import { PortfolioItemsComponent } from "./items";
import { inject } from "@angular/core";
import { PortfolioService } from "./portfolio.service";
import { InvestmentSectorComponent, investmentSectorResolver } from "../investment-sector";
import { InvestmentSectorListComponent } from "../investment-sector/list";
import { TransactionsComponent } from "../transactions";
import { TransactionsListComponent } from "../transactions/list";
import { transactionResolver } from "../transactions/transactions.resolver";

export default [] = [
    {
        path: '',
        component: PortfolioComponent,
        children: [
            {
                path: '',
                component: PortfolioItemsComponent,
                resolve: {
                    portofolio: () => inject(PortfolioService).getPortfolio()
                }
            },
            {
                path: ':id',
                component: InvestmentSectorComponent,
                resolve: {
                    investmentSector: investmentSectorResolver
                },
                children: [
                    {
                        path: '',
                        component: InvestmentSectorListComponent,
                    },
                    {
                        path: ':id/:prodPkText',
                        component: TransactionsComponent,
                        resolve: {
                            transaction: transactionResolver
                        },
                        children: [
                            {
                                path: '',
                                component: TransactionsListComponent
                            }
                        ]
                    }
                ]

            }
        ]
    }
] as Routes;