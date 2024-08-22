import { FormControl } from "@angular/forms";

export type WithdrawForm = {
    amount: FormControl<string | any>,
    phoneNumber: FormControl<string | any>,
    userName: FormControl<string | any>,
    pin: FormControl<string | any>,
}