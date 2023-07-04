$(document).ready(function() {
    $('body').on('submit', '.reviews__form', function(event) {
		event.preventDefault();
		let form = $(this),
			data = form.serialize(),
            btn = form.find(':input[type="submit"]')

        btn.prop('disabled', true)

		$.post(
			'/ajax',
			{
				method: 'leaveFeedback',
				params: data
			},
			(data) => {
				if(data.status === 'success'){
                    location.reload(true)
                }else{
                    popup(data)
                    btn.prop('disabled', false)
                }
			}
		);
		return false;
	});
});