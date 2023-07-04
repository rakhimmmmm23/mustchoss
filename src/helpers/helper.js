export const formatTel = function(tel) {
    let what = [' ', '-', '(', ')', '-', '-']
    for (const del in what) {
        tel = tel.replace(what[del], '')
    }
    return tel
}

export const isEmpty = function(value) {
    switch (typeof(value)) {
        case 'string': return (value.length === 0);
        case 'number':
        case 'boolean': return false;
        case 'undefined': return true;
        case 'object': return !value ? true : false; // handling for null.
        default: return !value ? true : false
    }
}

export const isFilled = function(value) {
    let resArray
    if(Array.isArray(value)){
        // is array
        resArray = value
        value = 'array'
    }
    switch (value) {
        case 'array':
            if(resArray.length != 0) {
                return true
            }else{
                return false
            }
        case null:
            return false
        case '':
            return false
        default:
            return true
    }
    // return value
}

export const isDisabled = function(data) {
    let dis = true,
        phone
    if(Array.isArray(data)){
        // is array
        dis = data.some(function(i) {
            return i === null
        })
        if(!dis){
            data.forEach(item => {
                phone = item.substring(0,4)
                if(phone === '+7 ('){
                    // это телефон
                    if(item.length === 18) {
                        dis = false
                    }else{
                        dis = true
                    }
                }else{
                    dis = false
                }
            })
        }
    }else{
        // is var
        if(!isEmpty(data)){
            phone = data.substring(0,4)
            if(phone === '+7 ('){
                // это телефон
                if(data.length === 18) {
                    dis = false
                }
            }else{
                dis = false
            }
        }
    }

    return dis
}

export const checkPassword = function(data) {
    let disabled = true
    if(!isEmpty(data.pwd) && !isEmpty(data.pwd2)){
        if(data.pwd === data.pwd2){
            disabled = false
        }
    }
    return disabled
}

export const pwdMatch = function(data) {
    let error = true
    if(!isEmpty(data.pwd) && !isEmpty(data.pwd2)){
        if(data.pwd.length === data.pwd2.length){
            if(data.pwd === data.pwd2){
                error = false
            }
        }else{
            if(data.pwd.length > data.pwd2.length){
                error = false
            }
        }
    }else{
        error = false
    }
    return error
}

export const butynum = function(data) {
    let num = data.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    return num
}