$(document).ready(function() {

	// маска
	// $('input[type=tel]').inputmask({'mask': '+7 (999)-999-99-99', showMaskOnHover: false});
	// $('input[type=email]').inputmask('email');
	// $('.numeric').inputmask('numeric', {rightAlign: false});

	$('body').on('click', '.js-nav', function () {
		let nav = $('.header__nav')
		if (nav.hasClass('active')) {
			$('.active').removeClass('active')
            $('.lock').removeClass('lock')
		}else{
			$('body').addClass('lock')
            nav.addClass('active')
		}
	});

	$('body').on('click', '.popupBG, .popup__close, .js-popupClose', function () {
		$('.lock').removeClass('lock')
		$('.active').removeClass('active')
		// $('.popup').removeClass('active')
	});

	$('body').on('click', '.js-auth', function () {
		$('body').addClass('lock')
		$('.header__nav').removeClass('active')
		$('.popup__login').addClass('active')
	});
	
	$('body').on('click', '.js-reg', function () {
		$('body').addClass('lock')
		$('.popup__login').removeClass('active')
		$('.popup__choice').addClass('active')
	});

	$('body').on('click', '.regChoiceType', function () {
		let type = $(this).data('type')
		$('.popup__choice').removeClass('active')
		$('.popup__reg' + type).addClass('active')
		$('.popup__reg' + type + ' > form > .reg_step:first').addClass('active')
	});

	// $('input[type="text"], input[type="tel"], input[type="email"], input[type="password"], textarea').focusout(function(){
	// 	if ($(this).val() == ''){
	// 		$(this).parent().removeClass('filled')
	// 	}else{
	// 	  	$(this).parent().addClass('filled')
	// 	}
	// });

	// select
	$('body').on('click', '.form__select > span', function () {
		let select = $(this).closest('.form__select')
		$('.form__select.open').removeClass('open')
		if (select.hasClass('open')) {
			select.removeClass('open')
		}else{
            select.addClass('open')
		}
	});
	$('body').on('click', '.selectOption', function(event) {
		let text = $(this).text(),
            main = $(this).closest('div.form__select');
        main.find('span.label').html(text)
		main.removeClass('open')
	});
	$(document).on('click', function (event) {
		if (!$(event.target).closest('.form__select.open').length) {
		  	$('.form__select.open').removeClass('open')
		}
	});

	$('body').on('click', '.js-nextRegStep', function () {
		let step = $(this).closest('.reg_step')
		step.removeClass('active')
		step.next().addClass('active')
	});

	var reqCount = 0
	// $('input:required').on('focusout keyup', function (e) {
	// 	let step = $(this).closest('.reg_step'),
	// 		btn = step.find('button:not(.pwdView)')
	// 	checkInputs(step,btn)
	// });

	$('body').on('click', '.pwdView', function () {
		let label = $(this).closest('.form__input'),
			input = label.find('input')
		if (input.attr('type') === 'password') {
			input.attr('type', 'text');
		}else{
			input.attr('type', 'password');
		}
	});

	// $('input[name=pwd2]').on('focusout keyup', function (e) {
    //     let step = $(this).closest('.reg_step'),
	// 		btn = step.find('button[type=submit]')
	// 		pass = step.find('input[name=pwd]').val(),
    //     	pass2 = $(this).val();
    //     if(pass != pass2){
    //         console.log('the passwords didn\'t match!')
	// 		btn.prop('disabled', true)
    //     }else{
	// 		btn.prop('disabled', false)
	// 	}

    // });

	// $('body').on('submit', '.registration', function(event) {
	// 	event.preventDefault();
	// 	let form = $(this),
	// 		data = form.serialize()

	// 	$.post(
	// 		'/ajax',
	// 		{
	// 			method: 'registration',
	// 			params: data
	// 		},
	// 		(data) => {
	// 			if(data.status === 'success'){
    //                 window.location.href = '/kabinet'
    //             }else{
	// 				popup(data)
	// 			}
	// 		}
	// 	);
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
	// 			if(data.status === 'success'){
    //                 location.reload(true)
    //             }else{
	// 				popup(data)
	// 			}
	// 		}
	// 	);
	// 	return false;
	// });

	$('body').on('change', '.header__city', function(event) {
		event.preventDefault();
		let city = $('input[name=siteСity]:checked').val()
		window.location.href = '/' + city
		return false;
	});

	$('body').on('click', '.header__notify', function () {
		let notify = $('.notify')
		if (notify.hasClass('active')) {
			$('.active').removeClass('active')
            $('.lock').removeClass('lock')
		}else{
			$('body').addClass('lock')
			$('header').addClass('lock')
            notify.addClass('active')
		}
	});

});

function isEmpty(value) {
	switch (typeof(value)) {
	  case 'string': return (value.length === 0);
	  case 'number':
	  case 'boolean': return false;
	  case 'undefined': return true;
	  case 'object': return !value ? true : false; // handling for null.
	  default: return !value ? true : false
	}
}

function butynum(data) {
	var num = data.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
	return num;
}

// function checkInputs(step,btn) {
// 	let isValid = true,
// 		input = step.find('input')
// 	input.filter('[required]').each(function() {
// 		if ($(this).attr('type') === 'tel') {
// 			if($(this).val().indexOf('_') > 1){
// 				btn.prop('disabled', true)
// 				isValid = false
// 				return false
// 			}
// 		}else if ($(this).val() === '') {
// 			btn.prop('disabled', true)
// 			isValid = false;
// 			return false;
// 		}
// 	});
// 	if(isValid) {
// 		btn.prop('disabled', false)
// 	}
// 	return isValid;
// }

function popup(data) {
	let popup = $('.popup__alert'),
		status = data.status,
		title = data.message.title,
		text = data.message.text,
		h4 = popup.find('h4'),
		p = popup.find('p')
	h4.html(title)
	p.html(text)
	$('.popup__alert').removeClass('error')
	$('.popup__alert').removeClass('success')
	$('body').addClass('lock')
	$('.header__nav').removeClass('active')
	$('.popup').removeClass('active')
	$('.popup__alert').addClass(status)
	$('.popup__alert').addClass('active')
}