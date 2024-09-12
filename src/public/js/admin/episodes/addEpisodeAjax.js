$(document).on('click', '.add-episode', function() {
    const seasonId = $(this).data('season-id');
    const title = $('#episodeTitleInput_' + seasonId).val();
    const duration = $('#episodeDurationInput_' + seasonId).val();
    const release_date = $('#episodeReleaseDateInput_' + seasonId).val();
    const description = $('#episodeDescriptionInput_' + seasonId).val();
    const fileInput = $('#episodeFileInput_' + seasonId)[0].files[0];

    if (fileInput && !['video/mp4', 'video/x-matroska'].includes(fileInput.type)) {
        alert('Допустимы только файлы MP4 и MKV.');
        return;
    }
    const formData = new FormData();
    formData.append('seasonId', seasonId);
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('release_date', release_date);
    formData.append('file', fileInput);
    formData.append('description', description);

    $.ajax({
        url: '/admin/addEpisode',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            const newEpisode = response.episode;
            const episodeItem = `
                <div class="episode-item" id="episodeItem_${seasonId}_${newEpisode.id}">
                    <input type="text" id="episodeTitle_${seasonId}_${newEpisode.id}" value="${newEpisode.title || ''}" />
                    <input type="time" id="episodeDuration_${seasonId}_${newEpisode.id}" value="${newEpisode.duration || ''}" />
                    <input type="date" id="episodeReleaseDate_${seasonId}_${newEpisode.id}" value="${newEpisode.release_date || ''}" />
                    <input type="file" id="episodeFile_${seasonId}_${newEpisode.id}" />
                    <input type="text" id="episodeDescription_${seasonId}_${newEpisode.id}" value="${newEpisode.description || ''}" />
                    <input type="hidden" id="videoUrl_${seasonId}_${newEpisode.id}" value="${newEpisode.videoUrl}" />
                    <button class="edit-episode" id="editEpisodeButton_${seasonId}_${newEpisode.id}">Изменить</button>
                    <button class="delete-episode" id="deleteEpisodeButton_${seasonId}_${newEpisode.id}">Удалить</button>
                </div>
            `;
            $('#episodeManagement_' + seasonId + ' .episode-list').append(episodeItem);
            const updatedSeason = response.updatedSeason;
            $(`#countSeries_${updatedSeason.id}`).val(updatedSeason.episode_count);
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при добавлении эпизода:', error);
        }
    });
});
