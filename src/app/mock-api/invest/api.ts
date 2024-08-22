import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash-es";
import { MockApiService } from "projects/mock-api/src/public-api";
import { investmentDetails, invests } from "./data";

@Injectable({ providedIn: 'root' })
export class InvestMockApi {
    private _invests: any[] = invests;
    private _investmentDetails = investmentDetails;

    /**
    * Constructor
    */
    constructor(private _mockApiService: MockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    registerHandlers() {
        this._mockApiService.onGet('api/invests')
            .reply(() => {
                const invests = cloneDeep(this._invests);
                return [200, invests]
            });

        this._mockApiService.onGet('api/investmentDetails')
            .reply(() => {
                const investmentDetails = cloneDeep(this._investmentDetails);
                return [200, investmentDetails]
            })
    }
}