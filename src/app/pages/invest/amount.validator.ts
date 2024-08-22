import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { InvestService } from "./invest.service";

export class AmountValidator {
    static createValidator(investService: InvestService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | any> => {
            return investService
                .checkAmountIsSufficient(control.value)
                .pipe(
                    map((result: boolean) => {
                        if (result) {
                            return null
                        } else {
                            return { insufficientAmount: true }
                        }
                    }

                    )
                );
        };
    }
}