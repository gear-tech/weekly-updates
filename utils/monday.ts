/**
 *  Get the date of the current week's Monday.
 */
export default function getMonday() {
    const d = new Date();
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);

    const monday = new Date(d.setDate(diff)).toJSON().slice(0, 10)
    return monday
}
