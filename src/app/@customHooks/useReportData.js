import _ from 'lodash'
import { useEffect, useState } from 'react'

const useReportData = (orginalData = [], row = 25) => {

    const [orginalArray, setOrginalArray] = useState([])
    const [data, setData] = useState([])
    const [sortBy, setSortBy] = useState("")


    useEffect(() => {
        modifyData(orginalData, row)
    }, [])

    useEffect(() => {
        modifyData(orginalArray)
    }, [sortBy])


    const modifyData = (orginalArr, size = row) => {

        if (_.isArray(orginalArr)) {
            setOrginalArray(orginalArr)

            let shortedArray = orginalArr

            //short array if required
            if (sortBy) {
                console.log('sortBy', sortBy)
                console.log("orginalArray", orginalArray)
                shortedArray = _.sortBy(shortedArray, [(o) => _.isObject(o[sortBy]) ? o[sortBy]['name'] : o[sortBy]])
            }

            console.log("shortedArray", shortedArray)

            //modify array
            let modifiedArr = []

            const countTotalPage = Math.ceil((shortedArray?.length / size))
            const totalPage = isNaN(countTotalPage) ? 0 : countTotalPage

            console.time('ModifyArry')
            for (let index = 0; index < totalPage; index++) {
                modifiedArr.push({ page: index + 1, size, totalPage, sortBy, data: shortedArray.slice((index + (index * size) - (index && index)), ((index + (index * size) + size) - (index && index))) })
            }

            setData(modifiedArr)
        }
    }

    console.log("rendered usereportdata")
    return [data, modifyData, setSortBy]
}

export default useReportData
