$(document).on('click', '.delete-contact', function() {
    const feedbackId = this.id.split('_')[1];
    console.log(feedbackId);
    $.ajax({
        url: `/admin/deleteFeedback/${feedbackId}`,
        type: 'DELETE',
        success: function(response) {
            $(`#contact_${feedbackId}`).remove();
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при удалении комментария:', error);
        }
    });
});