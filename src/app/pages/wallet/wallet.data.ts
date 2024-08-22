import { CUSTOMER_DATA, Customer } from "src/app/core/customer";
import { StorageService } from "src/app/core/helpers/storage";
import { Wallet } from "./wallet.types";

export const customerInfo = (_storageService: StorageService) => {
    const customer: Customer | any = _storageService.getData(CUSTOMER_DATA);
    return {
        'regcode': customer.regCode,
        'cmpcode': customer.cmpCode,
        'langcode': 'en',
        'userid': customer.custIdNo,
        'brncode': customer.brnCode
    }
}


export const walletData = (wallet: Wallet, _storageService: StorageService) => {
    const customer: Customer | any = _storageService.getData(CUSTOMER_DATA);
    return {
        'regcode': customer.regCode,
        'cmpcode': customer.cmpCode,
        'langcode': 'en',
        'userid': customer.custIdNo,
        'brncode': customer.brnCode,
        'amount': wallet.amount,
        'phoneNumber': wallet.phoneNumber,
        'userName': wallet.userName,
        'pin': wallet.pin
    }
}