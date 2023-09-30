import moment from "moment";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            time:(d, format) => moment(d, format).format('hh:mm A'),
            now: moment().format('HHmm'),
            todayDate: moment().format('D MMMM YYYY')
        }
    }
})