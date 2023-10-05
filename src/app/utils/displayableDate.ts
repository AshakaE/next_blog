export default function displayableDate(date: string) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(
        new Date(date),
    )
}
