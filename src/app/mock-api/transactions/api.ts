import { Injectable } from "@angular/core";
import { transactionList } from "./data";
import { MockApiService } from "projects/mock-api/src/public-api";
import { cloneDeep } from "lodash-es";

@Injectable({
    providedIn: 'root'
})
export class TransactionsMockApi {
    private _transactions = transactionList;

    constructor(private _mockApiService: MockApiService) {
        this.registerHandlers();
    }

    registerHandlers() {
        this._mockApiService.onGet('api/transactions/all')
            .reply(() => {
                const transactions = cloneDeep(this._transactions);
                return [200, transactions]
            });

        this._mockApiService
            .onPost('api/transactions/transaction')
            .reply(({ request }) => {
                // Get the id from the params
                const id = request.body.id;

                const transactions = cloneDeep(this._transactions);

                const transction = transactions.find(item => item.id === id);

                return [200, transction];
            });
    }
}