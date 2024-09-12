$(document).ready(function () {
    function checkFields(blockId) {
        let allInputs = $('#' + blockId + ' input');
        let isFilled = true;
        console.log(allInputs);
        allInputs.each(function() {
            if ($(this).val() === '') {
                isFilled = false;
                return false;
            }
        });

        $('#' + blockId + ' button').prop("disabled",!isFilled);
    }

    checkFields('authBlock');
    checkFields('managementBlock');
    checkFields('registerBlock');

    $('#authBlock input').on('input', function() {
        checkFields('authBlock');
    });
    $('#managementBlock input').on('input', function() {
        checkFields('managementBlock');
    });
    $('#registerBlock input').on('input', function() {
        checkFields('registerBlock');
    });
});