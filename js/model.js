class Model{

    constructor(){
         this.validator = new Validate;
         this.filter = new Filter;
         this.errors = {};
    }

    /**
     * @return {Object|Array}
     */
    getAttributes(){
        return this.attributes;
    }

    /**
     * @return {Object|Array}
     */
    getAttribute(key){
        return this.attributes[key];
    }

    /**
     * @return {string}
     */
    getValues(){
        let values = {};
        for(let x in this.attributes){
            values[x] = this.attributes[x].value;
        }
        return values;
    }

    /**
     * @return {string}
     */
    getErrorMessage(attr){
        if(typeof this.errors[attr] !== 'undefined'){
            return this.errors[attr];
        }
        return null;
    }

    /**
     * @return {Boolean}
     */
    hasError(){
        return Object.keys(this.errors).length === 0;
    }

    /**
     * Filtering a input data
     * @return {string}
     */
    filtering(attr, value){
        let filteres = this.attributes[attr].filter;
        for(let x in filteres){
            value = filteres[x].method(value);
        }
        
        return value;
    }

    /**
     * Validate a form
     * @return {Boolean}
     */
    validate(){
        this.errors = [];
        for(let x in this.attributes){
            this.validateAttr(x);
        }
        return this.hasError();
    }   

    /**
     * Validate a input data
     * @return {string}
     */
    validateAttr(attr){
        let validates = this.attributes[attr].validate;
        for(let x in validates){
            if(!validates[x].method(this.attributes[attr].value)){
                this.errors[attr] = validates[x].message;
            }
        }
        return this.errors[attr];
    }

    /**
     * @param {Object|Array} data 
     */
    load(data){
        for(let x in data){
            this.attributes[x].value = data[x];
        }
    }
}

class PersonalModel extends Model {
               
    attributes = {
        firstname: {
            value: '',
            title: 'Firstname',
            validate: [
                {
                    method: this.validator.required,
                    message: 'This field is required'
                }
            ],
        },
        lastname: {
            value: '',
            title: 'Lastname'
        },
        telephone: {
            value: '',
            title: 'Telephone',
            filter: [
                {
                    method: this.filter.phone
                }
            ]
        }
    }

}

class AddressModel extends Model {

    attributes = {
        address : {
            value: '',
            title: 'Address',
            validate: [
                {
                    method: this.validator.required,
                    message: 'This field is required'
                }
            ],
        },
        houseNumber: {
            value: '',
            title: 'House Number'
        },
        zip: {
            value: '',
            title: 'Zip Code'
        },
        city: {
            value: '',
            title: 'City'
        }
    }
}

class PaymentModel extends Model{

    attributes = {
        account: {
            value: '',
            title: 'Account Owner',
            validate: [
                {
                    method: this.validator.required,
                    message: 'This field is required'
                }
            ],
        },
        iban: {
            value: '',
            title: 'IBAN',
            validate: [
                {
                    method: this.validator.required,
                    message: 'This field is required'
                }
            ],
        }
    }
}

class SuccessModel extends Model{

    attributes = {
        paymentDataId: {
            value: '',
            validate: [
                {
                    method: this.validator.required,
                    message: 'This field is required'
                }
            ],
        }
    }
}

