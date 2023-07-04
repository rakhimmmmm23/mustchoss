$(document).ready(function() {
    $('body').on('click', '.js-moderationAccept', function () {
        let id = $(this).data('id')
        $('body').addClass('lock')
        $('.header__nav').removeClass('active')
        $('.popup__accept').addClass('active')
        $('.js-establishmentAccept').data('id', id)
    });

    // $('body').on('click', '.js-establishmentAccept', function () {
    //     let id = $(this).data('id')
    //     // $('#' + id).remove()
    //     // console.log(id)
    //     $.post(
	// 		'/ajax',
	// 		{
	// 			method: 'moderationAccept',
	// 			params: id
	// 		},
	// 		(data) => {
    //             $('body').removeClass('lock')
    //             $('.popup__accept').removeClass('active')
	// 			if(data.status === 'success'){
    //                 $('#' + id).remove()
    //             }
    //             popup(data)
	// 		}
	// 	);
    // });
});