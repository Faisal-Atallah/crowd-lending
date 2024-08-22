import { CUSTOMER_DATA, Customer } from "src/app/core/customer";
import { StorageService } from "src/app/core/helpers/storage";
import { LanguageService } from "src/app/core/language";

export const investmentSectorData = (id: number, _storageService: StorageService, _languageService: LanguageService) => {
    const customer: Customer | any = _storageService.getData(CUSTOMER_DATA);
    const activeLang = _languageService.activeLang?.name ? _languageService.activeLang.name : 'en';
    return {
        'regcode': customer.regCode,
        'cmpcode': customer.cmpCode,
        'langcode': activeLang,
        'userid': customer.custIdNo,
        'brncode': customer.brnCode,
        'id': id
    }
}