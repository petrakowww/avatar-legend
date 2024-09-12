$(document).on('click', '.show-comments', function() {
    const userId = this.id.split('_')[1];
    $(`#commentsPanel_${userId}`).toggle();
});

$(document).on('click', '.show-feedback', function() {
    const userId = this.id.split('_')[1];
    $(`#contactPanel_${userId}`).toggle();
});