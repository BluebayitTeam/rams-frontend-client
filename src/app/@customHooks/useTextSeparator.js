import increaseYear from "app/@helpers/increaseYear";
import { useEffect, useState } from 'react';


function useTextSeparator(text = "") {

    const [NameText, setNameText] = useState("")
    const [FathersNameText, setFathersNameText] = useState("")
    const [MothersNameText, setMothersNameText] = useState("")
    const [SpousesNameText, setSpousesNameText] = useState("")
    const [PermanentAddressText, setPermanentAddressText] = useState("")
    const [BGDText, setBGDText] = useState("")
    const [passportNoText, setpassportNoText] = useState("")
    const [dateOfBirthText, setdateOfBirthText] = useState("")
    const [passportExpDateText, setpassportExpDateText] = useState("")
    const [passportIssDateText, setpassportIssDateText] = useState("")
    const [nidNoText, setnidNoText] = useState("")
    const [village, setvillage] = useState("")
    const [post_office, setpost_office] = useState("")
    const [police_station, setpolice_station] = useState("")
    const [district, setdistrict] = useState("")
    const [gender, setgender] = useState("")
    const [marital_status, setmarital_status] = useState("")
    const [contact_no, setcontact_no] = useState("")


    const removeDirtyCharacter = (txt) => {
        const mainTxt = txt
        let cleanTxt = mainTxt

        if (mainTxt) {
            const dirtyTxt = mainTxt.match(/\W/g)

            const dirtyTxtExeptSpace = []

            dirtyTxt?.map(txt => {
                txt != " " && dirtyTxtExeptSpace.push(txt)
            })


            dirtyTxtExeptSpace.map(drtyTxt => {
                cleanTxt = cleanTxt.replace(`${drtyTxt}`, "")
            })

            cleanTxt = cleanTxt.trim()
        }

        return cleanTxt
    }

    useEffect(() => {
        separateText()
    }, [text])

    const separateText = () => {

        if (text) {

            const NamePattern = /[^s]\sN\wm\w\:/;
            const NamePatternText = text.match(NamePattern);
            if (NamePatternText) {
                const NamePatternIndex = text.search(NamePattern);
                const NameFirstIndex = NamePatternIndex + NamePatternText?.toString().length;
                const NameTextByFirstIndex = text.slice(NameFirstIndex)
                const NameLineBreakIndex = NameTextByFirstIndex.search(/\n/)
                const cleanNameText = removeDirtyCharacter(NameTextByFirstIndex?.slice(0, NameLineBreakIndex))
                setNameText(cleanNameText)
            }
            else { setNameText("") }

            const FathersNamePattern = /Father'?s\s?N\wm\w\:?/;
            const FathersNamePatternText = text.match(FathersNamePattern);
            if (FathersNamePatternText) {
                const FathersNamePatternIndex = text.search(FathersNamePattern);
                const FathersNameFirstIndex = FathersNamePatternIndex + FathersNamePatternText?.toString().length;
                const FathersNameTextByFirstIndex = text.slice(FathersNameFirstIndex)
                const FathersNameLineBreakIndex = FathersNameTextByFirstIndex.search(/\n/)
                const cleanFathersNameText = removeDirtyCharacter(FathersNameTextByFirstIndex?.slice(0, FathersNameLineBreakIndex))
                setFathersNameText(cleanFathersNameText)
            }
            else { setFathersNameText("") }

            const MothersNamePattern = /Mother'?s\s?N\wm\w\:?/;
            const MothersNamePatternText = text.match(MothersNamePattern);
            if (MothersNamePatternText) {
                const MothersNamePatternIndex = text.search(MothersNamePattern);
                const MothersNameFirstIndex = MothersNamePatternIndex + MothersNamePatternText?.toString().length;
                const MothersNameTextByFirstIndex = text.slice(MothersNameFirstIndex)
                const MothersNameLineBreakIndex = MothersNameTextByFirstIndex.search(/\n/)
                const cleanMothersNameText = removeDirtyCharacter(MothersNameTextByFirstIndex?.slice(0, MothersNameLineBreakIndex))
                setMothersNameText(cleanMothersNameText)
            }
            else { setMothersNameText("") }

            const SpousesNamePattern = /Spouse\'?\’?s\s?N\wm\w\:?/;
            const SpousesNamePatternText = text.match(SpousesNamePattern);
            if (SpousesNamePatternText) {
                const SpousesNamePatternIndex = text.search(SpousesNamePattern);
                const SpousesNameFirstIndex = SpousesNamePatternIndex + SpousesNamePatternText?.toString().length;
                const SpousesNameTextByFirstIndex = text.slice(SpousesNameFirstIndex)
                const SpousesNameLineBreakIndex = SpousesNameTextByFirstIndex.search(/\n/)
                const cleanSpousesNameText = removeDirtyCharacter(SpousesNameTextByFirstIndex?.slice(0, SpousesNameLineBreakIndex))
                setSpousesNameText(cleanSpousesNameText)

                const maritalStatusTxt = cleanSpousesNameText === "NA" ? "Single" : "Married"
                setmarital_status(maritalStatusTxt)
            }
            else {
                setSpousesNameText("")
                setmarital_status("")
            }

            const PermanentAddressPattern = /P\wrma?\went\s?Addr?\w?ss\:/;
            const PermanentAddressPatternText = text.match(PermanentAddressPattern);
            if (PermanentAddressPatternText) {
                const PermanentAddressPatternIndex = text.search(PermanentAddressPattern);
                const PermanentAddressFirstIndex = PermanentAddressPatternIndex + PermanentAddressPatternText?.toString().length;
                const PermanentAddressTextByFirstIndex = text.slice(PermanentAddressFirstIndex)
                const PermanentAddressLnBrkIndex1 = PermanentAddressTextByFirstIndex.indexOf("\n")
                const PermanentAddressLnBrkIndex2 = PermanentAddressTextByFirstIndex.indexOf("\n", PermanentAddressLnBrkIndex1 + 1)
                setPermanentAddressText(PermanentAddressTextByFirstIndex?.slice(0, PermanentAddressLnBrkIndex2).trim())

                const PermanentAddressText = PermanentAddressTextByFirstIndex?.slice(0, PermanentAddressLnBrkIndex2).trim()
                const separatedAddress = PermanentAddressText.split(/\,|\./)

                const Comma = separatedAddress.length

                const cleanVillageTxt = removeDirtyCharacter(separatedAddress[0])
                setvillage(cleanVillageTxt)

                const cleanPostOfficeTxt = removeDirtyCharacter(Comma > 3 ? separatedAddress[1].concat(separatedAddress[2]) : separatedAddress[1])
                setpost_office(cleanPostOfficeTxt)

                const cleanPoliceStationTxt = removeDirtyCharacter(separatedAddress[Comma > 3 ? 3 : 2])
                setpolice_station(cleanPoliceStationTxt)

                const cleanDistrictTxt = removeDirtyCharacter(separatedAddress[Comma > 3 ? 4 : 3])
                setdistrict(cleanDistrictTxt)
            }
            else {
                setPermanentAddressText("")
                setvillage("")
                setpost_office("")
                setpolice_station("")
                setdistrict("")
            }

            const telephoneNoPattern = /Te\w\wphone\sNo:\s?/
            const telephoneNoPatternText = text.match(telephoneNoPattern);
            if (telephoneNoPatternText) {
                const telephoneNoPatternIndex = text.search(telephoneNoPattern);
                const telephoneNoFirstIndex = telephoneNoPatternIndex + telephoneNoPatternText?.toString().length;
                const telephoneNoTextByFirstIndex = text.slice(telephoneNoFirstIndex).trim()
                const telephoneNoSpaceIndex = telephoneNoTextByFirstIndex.search(/\s/)
                const cleantelephoneNoText = removeDirtyCharacter(telephoneNoTextByFirstIndex?.slice(0, telephoneNoSpaceIndex))
                setcontact_no(cleantelephoneNoText)
            }
            else {
                setcontact_no("")
            }

            const allTxtBGDIndex = text.lastIndexOf("BGD");
            if (allTxtBGDIndex >= 0) {

                const allTxtBGDFirstIndex = allTxtBGDIndex - 10
                const BGDTextByFirstIndex = text.slice(allTxtBGDFirstIndex)
                const BGDTextLastIndex = BGDTextByFirstIndex.indexOf("<")
                const BGDTextByFirsAndtLastIndex = BGDTextByFirstIndex.slice(0, BGDTextLastIndex)
                const BGDMainText = BGDTextByFirsAndtLastIndex.trim()
                const BGDIndex = BGDMainText.indexOf("BGD")
                const BGDFirstIndex = BGDIndex - 10


                setBGDText(BGDMainText)

                setpassportNoText(BGDMainText.substr(BGDFirstIndex, 9))

                const DOBMainText = BGDMainText.substr(BGDIndex + 3, 9)
                const currentDate = new Date()
                const currentYear = currentDate.getFullYear()
                const DOBYear = DOBMainText.substr(0, 2) > currentYear.toString().substr(0, 2) ? `19${DOBMainText.substr(0, 2)}` : `20${DOBMainText.substr(0, 2)}`
                setdateOfBirthText(`${DOBYear}-${DOBMainText.substr(2, 2)}-${DOBMainText.substr(4, 2)}`)

                const genderMainTxt = BGDMainText.substr(BGDIndex + 10, 1)
                const genderTxt = genderMainTxt === "M" ? "male" : genderMainTxt === "F" ? "female" : "others"
                setgender(genderTxt)

                const PspExpDMainTxt = BGDMainText.substr(BGDIndex + 11, 6)
                setpassportExpDateText(`20${PspExpDMainTxt.substr(0, 2)}-${PspExpDMainTxt.substr(2, 2)}-${PspExpDMainTxt.substr(4, 2)}`)

                const passportExpDateTxt = `20${PspExpDMainTxt.substr(0, 2)}-${PspExpDMainTxt.substr(2, 2)}-${PspExpDMainTxt.substr(4, 2)}`
                setpassportIssDateText(increaseYear(passportExpDateTxt, -5))

                setnidNoText(BGDMainText.slice(BGDIndex + 18))
            }
            else {
                setBGDText("")
                setpassportNoText("")
                setdateOfBirthText("")
                setpassportExpDateText("")
                setpassportIssDateText("")
                setnidNoText("")
                setgender("")
            }


        }
    }


    return {
        passenger_name: NameText,
        father_name: FathersNameText,
        mother_name: MothersNameText,
        spouse_name: SpousesNameText,
        permanentAddress: PermanentAddressText,
        BGD: BGDText,
        passport_no: passportNoText,
        date_of_birth: dateOfBirthText,
        passport_expiry_date: passportExpDateText,
        passport_issue_date: passportIssDateText,
        nid: nidNoText,
        village,
        post_office,
        police_station,
        district,
        gender,
        marital_status,
        contact_no,
    }
}

export default useTextSeparator
