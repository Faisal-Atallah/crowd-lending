import { Routes } from "@angular/router";
import { InvestmentCalculatorComponent } from "./investment-calculator.component";
import { CalculatorComponent } from "./calculator/calculator.component";

export default [] = [
    {
        path: '',
        component: InvestmentCalculatorComponent,
        children: [
            {
                path: '',
                component: CalculatorComponent
            }
        ]
    }
] as Routes;