import { Injectable } from "@angular/core";
import { portfolio } from "./data";
import { MockApiService } from "projects/mock-api/src/public-api";
import { cloneDeep } from "lodash-es";

@Injectable({ providedIn: 'root' })
export class PortfolioMockApi {
    private _portfolio: any = portfolio;
    /**
       * Constructor
       */
    constructor(private _mockApiService: MockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    registerHandlers() {
        this._mockApiService.onGet('api/portofolio')
            .reply(() => {
                const portfolio = cloneDeep(this._portfolio);
                return [200, portfolio]
            });
    }
}