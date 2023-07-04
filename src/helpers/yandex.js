import { loadYmap } from 'vue-yandex-maps'
import popup from '@/helpers/popup.js'
import JQuery from 'jquery'
let $ = JQuery

export const geocode = function(settings,request) {
    return loadYmap(settings)
    .then(() => {
        let ymaps = window.ymaps
        ymaps.geocode(request).then(function(res) {
            let obj = res.geoObjects.get(0)
            // console.log(obj)
            let error,
                hint
            if(obj) {
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
            }else{
                error = 'Адрес не найден'
                hint = 'Уточните адрес'
            }

            if(error) {
                let result = {
                    "status": "error",
                    "message": {
                        "title": hint,
                        "text": error,
                        "data": null
                    }
                }
                popup(result)
            }else{
                let bounds = obj.properties.get('boundedBy'),
                    mapState = ymaps.util.bounds.getCenterAndZoom(
                        bounds,
                        [$('#ymap').width(), $('#ymap').height()]
                    )
                return mapState
            }
        })
        
    })
}