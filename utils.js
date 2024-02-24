function isDateStringValid(dateStr) {
    return !isNaN(new Date(dateStr));
}

function isDateUnixValid(date) {
    let intDate = parseInt(date);
    return !isNaN(new Date(intDate));
}

module.exports = {isDateStringValid, isDateUnixValid};