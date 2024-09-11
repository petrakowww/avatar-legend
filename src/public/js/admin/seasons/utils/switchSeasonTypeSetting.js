$(document).ready(function () {
    const $addSeasonButton = $('#openCloseAddSeason');
    const $changeSeasonsButton = $('#openCloseChangeSeasons');
    const $addSeasonInfo = $('#addSeasonInfo');
    const $changeSeasonsInfo = $('#changeSeasonsInfo');

    $addSeasonButton.on('click', function () {
        $addSeasonInfo.removeClass('hidden');
        $changeSeasonsInfo.addClass('hidden');
    });

    $changeSeasonsButton.on('click', function () {
        $addSeasonInfo.addClass('hidden');
        $changeSeasonsInfo.removeClass('hidden');
    });

    $addSeasonInfo.removeClass('hidden');
    $changeSeasonsInfo.addClass('hidden');
});