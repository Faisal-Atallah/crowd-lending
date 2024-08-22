import { FormControl } from "@angular/forms"

export type SaveWithUsForm = {
    amount: FormControl<string | any>,
    phoneNumber: FormControl<string | any>,
    customerName: FormControl<string | any>,
    pin: FormControl<string | any>,
}