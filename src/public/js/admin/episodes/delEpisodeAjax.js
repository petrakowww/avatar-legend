$(document).on('click', '.delete-episode', function() {
    const ids = $(this).attr('id').split('_');
    const seasonId = ids[1];
    const episodeId = ids[2];

    $.ajax({
        url: `/admin/deleteEpisode/${episodeId}`,
        type: 'DELETE',
        success: function(response) {
            $(`#episodeItem_${seasonId}_${episodeId}`).remove();
            console.log(response.episode);
            $(`#countSeries_${seasonId}`).val(response.updatedSeason.episode_count);
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при удалении эпизода:', error);
        }
    });
});