$(document).on('click', '.deleteSeason', function() {
    const seasonId = $(this).attr('id').split('_')[1];

    const confirmation = confirm('Вы уверены, что хотите удалить этот сезон?');
    if (confirmation) {
        $.ajax({
            url: `/admin/deleteSeason/${seasonId}`,
            type: 'DELETE',
            success: function(response) {
                $(`#seasonBlock_${seasonId}`).remove();
                console.log('Сезон успешно удалён');
            },
            error: function(xhr, status, error) {
                console.error('Ошибка при удалении сезона:', error);
            }
        });
    }
});
