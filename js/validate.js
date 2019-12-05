class Validate{

    /**
     * @param {string} value
     * @return {Boolean}
     */
    required(value){
        return value !== '';
    }
}

class Filter{

    /**
     * @param {string} str
     * @return {Boolean}
     */
    phone(str){
        return str.replace(/[^\d]/, '');
    }
}