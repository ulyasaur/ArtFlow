import { useTranslation } from "react-i18next"

export default function FormatFullDate(newDate: string) {
    const {t} = useTranslation()
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const d = new Date(newDate)
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const monthName = months[monthIndex]
    const dayName = days[d.getDay()] 
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
    const formatted = `${t(`days.${dayName}`)}, ${date} ${t(`months.${monthName}`)} ${year}, ${hours}:${minutes}`
    return formatted.toString()
}