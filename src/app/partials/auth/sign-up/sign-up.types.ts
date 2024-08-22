import { FormControl } from "@angular/forms"

export type SignUpForm = {
    fullName: FormControl<string | any>,
    email: FormControl<string | any>,
    phoneNumber: FormControl<string | any>,
    password: FormControl<string | any>,
    confirmPassword: FormControl<string | any>
}

export type SignUpData = {
    fullName: string
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string;
}