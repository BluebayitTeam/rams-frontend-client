import countryCodes from "../@data/@Countrycodes";

const RemoveCountryCodeFromPgoneNo = (phoneNoPrimary = "", phoneNoSecondary = "") => {

    let phoneNoPrimaryExceptCode = phoneNoPrimary
    let phoneNoSecondaryExceptCode = phoneNoSecondary

    countryCodes.map(data => {
        const code = `${"\\"}${data.value}`
        const countryCode = new RegExp(code);

        const matchedCodeForPrimaryPhone = phoneNoPrimary?.match(countryCode)

        const matchedCodeForSecondaryPhone = phoneNoSecondary?.match(countryCode)

        if (matchedCodeForPrimaryPhone) {
            phoneNoPrimaryExceptCode = phoneNoPrimary?.replace(matchedCodeForPrimaryPhone, "")
        }
        if (matchedCodeForSecondaryPhone) {
            phoneNoSecondaryExceptCode = phoneNoSecondary?.replace(matchedCodeForSecondaryPhone, "")
        }
        return null;
    })

    return [phoneNoPrimaryExceptCode, phoneNoSecondaryExceptCode]
}

export default RemoveCountryCodeFromPgoneNo