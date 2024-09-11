$(document).ready(function() {
    $('#submit-comment').on('click', function() {
        const episodeId = $('#episode-id').val();
        const reviewText = $('#comment-text').val();

        if (reviewText.trim() === '') {
            alert('Комментарий не может быть пустым');
            return;
        }

        $.ajax({
            url: '/episodes/comments',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ episodeId, reviewText }),
            success: function(response) {
                let emptyList = $('#nonComments').length === 0;

                const newCommentHTML = `
                    <li>
                        <div class="comment-header">
                            <div class="username">${response.username}</div>
                            <div class="comment-date">${response.review_date}</div>
                            <button class="delete-comment" data-comment-id="${response.id}">Удалить</button>
                        </div>
                        <div class="comment-text">${response.review_text}</div>
                    </li>
                `;
                if (emptyList){
                    $('#commentsUserList ul').prepend(newCommentHTML);
                }
                else{
                    let commentsUserList = $('#commentsUserList');
                    commentsUserList.contents().filter(function () {
                        return this.id !== "noRm";
                    }).remove();
                    commentsUserList.append(`<ul>${newCommentHTML}</ul>`);
                }
                $('#comment-text').val('');
            },
            error: function(error) {
                console.error('Ошибка при добавлении комментария:', error);
            }
        });
    });
});
