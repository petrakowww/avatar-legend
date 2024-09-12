$(document).on('click', '.edit-episode', function() {
    const ids = $(this).attr('id').split('_');
    const seasonId = ids[1];
    const episodeId = ids[2];
    const title = $(`#episodeTitle_${seasonId}_${episodeId}`).val();
    const duration = $(`#episodeDuration_${seasonId}_${episodeId}`).val();
    const release_date = $(`#episodeReleaseDate_${seasonId}_${episodeId}`).val();
    const description = $(`#episodeDescription_${seasonId}_${episodeId}`).val();
    const fileInput = $(`#episodeFile_${seasonId}_${episodeId}`)[0].files[0];

    if (fileInput && !['video/mp4', 'video/x-matroska'].includes(fileInput.type)) {
        alert('Допустимы только файлы MP4 и MKV.');
        return;
    }

    const formData = new FormData();
    formData.append('seasonId', seasonId);
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('release_date', release_date);
    formData.append('description', description);
    if (fileInput) {
        formData.append('file', fileInput);
    }

    $.ajax({
        url: `/admin/updateEpisode/${episodeId}`,
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            const updatedEpisode = response.episode;
            $(`#videoUrl_${seasonId}_${episodeId}`).val(updatedEpisode.videoUrl);
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при обновлении эпизода:', error);
        }
    });
});
