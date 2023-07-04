$(document).ready(function() {

    // $('body').on('submit', '.edit', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		formData = form.serialize(),
	// 		data = new FormData(this)

	// 	data.append('params', formData)
	// 	data.append('method', 'establishmentEdit')

    //     form.find(':input[type="submit"]').prop('disabled', true);

	// 	$.ajax({
    //         url: '/ajax',
    //         type: 'POST',
    //         data: data,
    //         success: function (data) {
    //             if(data.status === 'success'){
    //                 location.reload(true);
    //             }
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
	// 	return false;
	// });

    $('input[type=file]').change(function(event) {
        event.preventDefault();
        let label = $(this).closest('.form__img'),
            reader = new FileReader()
        reader.onload = function(){
            label.css('background-image', 'url(' + reader.result + ')')
            label.addClass('withIMG')
        }
        reader.readAsDataURL(event.target.files[0])
    });

    // var addPhoneCount = 1;
    // $('body').on('click', '.novoe__addPhone', function (event) {
    //     event.preventDefault();
    //     addPhoneCount++;
	// 	let row = $(this).closest('.form__row'),
    //         clone = row.find('.form__phone:first-child').clone()
    //     clone.find('input').val('').inputmask({'mask': '+7 (999)-999-99-99', showMaskOnHover: false})
    //     clone.insertBefore('.form__btn')

    //     // лимит на добавление телефона
    //     if(addPhoneCount === 4){
    //         $(this).remove()
    //     }
	// });

    // $('body').on('click', '.adressAdd', function (event) {
    //     let request = $('#adressYM').val()
    //     geocode(request)
    // });

    $('input#adressYM').focusout(function(){
		if ($(this).val() == ''){
			$(this).parent().find('.adressAdd').prop('disabled', true)
		}else{
		  	$(this).parent().find('.adressAdd').prop('disabled', false)
		}
	});

    $('body').on('click', '.js-deleteIMG', function (event) {
        let label = $(this).closest('.form__img'),
            img = $(this).data('img')

        label.removeAttr('style')
        label.removeClass('withIMG')
        label.find('input').val('')
        label.find('input').prop('disabled', false)

        setTimeout(function(){
            label.removeAttr('style')
        }, 1000)

        // $.post(
		// 	'/ajax',
		// 	{
		// 		method: 'removeIMG',
		// 		params: img
		// 	},
		// 	(data) => {
		// 		// if(data.message === 'success'){
        //         //     location.reload(true);
        //         // }
		// 	}
		// );
    });
// Открытие категории
    $('body').on('click', '.menuCat_header', function (event) {
        let section = $(this).closest('.menuCat')
        if ($(event.target).is('button')){
            return;
        }else{
            if (section.hasClass('open')) {
                section.removeClass('open')
            }else{
                // $('.open').removeClass('open')
                section.addClass('open')
            }
        }
    });

    // Новая категория
    $('body').on('click', '.menuAddCat', function (event) {
        $('body').addClass('lock')
        $('.popup__menuAddCat').addClass('active')
    });
    // $('body').on('submit', '.js-menuAddCat', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		data = form.serialize()

    //     form.find(':input[type="submit"]').prop('disabled', true);
	// 	$.post(
	// 		'/ajax',
	// 		{
	// 			method: 'menuAddCat',
	// 			params: data
	// 		},
	// 		(data) => {
	// 			if(data.status === 'success'){
    //                 location.reload(true);
    //             }else{
    //                 popup(data)
    //                 form.find(':input[type="submit"]').prop('disabled', false);
    //             }
	// 		}
	// 	);
	// 	return false;
	// });

    // Добавить блюдо
    $('body').on('click', '.menuCat_header-addDish_btn', function (event) {
        let id = $(this).data('id')
        $('body').addClass('lock')
        $('.popup__menuAddDishes').addClass('active')
        $('.js-menuAddDishes > input[name=menuCategoryID]').val(id).trigger($.Event('keypress', { keycode: 13 }))
    });
    // Редактирование категории
    $('body').on('click', '.vstk-edit-cat', function (event) {
        let id = $(this).data('id')
        $('body').addClass('lock')
        $('.popup__menuEditCat').addClass('active')
        $('.js-menuEditCat > input[name=menuCatID]').val(id)
    })
    // $('.menuAddDishes-img > input[type=file]').change(function(event) {
    $('body').on('change', '.menuAddDishes-img > input[type=file]', function(event) {
        event.preventDefault();
        let label = $(this).closest('.menuAddDishes-img'),
            area = label.find('.imgArea'),
            reader = new FileReader()
        reader.onload = function(){
            area.css('background-image', 'url(' + reader.result + ')')
            area.addClass('withIMG')
        }
        reader.readAsDataURL(event.target.files[0])
    });
    // $('body').on('submit', '.js-menuAddDishes', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		formData = form.serialize(),
	// 		data = new FormData(this)
	// 	data.append('params', formData)
	// 	data.append('method', 'menuAddDishes')
    //     form.find(':input[type="submit"]').prop('disabled', true);
	// 	$.ajax({
    //         url: '/ajax',
    //         type: 'POST',
    //         data: data,
    //         success: function (data) {
    //             if(data.status === 'success'){
    //                 location.reload(true);
    //             }else{
    //                 popup(data)
    //                 form.find(':input[type="submit"]').prop('disabled', false);
    //             }
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
	// 	return false;
	// });

    //Редактирование блюда
    $('body').on('click', '.menu_editDish_btn_vstk', function (event) {
        $('body').addClass('lock')
        $('.popup__menuEditDishes').addClass('active')
    //     let id = $(this).data('id')
    //     $.post(
	// 		'/ajax',
	// 		{
	// 			method: 'menuEditDish',
	// 			params: id
	// 		},
	// 		(data) => {
    //             if(data.status === 'error'){
    //                 popup(data)
    //             }else{
    //                 $('body').addClass('lock')
    //                 $('.popup__menuEditDishes').addClass('active')
    //                 console.log(data)
    //                 $('.js-menuEditDishes').html(data)
    //             }
	// 		}
	// 	);
    });
    // $('body').on('submit', '.js-menuEditDishes', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		formData = form.serialize(),
	// 		data = new FormData(this)
	// 	data.append('params', formData)
	// 	data.append('method', 'menuEditDishes')
    //     form.find(':input[type="submit"]').prop('disabled', true);
	// 	$.ajax({
    //         url: '/ajax',
    //         type: 'POST',
    //         data: data,
    //         success: function (data) {
    //             if(data.status === 'success'){
    //                 location.reload(true);
    //             }else{
    //                 popup(data)
    //                 form.find(':input[type="submit"]').prop('disabled', false);
    //             }
    //         },
    //         cache: false,
    //         contentType: false,
    //         processData: false
    //     });
	// 	return false;
	// });
});