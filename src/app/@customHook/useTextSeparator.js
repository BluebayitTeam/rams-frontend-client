import { addYears } from 'date-fns';
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
    // let NameText = ''
    // let NameText = ''

    const removeDirtyCharacter = (txt) => {
        const mainTxt = txt
        let cleanTxt = mainTxt

        if (mainTxt) {
            const dirtyTxt = mainTxt.match(/\W/g)

            const dirtyTxtExeptSpace = []

            dirtyTxt.map(txt => {
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

            const NamePattern = /\sNa?e?me\:/;
            const NamePatternText = text.match(NamePattern);
            if (NamePatternText) {
                const NamePatternIndex = text.search(NamePattern);
                const NameFirstIndex = NamePatternIndex + NamePatternText?.toString().length;
                const NameTextByFirstIndex = text.slice(NameFirstIndex)
                const NameLineBreakIndex = NameTextByFirstIndex.search(/\n/)
                const cleanNameText = removeDirtyCharacter(NameTextByFirstIndex?.slice(0, NameLineBreakIndex))
                setNameText(cleanNameText)
            }

            const FathersNamePattern = /Father'?s\s?Na?e?me\:/;
            const FathersNamePatternText = text.match(FathersNamePattern);
            if (FathersNamePatternText) {
                const FathersNamePatternIndex = text.search(FathersNamePattern);
                const FathersNameFirstIndex = FathersNamePatternIndex + FathersNamePatternText?.toString().length;
                const FathersNameTextByFirstIndex = text.slice(FathersNameFirstIndex)
                const FathersNameLineBreakIndex = FathersNameTextByFirstIndex.search(/\n/)
                const cleanFathersNameText = removeDirtyCharacter(FathersNameTextByFirstIndex?.slice(0, FathersNameLineBreakIndex))
                setFathersNameText(cleanFathersNameText)
            }

            const MothersNamePattern = /Mother'?s\s?Na?e?me\:/;
            const MothersNamePatternText = text.match(MothersNamePattern);
            if (MothersNamePatternText) {
                const MothersNamePatternIndex = text.search(MothersNamePattern);
                const MothersNameFirstIndex = MothersNamePatternIndex + MothersNamePatternText?.toString().length;
                const MothersNameTextByFirstIndex = text.slice(MothersNameFirstIndex)
                const MothersNameLineBreakIndex = MothersNameTextByFirstIndex.search(/\n/)
                const cleanMothersNameText = removeDirtyCharacter(MothersNameTextByFirstIndex?.slice(0, MothersNameLineBreakIndex))
                setMothersNameText(cleanMothersNameText)
            }

            const SpousesNamePattern = /Spouse\'?s\s?Na?e?me\:/;
            const SpousesNamePatternText = text.match(SpousesNamePattern);
            if (SpousesNamePatternText) {
                const SpousesNamePatternIndex = text.search(SpousesNamePattern);
                const SpousesNameFirstIndex = SpousesNamePatternIndex + SpousesNamePatternText?.toString().length;
                const SpousesNameTextByFirstIndex = text.slice(SpousesNameFirstIndex)
                const SpousesNameLineBreakIndex = SpousesNameTextByFirstIndex.search(/\n/)
                const cleanSpousesNameText = removeDirtyCharacter(SpousesNameTextByFirstIndex?.slice(0, SpousesNameLineBreakIndex))
                setSpousesNameText(cleanSpousesNameText)
            }

            const PermanentAddressPattern = /P\wrma?\went\s?Addr?\w?e?ss\:/;
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

                const cleanVillageTxt = removeDirtyCharacter(separatedAddress[0])
                setvillage(cleanVillageTxt)

                const cleanPostOfficeTxt = removeDirtyCharacter(separatedAddress[1])
                setpost_office(cleanPostOfficeTxt)

                const cleanPoliceStationTxt = removeDirtyCharacter(separatedAddress[2])
                setpolice_station(cleanPoliceStationTxt)

                const cleanDistrictTxt = removeDirtyCharacter(separatedAddress[3])
                setdistrict(cleanDistrictTxt)
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

                const PspExpDMainTxt = BGDMainText.substr(BGDIndex + 11, 17)
                setpassportExpDateText(`20${PspExpDMainTxt.substr(0, 2)}-${PspExpDMainTxt.substr(2, 2)}-${PspExpDMainTxt.substr(4, 2)}`)

                const passportExpDateTxt = `20${PspExpDMainTxt.substr(0, 2)}-${PspExpDMainTxt.substr(2, 2)}-${PspExpDMainTxt.substr(4, 2)}`
                const decreaseYear = addYears(new Date(passportExpDateTxt,), -5,)
                setpassportIssDateText(`${decreaseYear.getFullYear()}-${(decreaseYear.getMonth() + 1).toString().padStart(2, 0)}-${(decreaseYear.getDate() + 1).toString().padStart(2, 0)}`)

                setnidNoText(BGDMainText.slice(BGDIndex + 17))
            }



        }
    }




    console.log("useTextSeparator rendered")
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
        district
    }
}

export default useTextSeparator
