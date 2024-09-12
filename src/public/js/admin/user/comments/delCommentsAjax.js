$(document).on('click', '.delete-comment', function() {
    const commentId = this.id.split('_')[1];
    $.ajax({
        url: `/admin/deleteComment/${commentId}`,
        type: 'DELETE',
        success: function(response) {
            $(`#comment_${commentId}`).remove();
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при удалении комментария:', error);
        }
    });
});