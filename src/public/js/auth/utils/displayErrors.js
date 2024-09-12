function displayErrors(response) {
    const errorBlock = $('#information-errors-block');
    errorBlock.empty();

    if (response.responseJSON && response.responseJSON.errors) {
        const errors = response.responseJSON.errors;
        const ul = $('<ul>');
        errors.forEach(error => {
            const li = $('<li>').text(error.msg);
            ul.append(li);
        });
        errorBlock.append(ul);
    } else {
        console.log(response);
        const errorMessage = response.responseJSON ? response.responseJSON.message : 'Неизвестная ошибка';
        const ul = $('<ul>');
        const li = $('<li>').text(errorMessage);
        ul.append(li);
        errorBlock.append(ul);
    }
}