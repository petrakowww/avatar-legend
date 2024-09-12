$(document).ready(function() {
    $('.panel:not(#blockSerialPanel)').hide();
    $('.admin-control-panel button').on('click', function() {
        $('.panel').css('display', 'none');
        let panelId = $(this).data('panel');
        $('#' + panelId).css('display', 'flex');
    });
});