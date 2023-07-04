$(document).ready(function() {

	$('body').on('click', '.inputEdit', function (event) {
        event.preventDefault();
		let main = $(this),
			input = main.find('input')

        // if (main.hasClass('editing')) {
		// 	main.removeClass('editing')
		// }else{
        //     main.addClass('editing')
		// }

		main.addClass('editing')
		// input.attr('contenteditable', 'true')
		input.focus()
	});
	$('body').on('focusout', '.inputEdit', function(event) {
        let main = $(this),
			input = main.find('input'),
			inputSpan = main.find('span.input')
        main.removeClass('editing')
		inputSpan.html(input.val())
    });

    // $('.kabinet__header-info').change(function(event) {
    //     event.preventDefault();
	// 	let input = $(this),
	// 		formData = new FormData(this);

	// 	formData.append('method', 'updateAvatar');
	// 	formData.append('params', 'data');
	// 	$.ajax({
    //         url: '/ajax',
    //         type: 'POST',
    //         data: formData,
    //         success: function (data) {
    //             if(data.message === 'success'){
	// 				$('.kabinet__avatar').css('background-image', 'url(' + data.path + ')')
	// 				$('.header__cabinet > span').css('background-image', 'url(' + data.path + ')')
	// 				$('.kabinet__avatar').addClass('set')
    //             }else{
    //             //     $('.edit_student_profile.js-popupMain.active').removeClass('active')
    //             //     $('body').removeClass('lock')
    //             //     form.removeClass('loading')
    //             //     popup(data)
    //             }
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
	// 	return false;
	// });

	// $('body').on('submit', '.login', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		data = form.serialize()

	// 	$.post(
	// 		'/ajax',
	// 		{
	// 			method: 'auth',
	// 			params: data
	// 		},
	// 		(data) => {
	// 			if(data.message === 'success'){
    //                 location.reload(true);
    //             }
	// 		}
	// 	);
	// 	return false;
	// });

	$('body').on('change', '.kabinetEdit__form', function(event) {
		event.preventDefault();
		$('.kabinetEdit__form > button').show()
		return false;
	});

	// $('body').on('submit', '.kabinetEdit__form', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		data = form.serialize()

	// 	$.post(
	// 		'/ajax',
	// 		{
	// 			method: 'kabinetEdit',
	// 			params: data
	// 		},
	// 		(data) => {
	// 			if(data.message === 'success'){
    //                 location.reload(true);
    //             }
	// 		}
	// 	);
	// 	return false;
	// });

});