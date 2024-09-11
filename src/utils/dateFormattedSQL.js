function toLocaleDateString(date, format = false) {
    if (!date) return '';
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

    if (format) {
        const day = String(localDate.getDate()).padStart(2, '0');
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const year = localDate.getFullYear();
        return `${day}.${month}.${year}`;
    } else {
        return localDate.toISOString().split('T')[0];
    }
}

module.exports = { toLocaleDateString }
