import { Routes } from "@angular/router";
import { InvestComponent } from "./invest.component";
import { InvestListComponent } from "./list/list.component";
import { inject } from "@angular/core";
import { InvestService } from "./invest.service";
import { catchError, throwError } from "rxjs";
import { InvestmentDetailsComponent } from "../investment-details/investment-details.component";
import { InvestmentDetailsService } from "../investment-details/investment-details.service";
import { investmentDetailsResolver } from "../investment-details/investment-details.resolver";

export default [] = [
    {
        path: '',
        component: InvestComponent,
        children: [
            {
                path: '',
                component: InvestListComponent,
                resolve: {
                    investments: () => inject(InvestService).getInvestments(),
                    sectors: () => inject(InvestService).getSectorsFilter()
                }
            },
            {
                path: ':id/:prodKey',
                component: InvestmentDetailsComponent,
                resolve: {
                    // investmentDetails: () => inject(InvestmentDetailsService).getInvetsmentDetails(),
                    investmentDetails: investmentDetailsResolver
                }
            }
        ]
    }
] as Routes;