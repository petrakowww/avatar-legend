$(document).ready(function() {
    $('#saveSeriesDetails').on('click', function() {
        const seriesNameTitle = $('#seriesNameTitle').val();
        const seriesRelease = $('#seriesRelease').val();

        if (!seriesNameTitle) {
            $('#saveSeriesDetailsInfo').text('Пожалуйста, укажите название сериала');
            return;
        }

        const formData = new FormData();
        formData.append('seriesId', $('#seriesId').val());
        formData.append('seriesNameTitle', seriesNameTitle);
        formData.append('seriesDescription', $('#seriesDescription').val());
        formData.append('seriesRelease', seriesRelease);
        formData.append('seriesGenres', $('#seriesGenres').val());
        formData.append('seriesAuthors', $('#seriesAuthors').val());
        formData.append('seriesCountry', $('#seriesCountry').val());
        formData.append('seriesStatus', $('input[name="seriesStatus"]:checked').val());
        const fileInputImagesPreview = $('#fileInputImageSeriesPreview');
        if (fileInputImagesPreview[0].files.length > 0) {
            formData.append('previewImage', fileInputImagesPreview[0].files[0]);
        }

        $.ajax({
            url: '/admin/saveSeries',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#saveSeriesDetailsInfo').text('Изменения были успешно сохранены');
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при изменении:', error);
                $('#saveSeriesDetailsInfo').text('Ошибка при сохранении изменений');
            }
        });
    });
});
