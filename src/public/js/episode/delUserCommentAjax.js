$(document).ready(function() {
    $('#commentsUserList').on('click', '.delete-comment', function() {
        const commentId = $(this).data('comment-id');
        const deleteButton = $(this); // Сохраните ссылку на кнопку удаления
        $.ajax({
            url: '/episodes/del',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ commentId }),
            success: function(response) {
                deleteButton.closest('li').remove();
                if ($('#commentsUserList ul li').length === 0) {
                    $('#commentsUserList').html('<p id="nonComments">Вы еще не оставили комментариев</p>');
                }
            },
            error: function(error) {
                console.error('Ошибка при удалении комментария:', error);
            }
        });
    });
});
