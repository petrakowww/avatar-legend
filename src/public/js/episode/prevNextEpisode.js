$(document).ready(function() {
    function loadEpisode(seasonId, episodeId) {
        $.ajax({
            url: `/episodes/ajax/${seasonId}&${episodeId}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                const $mainContainer = $('.main-container-video');
                const $navButtons = $('.navigation-buttons');

                $mainContainer.find('h2').text(data.episode.episode_title);
                $mainContainer.find('p').eq(0).html('<strong>Описание:</strong> ' + data.episode.episode_description);
                $mainContainer.find('p').eq(1).html('<strong>Дата выпуска:</strong> ' + (data.episode.episode_release === null ? "Неизвестна" : new Date(data.episode.episode_release).toLocaleDateString()));
                $mainContainer.find('p').eq(2).html('<strong>Продолжительность:</strong> ' + data.episode.episode_duration);
                $mainContainer.find('.video-wrapper video').attr('src', data.episode.episode_video_url);

                const prevEpisode = $('#prev-episode');
                const  nextEpisode = $('#next-episode');
                if (data.previousEpisode) {
                    if (prevEpisode.length === 0) {
                        $navButtons.prepend('<button id="prev-episode" data-season-id="'+ seasonId +'" data-episode-id="'+ data.previousEpisode.id +'">Предыдущая серия</button>');
                    } else {
                        prevEpisode.data('season-id', seasonId).data('episode-id', data.previousEpisode.id);
                    }
                } else {
                    prevEpisode.remove();
                }

                if (data.nextEpisode) {
                    if (nextEpisode.length === 0) {
                        $navButtons.append('<button id="next-episode" data-season-id="'+ seasonId +'" data-episode-id="'+ data.nextEpisode.id +'">Следующая серия</button>');
                    } else {
                        nextEpisode.data('season-id', seasonId).data('episode-id', data.nextEpisode.id);
                    }
                } else {
                    nextEpisode.remove();
                }

                const newUrl = `/episodes/${seasonId}&${episodeId}`;
                history.pushState({ seasonId: seasonId, episodeId: episodeId }, '', newUrl);
                $('#episode-id').val(episodeId);

                var functionDateCorrect = data.toLocaleDateString;

                if (data.session.user.userType !== "admin"){
                    updateComments(data.commentsUser, data.commentsOthers);
                }
                else{
                    updateAdminComments(data.comments);
                }
            },
            error: function(error) {
                console.error('Ошибка при загрузке серии:', error);
            }
        });
    }

    $(document).on('click', '#prev-episode, #next-episode', function() {
        const seasonId = $(this).data('season-id');
        const episodeId = $(this).data('episode-id');
        loadEpisode(seasonId, episodeId);
    });
});

function updateComments(commentsUser, commentsOthers) {
    const $commentsUserList = $('#commentsUserList');
    const $commentsOthersList = $('#commentsOthersList');

    $commentsUserList.empty();
    $commentsOthersList.empty();

    if (commentsUser.length > 0) {
        const userCommentsHTML = commentsUser.map(comment => `
                <li>
                    <div class="comment-header">
                        <div class="username">${comment.username}</div>
                        <div class="comment-date">${new Date(comment.review_date).toLocaleDateString()}</div>
                        <button class="delete-comment" data-comment-id="${comment.id}">Удалить</button>
                    </div>
                    <div class="comment-text">${comment.review_text}</div>
                </li>
            `).join('');
        $commentsUserList.html(`<ul>${userCommentsHTML}</ul>`);
    } else {
        $commentsUserList.html('<p id="nonComments">Вы еще не оставили комментариев</p>');
    }

    if (commentsOthers.length > 0) {
        const othersCommentsHTML = commentsOthers.map(comment => `
                <li>
                    <div class="comment-header">
                        <div class="username">${comment.username}</div>
                        <div class="comment-date">${new Date(comment.review_date).toLocaleDateString()}</div>
                    </div>
                    <div class="comment-text">${comment.review_text}</div>
                </li>
            `).join('');
        $commentsOthersList.html(`<ul>${othersCommentsHTML}</ul>`);
    } else {
        $commentsOthersList.html('<p>Другие пользователи еще не оставляли комментариев</p>');
    }
}

function updateAdminComments(allComments) {
    const $commentsUserList = $('#commentsAdminList');

    $commentsUserList.empty();

    if (allComments.length > 0) {
        const allCommentsHTML = allComments.map(comment => `
                <li>
                    <div class="comment-header">
                        <div class="username">${comment.username}</div>
                        <div class="comment-date">${comment.review_date}</div>
                    </div>
                    <div class="comment-text">${comment.review_text}</div>
                </li>
            `).join('');
        $commentsUserList.html(`<ul>${allCommentsHTML}</ul>`);
    } else {
        $commentsUserList.html('<p id="nonComments">Нет комментариев для этого эпизода</p>');
    }
}


