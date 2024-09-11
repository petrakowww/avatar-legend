$(document).ready(function() {
    $('#registerSubmit').click(function () {
        const username = $('#registerUsername').val();
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        const errorBlock = $('#information-errors-block');
        errorBlock.show();
        $.ajax({
            url: '/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }),
            success: function (response) {
                errorBlock.empty();
                errorBlock.html('<p>' + response.message + '</p>');
            },
            error: function (response) {
                errorBlock.empty();
                displayErrors(response);
            }
        });
    });
});