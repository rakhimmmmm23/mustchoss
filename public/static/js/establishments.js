$(document).ready(function() {

    // $('body').on('submit', '.novoe', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		formData = form.serialize(),
	// 		data = new FormData(this)

	// 	data.append('params', formData)
	// 	data.append('method', 'novoe')

    //     form.find(':input[type="submit"]').prop('disabled', true);

	// 	$.ajax({
    //         url: '/ajax',
    //         type: 'POST',
    //         data: data,
    //         success: function (data) {
    //             if(data.message === 'success'){
    //                 let getUrl = window.location,
    //                     baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
    //                 window.location.href = baseUrl
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

    // $('body').on('click', '.js-deleteIMG', function (event) {
    //     let label = $(this).closest('.form__img')

    //     label.removeAttr('style')
    //     label.removeClass('withIMG')
    //     label.find('input').val('')
    // });
});