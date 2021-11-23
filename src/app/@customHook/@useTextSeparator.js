
const useTextSeparator = (text = "") => {

    let NameText = ''
    let FathersNameText = ''
    let MothersNameText = ''
    let SpousesNameText = ''
    let PermanentAddressText = ''
    // let NameText = ''
    // let NameText = ''
    // let NameText = ''
    // let NameText = ''

    if (text) {

        const NamePattern = /\sNa?e?me\:/;
        const NameFirstPatternText = text.match(NamePattern);
        if (NameFirstPatternText) {
            const NamePatternIndex = text.search(NamePattern);
            const NameFirstIndex = NamePatternIndex + NameFirstPatternText?.toString().length;
            const NameTextByFirsIndex = text.slice(NameFirstIndex)
            const NameLineBreakIndex = NameTextByFirsIndex.search(/\n/)
            NameText = NameTextByFirsIndex?.slice(0, NameLineBreakIndex).trim()
        }

        const FathersNamePattern = /Father'?s\s?Na?e?me\:/;
        const FathersNameFirstPatternText = text.match(FathersNamePattern);
        if (FathersNameFirstPatternText) {
            const FathersNamePatternIndex = text.search(FathersNamePattern);
            const FathersNameFirstIndex = FathersNamePatternIndex + FathersNameFirstPatternText?.toString().length;
            const FathersNameTextByFirsIndex = text.slice(FathersNameFirstIndex)
            const FathersNameLineBreakIndex = FathersNameTextByFirsIndex.search(/\n/)
            FathersNameText = FathersNameTextByFirsIndex?.slice(0, FathersNameLineBreakIndex).trim()
        }


        const MothersNamePattern = /Mother'?s\s?Na?e?me\:/;
        const MothersNameFirstPatternText = text.match(MothersNamePattern);
        if (MothersNameFirstPatternText) {
            const MothersNamePatternIndex = text.search(MothersNamePattern);
            const MothersNameFirstIndex = MothersNamePatternIndex + MothersNameFirstPatternText?.toString().length;
            const MothersNameTextByFirsIndex = text.slice(MothersNameFirstIndex)
            const MothersNameLineBreakIndex = MothersNameTextByFirsIndex.search(/\n/)
            MothersNameText = MothersNameTextByFirsIndex?.slice(0, MothersNameLineBreakIndex).trim()
        }


        const SpousesNamePattern = /Spouse\'?s\s?Na?e?me\:/;
        const SpousesNameFirstPatternText = text.match(SpousesNamePattern);
        if (SpousesNameFirstPatternText) {
            const SpousesNamePatternIndex = text.search(SpousesNamePattern);
            const SpousesNameFirstIndex = SpousesNamePatternIndex + SpousesNameFirstPatternText?.toString().length;
            const SpousesNameTextByFirsIndex = text.slice(SpousesNameFirstIndex)
            const SpousesNameLineBreakIndex = SpousesNameTextByFirsIndex.search(/\n/)
            SpousesNameText = SpousesNameTextByFirsIndex?.slice(0, SpousesNameLineBreakIndex).trim()
        }


        const PermanentAddressPattern = /P\wrma?\went\s?Addr?\w?e?ss\:/;
        const PermanentAddressFirstPatternText = text.match(PermanentAddressPattern);
        if (PermanentAddressFirstPatternText) {
            const PermanentAddressPatternIndex = text.search(PermanentAddressPattern);
            const PermanentAddressFirstIndex = PermanentAddressPatternIndex + PermanentAddressFirstPatternText?.toString().length;
            const PermanentAddressTextByFirsIndex = text.slice(PermanentAddressFirstIndex)
            const PermanentAddressLineBreakIndex = PermanentAddressTextByFirsIndex.search(/\n/)
            PermanentAddressText = PermanentAddressTextByFirsIndex?.slice(0, PermanentAddressLineBreakIndex).trim()
        }



    }


    console.log("text", text)
    return {
        name: NameText,
        fathersName: FathersNameText,
        mothersName: MothersNameText,
        spousesName: SpousesNameText,
        permanentAddress: PermanentAddressText,
    }
}

export default useTextSeparator
