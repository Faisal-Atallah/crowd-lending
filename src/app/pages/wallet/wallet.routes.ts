import { Routes } from "@angular/router";
import { WalletComponent } from "./wallet.component";
import { WalletItemComponent } from "./item";
import { inject } from "@angular/core";
import { WalletService } from "./wallet.service";

export default [] = [
    {
        path: '',
        component: WalletComponent,
        children: [
            {
                path: '',
                component: WalletItemComponent,
                resolve: {
                    walletBalance: () => inject(WalletService).getWalletBalanace()
                }
            }
        ]
    }
] as Routes;