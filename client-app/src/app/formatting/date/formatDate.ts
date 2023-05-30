export default function formatDate(newDate: string) {
    const d = new Date(newDate);
    const year = d.getFullYear();
    const date = d.getDate();
    const monthIndex = (d.getMonth() + 1) < 10 ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1);
    const formatted = `${date}/${monthIndex}/${year}`;
    return formatted.toString()
}