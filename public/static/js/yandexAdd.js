$(document).ready(function() {
    // добавляем новое/редактируем заведение
    ymaps.ready(init);
    function init(){
        // добавление/редактирование заведения
        ymapEdit = new ymaps.Map('ymap', {
            center: [43.238293, 76.945465],
            zoom: 12,
            controls: []
        });
        var suggestView1 = new ymaps.SuggestView('adressYM');
    }

    $('body').on('click', '.selectOption', function(event) {
		let input = $(this).find('input'),
            value = input.val();
        ymapEdit.setCenter(selectedCity(value));
        $('input#adressYM').parent().removeClass('filled')
        $('input#adressYM').val('')
        $('input[name=longitude]').val('')
        $('input[name=latitude]').val('')
        ymapEdit.geoObjects.removeAll()
	});

    $('input#adressYM').focusout(function(){
		if ($(this).val() == ''){
			$(this).parent().find('.adressAdd').prop('disabled', true)
		}else{
		  	$(this).parent().find('.adressAdd').prop('disabled', false)
		}
	});

    $('input#adressYM').focus(function() {
        let city = $('input[name="city"]:checked').val()
        if ($(this).val() == ''){
            $(this).val(getCityName(city) + ', ')
		}
    });
});

function geocode(request) {
    ymaps.geocode(request).then(function(res) {
        var obj = res.geoObjects.get(0),
            error,
            hint;
        if (obj) {
            // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
            switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                case 'exact':
                    break;
                case 'number':
                case 'near':
                case 'range':
                    error = 'Неточный адрес, требуется уточнение';
                    hint = 'Уточните номер дома';
                    break;
                case 'street':
                    error = 'Неполный адрес, требуется уточнение';
                    hint = 'Уточните номер дома';
                    break;
                case 'other':
                default:
                    error = 'Неточный адрес, требуется уточнение';
                    hint = 'Уточните адрес';
            }
        } else {
            error = 'Адрес не найден';
            hint = 'Уточните адрес';
        }

        ymapEdit.geoObjects.removeAll()

        // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
        if (error) {
            //showError(error);
            //showMessage(hint);
            alert('error')
        } else {
            // showResult(obj);
            caption = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
            let bounds = obj.properties.get('boundedBy'),
                mapState = ymaps.util.bounds.getCenterAndZoom(
                    bounds,
                    [$('#ymap').width(), $('#ymap').height()]
                ),
                center = mapState.center,
                zoom = mapState.zoom
            // console.log(zoom)
            $('input[name=longitude]').val(center[0])
            $('input[name=latitude]').val(center[1])
            ymapEdit.setCenter(center, zoom);

            let myPlacemark = new ymaps.Placemark(center, {}, {
                iconLayout: 'default#image',
                iconImageHref: '/static/img/maps/placemark.png',
                iconImageSize: [24, 34],
                // iconImageOffset: [-3, -42]
            });
            ymapEdit.geoObjects.add(myPlacemark);
            // map.setCenter(state.center, state.zoom)
        }
    }, function (e) {
        console.log(e)
    })
}