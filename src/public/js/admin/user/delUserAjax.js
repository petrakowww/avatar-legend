$(document).on('click', '.delete-user', function() {
    const userId = this.id.split('_')[1];
    $.ajax({
        url: `/admin/deleteUser/${userId}`,
        type: 'DELETE',
        success: function(response) {
            $(`#userContainerId #deleteUser_${userId}`).closest('.user-element').remove();
        },
        error: function(xhr, status, error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    });
});



