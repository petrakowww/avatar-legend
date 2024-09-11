$(document).ready(function() {
    $('#addNewSeason').on('click', function() {
        const title = $('#titleSeasonAddId').val();
        const description = $('#descriptionTitleAddId').val();
        const releaseDate = $('#releaseDateId').val();
        const uniqueNumber = $('#uniqueNumberSeasonAddId').val();
        const fileInput = $('#fileInputImageSeasonPreview')[0].files[0];
        const id = $('#seriesSeasonIDAddId').val();

        if (!uniqueNumber) {
            $('#addNewSeasonRequestInfo').text('Ошибка: Уникальный номер должен быть заполнен');
            return;
        }

        const seasonBlocks = $('.elementChangeSeason');
        let isUnique = true;

        seasonBlocks.each(function() {
            const existingUniqueNumber = $(this).find('input[id^="uniqueNumberSeasonAddId_"]').val();
            if (parseInt(uniqueNumber) === parseInt(existingUniqueNumber)) {
                isUnique = false;
                return false;
            }
        });

        if (!isUnique) {
            $('#addNewSeasonRequestInfo').text('Ошибка: Уникальный номер уже существует');
            return;
        }

        const formData = new FormData();
        formData.append('seriesId', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('releaseDate', releaseDate);
        formData.append('uniqueNumber', uniqueNumber);
        formData.append('image', fileInput);
        $.ajax({
            url: '/admin/addSeason',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
                const newSeason = response.newSeason;
                const seasonBlock = `
                    <div class="elementChangeSeason" id="seasonBlock_${newSeason.id}">
                        <div class="controlEpisodes">
                            <div class="seasonChangeImage">
                                <div class="overlay"></div>
                                <img src="${newSeason.imagePath}" alt="Preview Image Avatar" id="seasonPreviewImage_${newSeason.id}">
                                <span class="text-overlay">Выбрать файл</span>
                                <input type="file" id="fileInputSeasonImage_${newSeason.id}" class="file-input" accept="image/*">
                            </div>
                        </div>
                        <div class="changeSeasonInfo" id="seasonManagement_${newSeason.id}">
                            <label for="serialId_${newSeason.id}">
                                <span>СЕРИАЛ ID:</span>
                                <input type="text" id="serialId_${newSeason.id}" value="${newSeason.seriesId}" readonly>
                            </label>
                            <label for="seasonTitle_${newSeason.id}">
                                <span>Название сезона:</span>
                                <input type="text" id="seasonTitle_${newSeason.id}" value="${newSeason.title}" placeholder="Введите новое название сезона">
                            </label>
                            <label for="uniqueNumberSeasonAddId_${newSeason.id}">
                                <span>Введите номер:</span>
                                <input type="number" id="uniqueNumberSeasonAddId_${newSeason.id}" value="${newSeason.uniqueNumber}" placeholder="Введите уникальный номер сезона">
                            </label>
                            <label for="seasonDescription_${newSeason.id}">
                                <span>Описание сезона:</span>
                                <textarea id="seasonDescription_${newSeason.id}" placeholder="Введите новое описание сезона">${newSeason.description}</textarea>
                            </label>
                            <label for="countSeries_${newSeason.id}">
                                <span>Количество серий:</span>
                                <input type="number" id="countSeries_${newSeason.id}" placeholder="Серии" value="0" readonly>
                            </label>
                            <label for="seasonRelease_${newSeason.id}">
                                <span>Дата выхода сезона:</span>
                                <input type="date" id="seasonRelease_${newSeason.id}" value="${newSeason.releaseDate}" placeholder="Введите новую дату выхода">
                            </label>
                            <div class="informationSeasonChanges">
                                <p id="seasonUpdatedInfo_${newSeason.id}"></p>
                                <p id="seasonImageUpdatedInfo_${newSeason.id}"></p>
                            </div>
                            <input type="hidden" id="season_${newSeason.id}">
                            <button class="changeSeason" id="changeSeasonButton_${newSeason.id}">Изменить сезон</button>
                            <button class="deleteSeason" id="deleteSeasonButton_${newSeason.id}">Удалить сезон</button>
                            <button class="switchToEpisodes" id="switchToEpisodesButton_${newSeason.id}">Управление сериями</button>
                        </div>

                        <div class="containerEpisodesSerial hidden" id="episodeManagement_${newSeason.id}">
                            <button class="controlSeason switchToSeason" id="controlSeasonButton_${newSeason.id}">Вернуться к управлению сезоном</button>
                            <div class="episode-add">
                                <input type="text" placeholder="Название серии" id="episodeTitleInput_${newSeason.id}" />
                                <input type="time" placeholder="Продолжительность" id="episodeDurationInput_${newSeason.id}" />
                                <input type="date" placeholder="Дата выпуска" id="episodeReleaseDateInput_${newSeason.id}" />
                                <input type="file" id="episodeFileInput_${newSeason.id}" />
                                <button class="add-episode" data-season-id="${newSeason.id}">Добавить</button>
                            </div>

                            <div class="episode-list"></div>
                        </div>
                    </div>
                `;

                const seasonBlocks = $('.elementChangeSeason');
                let inserted = false;

                seasonBlocks.each(function() {
                    const existingUniqueNumber = $(this).find('input[id^="uniqueNumberSeasonAddId_"]').val();
                    if (parseInt(uniqueNumber) < parseInt(existingUniqueNumber)) {
                        $(this).before(seasonBlock);
                        inserted = true;
                        return false;
                    }
                });

                if (!inserted) {
                    $('#seasonInfoContainer').append(seasonBlock);
                }

                $('#addNewSeasonRequestInfo').text('Сезон был успешно добавлен');
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при добавлении сезона:', error);
                $('#addNewSeasonRequestInfo').text('Ошибка при добавлении сезона: ' + error);
            }
        });
    });
});
