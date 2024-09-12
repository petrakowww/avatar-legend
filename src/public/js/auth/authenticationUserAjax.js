$(document).ready(function() {
    $('#authSubmit').click(function () {
        const credential = $('#authUsername').val();
        const password = $('#authPassword').val();

        const errorBlock = $('#information-errors-block');
        $.ajax({
            url: '/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                credential: credential,
                password: password
            }),
            success: function (response) {
                errorBlock.empty();
                window.location.href = '/';
            },
            error: function (response) {
                errorBlock.empty();
                errorBlock.show();
                displayErrors(response);
            }
        });
    });
});
