export const buildQueryParams = (params) => {
    const query = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== '')
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    return query;
};
export const timestampConversion = (inputDateString) => {
    var inputDate = new Date(inputDateString);
    var monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var outputDateString =
        inputDate.getDate() +
        " " +
        monthNames[inputDate.getMonth()] +
        ", " +
        inputDate.getFullYear() +
        " " +
        inputDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    return outputDateString;
};
export const isEven = (value) => {
    if (value % 2 === 0) return true;
    else return false;
}