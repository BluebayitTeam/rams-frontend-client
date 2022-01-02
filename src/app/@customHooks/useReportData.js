import { useEffect, useState } from 'react'

const useReportData = (orginalData = [], row = 25) => {

    const [data, setData] = useState([])

    const modifyData = (orginalArr, size = row) => {

        console.log("modifyData Called")

        let modifiedArr = []

        let totalPage = Math.ceil((orginalArr?.length / size)) || 0

        console.time('ModifyArry')
        for (let index = 0; index < totalPage; index++) {
            modifiedArr.push({ page: index + 1, size, totalPage, data: orginalArr.slice((index + (index * size) - (index && index)), ((index + (index * size) + size) - (index && index))) })
        }
        console.timeEnd('ModifyArry')

        setData(modifiedArr)
    }

    useEffect(() => {
        modifyData(orginalData, row)
    }, [])

    return [data, modifyData]
}

export default useReportData
