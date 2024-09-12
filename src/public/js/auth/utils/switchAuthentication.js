$(document).ready(function() {
    $('#showAuthBlock').click(function() {
        $('.block').hide();
        $('#authBlock').show();
    });

    $('#showRegisterBlock').click(function() {
        $('.block').hide();
        $('#registerBlock').show();
    });

    $('#showManagementBlock').click(function() {
        $('.block').hide();
        $('#managementBlock').show();
    });
});