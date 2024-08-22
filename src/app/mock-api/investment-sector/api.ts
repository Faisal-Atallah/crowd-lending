import { Injectable } from "@angular/core";
import { investmentSectors } from "./data";
import { MockApiService } from "projects/mock-api/src/public-api";
import { cloneDeep } from "lodash-es";

@Injectable({
    providedIn: 'root'
})
export class InvestmentSectorsMockApi {
    private _investmentSectors: any[] = investmentSectors;

    constructor(private _mockApiService: MockApiService) {
        this.registerHandlers();
    }

    registerHandlers() {
        this._mockApiService.onGet('api/investmentSectors')
            .reply(() => {
                const investmentSectors = cloneDeep(this._investmentSectors);
                return [200, investmentSectors]
            });

        this._mockApiService
            .onPost('api/investmentSectors/sector')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.body.id;

                const investmentSectors = cloneDeep(this._investmentSectors);

                const investmentSector = investmentSectors.find(item => item.id === id);

                return [200, investmentSector];
            });
    }
}