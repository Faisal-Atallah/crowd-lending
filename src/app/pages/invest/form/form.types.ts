import { FormControl } from "@angular/forms"

export type InvestForm = {
    amount: FormControl<string | any>,
    phoneNumber: FormControl<string | any>,
    customerName: FormControl<string | any>,
    pin: FormControl<string | any>,
    sysPkText: FormControl<string | any>
}