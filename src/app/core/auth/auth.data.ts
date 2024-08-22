import { SignInData } from 'src/app/partials/auth/login';
import { SignUpData } from 'src/app/partials/auth/sign-up';

export const signUpData = (user: SignUpData) => {
    return {
        "appid": "cmp0400000687",
        "provider": "password",
        "type": "user",
        "groups": "admin",
        "customerType": 1,
        "onBoardingType": 1,
        "programCode": 1,
        "vipFlag": 0,
        "kycStatus": 0,
        "kycRemark": "",
        "picture": "base46",
        "regMobileISDNCode": "+962",
        "verType": "link",
        "verStatus": false,
        "verWay": "E",
        "currency": "JOD",
        "languagePreference": "en",
        "logoUrl": "https://futeric.com/images/logo.png",
        "urlLink": "https://futeric.com",
        "appName": "Crowd Lending",
        "welcomeTeam": "Crowd Lending Team",
        "cmpName": "Mada",
        "regEmailId": user.email,
        "password": user.confirmPassword,
        "name": user.fullName,
        "regMobileNumber": user.phoneNumber,
    }
}


export const companyData = {
    "appid": "cmp0400000687",
    "provider": "password",
    "token": "admUser@cmp0400000687.com::Xapis@21ao!123"
}

export const signInData = (credentials: SignInData) => {
    return {
        "appid": "cmp0400000687",
        "provider": "password",
        "token": `${credentials.email}::${credentials.password}`
    }
}


