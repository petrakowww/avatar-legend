$(document).ready(function() {
    $('#sendContactData').on('click', function() {

        const number = $('#number').val().trim();
        const feedbackText = $('#feedback-text').val().trim();
        const numberPattern = /^(\+7|8)?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;

        if (!feedbackText) {
            $('#callback-info').text('Сообщение не должно быть пустым.');
            return;
        }

        if (!numberPattern.test(number)) {
            $('#callback-info').text('Номер телефона ' +
                'должен быть в формате +7(999)999-99-99, 8(999)999-99-99, 89999999999 или +79999999999.');
            return;
        }

        const formData = {
            userId: $('#user-id').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            number: number,
            feedbackText: feedbackText
        };

        $.ajax({
            url: '/contacts/submitFeedback',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                $('#callback-info').text(response.message);
                $('#number').val('');
                $('#feedback-text').val('');
            },
            error: function(error) {
                $('#callback-info').text('Не удалось отправить заявку: ' + error);
            }
        });
    });
});
