$(document).ready(function() {
    $('#managementSubmit').click(function () {
        const host = $('#managementHost').val();
        const username = $('#managementUsername').val();
        const database = $('#managementDatabase').val();
        const password = $('#managementPassword').val();

        const errorBlock = $('#information-errors-block');

        $.ajax({
            url: '/auth/admin/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                host: host,
                username: username,
                database: database,
                password: password
            }),
            success: function (response) {
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
