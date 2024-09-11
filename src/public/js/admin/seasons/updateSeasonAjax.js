$(document).ready(function() {
    $('.changeSeason').on('click', function() {
        const seasonId = $(this).attr('id').split('_')[1];
        const formData = new FormData();
        const fileInput = $(`#fileInputSeasonImage_${seasonId}`)[0];

        if (fileInput.files.length > 0) {
            formData.append('image', fileInput.files[0]);
        }

        const newTitle = $(`#seasonTitle_${seasonId}`).val();
        const newDescription = $(`#seasonDescription_${seasonId}`).val();
        const newEpisodeCount = $(`#countSeries_${seasonId}`).val();
        const newReleaseDate = $(`#seasonRelease_${seasonId}`).val();
        const newUniqueNumber = $(`#uniqueNumberSeasonAddId_${seasonId}`).val();

        formData.append('title', newTitle);
        formData.append('description', newDescription);
        formData.append('episode_count', newEpisodeCount);
        formData.append('release_date', newReleaseDate);
        formData.append('uniqueNumber', newUniqueNumber);

        $.ajax({
            url: `/admin/updateSeason/${seasonId}`,
            type: 'PUT',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                $(`#seasonUpdatedInfo_${seasonId}`).text("Сезон успешно обновлен");
                if (data.season.preview_image) {
                    $(`#seasonImageUpdatedInfo_${seasonId}`).text("Фотография успешно изменена");
                }

                const seasonBlock = $(`#seasonBlock_${seasonId}`);
                seasonBlock.find(`#seasonTitle_${seasonId}`).val(newTitle);
                seasonBlock.find(`#seasonDescription_${seasonId}`).val(newDescription);
                seasonBlock.find(`#countSeries_${seasonId}`).val(newEpisodeCount);
                seasonBlock.find(`#seasonRelease_${seasonId}`).val(newReleaseDate);
                seasonBlock.find(`#uniqueNumberSeasonAddId_${seasonId}`).val(newUniqueNumber);

                seasonBlock.remove();

                const seasonBlocks = $('.elementChangeSeason');
                let inserted = false;

                seasonBlocks.each(function() {
                    const existingUniqueNumber = $(this).find('input[id^="uniqueNumberSeasonAddId_"]').val();
                    if (parseInt(newUniqueNumber) < parseInt(existingUniqueNumber)) {
                        $(this).before(seasonBlock);
                        inserted = true;
                        return false;
                    }
                });

                if (!inserted) {
                    $('#seasonInfoContainer').append(seasonBlock);
                }
            },
            error: function(xhr, status, error) {
                $(`#seasonImageUpdatedInfo_${seasonId}`).text("Ошибка при обновлении сезона: " + error);
            }
        });
    });
});
