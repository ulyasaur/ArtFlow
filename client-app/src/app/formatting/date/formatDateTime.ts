export default function formatDateTime(newDate: string) {
    const d = new Date(newDate)
    const year = d.getFullYear()
    const date = d.getDate()
    const monthIndex = d.getMonth()
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
    const formatted = `${date}/${monthIndex + 1}/${year}, ${hours}:${minutes}`
    return formatted.toString()
}