import { Route, Routes } from "@angular/router";
import { LayoutComponent } from "./layout";
import { INVEST_ROUTE_PATH } from "./pages/invest";
import { PORTFOLIO_ROUTE_PATH } from "./pages/portfolio";
import { WALLET_ROUTE_PATH } from "./pages/wallet";
import { NOT_FOUND_ROUTE_PATH } from "./pages/error/error-404";
import { initialDataResolver } from "./app.resolver";
import { AuthGuard } from "./core/auth/guards";
import { SOMTHING_WENT_WRONG_ROUTE_PATH } from "./pages/error/something-went-wrong";
import { SETTINGS_ROUTE_PATH } from "./pages/settings";
import { INVESTMENT_CALCULATOR_ROUTE_PATH } from "./pages/investment-calculator";

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            layout: 'horizontal'
        },
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: SETTINGS_ROUTE_PATH, loadChildren: () => import('./pages/settings/settings.routes') },
            { path: INVEST_ROUTE_PATH, loadChildren: () => import('./pages/invest/invest.routes') },
            { path: INVESTMENT_CALCULATOR_ROUTE_PATH, loadChildren: () => import('./pages/investment-calculator/investment-calculator.routes') }
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'horizontal'
        },
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            { path: 'home', loadChildren: () => import('./pages/home/home.routes') },
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            layout: 'horizontalWithBreadcrumb'
        },
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {
                path: PORTFOLIO_ROUTE_PATH,
                loadChildren: () => import('./pages/portfolio/portfolio.routes')
            },
            {
                path: WALLET_ROUTE_PATH,
                loadChildren: () => import('./pages/wallet/wallet.routes')
            },
            {
                path: NOT_FOUND_ROUTE_PATH,
                pathMatch: 'full',
                loadChildren: () => import('./pages/error/error-404/error-404.routes')
            }
        ]
    },
    {
        path: SOMTHING_WENT_WRONG_ROUTE_PATH,
        component: LayoutComponent,
        data: {
            layout: 'horizontal'
        },
        loadChildren: () => import('./pages/error/something-went-wrong/something-went-wrong.routes')
    },
    {
        path: '**', redirectTo: NOT_FOUND_ROUTE_PATH
    }
] as Routes