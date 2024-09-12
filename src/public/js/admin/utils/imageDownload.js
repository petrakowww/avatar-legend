function changeImage(fileInputSelector, imageSelector, infoSelector) {
    $(document).on('change', fileInputSelector, function() {
        let file = this.files[0];
        let allowedTypes = ['image/jpeg', 'image/png', 'image/jpeg', 'image/webp'];

        if (file && allowedTypes.includes(file.type)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $(imageSelector).attr('src', e.target.result);
                $(infoSelector).text('Файл успешно изменен.');
            };
            reader.readAsDataURL(file);
        } else {
            $(infoSelector).text('Пожалуйста, выберите изображение в формате JPEG или PNG.');
            $(this).val('');
        }
    });
}

$(document).ready(function() {
    changeImage('#fileInputImageSeriesPreview', '#previewImage', '#saveSeriesImagesInfo');
    changeImage('#fileInputImageSeasonPreview', '#previewSeasonImage', '#addNewSeasonImageInfo');

    $('#seasonInfoContainer').on('change', '.file-input', function() {
        let seasonId = $(this).attr('id').split('_')[1];
        changeImage('#fileInputSeasonImage_' + seasonId, '#seasonPreviewImage_' + seasonId, '#seasonImageUpdatedInfo_' + seasonId);
        console.log(seasonId);
    });
});