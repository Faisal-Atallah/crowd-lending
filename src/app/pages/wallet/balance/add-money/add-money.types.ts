import { FormControl } from "@angular/forms"

export type AddMoneyForm = {
    amount: FormControl<number | any>,
    phoneNumber: FormControl<string | any>,
    userName: FormControl<string | any>,
    pin: FormControl<string | any>,
}