import JQuery from 'jquery'
let $ = JQuery

export const popup = function(data) {
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

export default popup
