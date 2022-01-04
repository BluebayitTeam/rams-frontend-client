import { useEffect, useState } from 'react'

const useReportData = (orginalData = [], row = 25) => {

    const [data, setData] = useState([])

    const modifyData = (orginalArr, size = row) => {

        let modifiedArr = []

        const countTotalPage = Math.ceil((orginalArr?.length / size))
        const totalPage = isNaN(countTotalPage) ? 0 : countTotalPage

        console.time('ModifyArry')
        for (let index = 0; index < totalPage; index++) {
            modifiedArr.push({ page: index + 1, size, totalPage, data: orginalArr.slice((index + (index * size) - (index && index)), ((index + (index * size) + size) - (index && index))) })
        }

        setData(modifiedArr)
    }

    useEffect(() => {
        modifyData(orginalData, row)
    }, [])

    return [data, modifyData]
}

export default useReportData
