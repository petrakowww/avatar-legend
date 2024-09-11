$(document).ready(function() {
    let isYearAscending = true;
    let isViewsAscending = true;
    let isSeasonNumberAscending = true;

    function toggleSort(button, isAscending, compareFunction) {
        if (isAscending) {
            button.data('ascending', false);
            $('.preview').sort(compareFunction).appendTo('.seasons-preview-main');
        } else {
            button.data('ascending', true);
            $('.preview').sort(function(a, b) {
                return compareFunction(b, a);
            }).appendTo('.seasons-preview-main');
        }
    }

    $('#filterYearSeries').on('click', function() {
        toggleSort($(this), isYearAscending, function(a, b) {
            let yearA = parseInt($(a).find('.release-year').text().replace('Год выпуска: ', '')) || 0;
            let yearB = parseInt($(b).find('.release-year').text().replace('Год выпуска: ', '')) || 0;
            return yearA - yearB;
        });
        isYearAscending = !isYearAscending;
    });

    $('#filterViewsSeries').on('click', function() {
        toggleSort($(this), isViewsAscending, function(a, b) {
            let viewsA = parseInt($(a).find('.view-count').text().replace('Количество просмотров: ', '')) || 0;
            let viewsB = parseInt($(b).find('.view-count').text().replace('Количество просмотров: ', '')) || 0;
            return viewsA - viewsB;
        });
        isViewsAscending = !isViewsAscending;
    });

    $('#filterSeasonNumber').on('click', function() {
        toggleSort($(this), isSeasonNumberAscending, function(a, b) {
            let numberA = parseInt($(a).find('.season-number').text().replace('Номер сезона: ', '')) || 0;
            let numberB = parseInt($(b).find('.season-number').text().replace('Номер сезона: ', '')) || 0;
            console.log(numberA);
            console.log(numberB);
            return numberA - numberB;
        });
        isSeasonNumberAscending = !isSeasonNumberAscending;
    });

    let isHidden = false;
    $('#toggleBlocks').on('click', function() {
        if (isHidden) {
            $('.preview').show();
            $(this).text('Скрыть все записи');
        } else {
            $('.preview').hide();
            $(this).text('Показать все записи');
        }
        isHidden = !isHidden;
    });
});
