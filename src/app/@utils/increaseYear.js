import { addDays, addYears } from 'date-fns'
import moment from 'moment'

const increaseYear = (date, number) => {

    const addYear = addYears(new Date(date), number,)
    const addYearMinusOneDay = addDays(new Date(addYear), -1,)

    return moment(addYearMinusOneDay).format("YYYY-MM-DD")
}

export default increaseYear
