import { Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { SettingsLanguageComponent } from "./language";

export default [] = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                component: SettingsLanguageComponent
            }
        ]
    }
] as Routes;