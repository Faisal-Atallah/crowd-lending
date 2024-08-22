import { FormControl } from "@angular/forms"

export type LoginForm = {
    email: FormControl<string | any>,
    password: FormControl<string | any>
};

export type SignInData = {
    email: string;
    password: string
};