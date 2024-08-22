import { CUSTOMER_DATA, Customer } from "src/app/core/customer";
import { StorageService } from "src/app/core/helpers/storage";
import { InvestData } from "./invets.types";

export const doInvestData = (investData: InvestData, _storageService: StorageService) => {
    const customer: Customer | any = _storageService.getData(CUSTOMER_DATA);
    return {
        'regcode': customer.regCode,
        'cmpcode': customer.cmpCode,
        'langcode': 'en',
        'userid': customer.custIdNo,
        'brncode': customer.brnCode,
        'amount': investData.amount,
        'phoneNumber': investData.phoneNumber,
        'userName': investData.userName,
        'pin': investData.pin,
        'sysPkText': investData.sysPkText
    }
}


export const amountCheckData = (amount: string, _storageService: StorageService) => {
    const customer: Customer | any = _storageService.getData(CUSTOMER_DATA);
    return {
        'regcode': customer.regCode,
        'cmpcode': customer.cmpCode,
        'userid': customer.custIdNo,
        "amount": amount
    }
}