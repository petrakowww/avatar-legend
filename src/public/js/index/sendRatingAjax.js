$(document).ready(function() {
    $('#sendRatingSeries').click(function() {
        const rating = $('#ratingSelectId').val();
        const ratingYours = $('#valueRatingYours');
        const wrapper = $('#wrapper');
        const seriesId = wrapper.data('series-id');
        const userId = wrapper.data('user-id');

        $.ajax({
            type: 'POST',
            url: '/rating/submit',
            contentType: 'application/json',
            data: JSON.stringify({
                seriesId: seriesId,
                userId: userId,
                rating: rating
            }),
            success: function(response) {
                $('#valueRating').text(parseFloat(response.averageRating).toFixed(2));
                $('#valueRatingYours').text(rating);
            },
            error: function(error) {
                console.error('Ошибка при отправке рейтинга:', error);
                alert('Ошибка при отправки рейтинга, повторите попытку.');
            }
        });
    });
});
