class View{

    /**
     * 
     * @param {Presenter} presenter 
     */
    constructor(presenter){
        this.presenter = presenter;
        this.form = new Form(this.presenter);
    }

    /**
     * @return {View}
     */
    getView() {
        return this.addFormField().getForm();
    }

    /**
     * Remove form from DOM
     */
    remove(){
        this.form.getForm().remove();
    }

    /**
     * @return {Form}
     */
    addFormField(){
        let attr = this.presenter.getModel().getAttributes();
        for(let x in attr){
            this.form.addField(x);
        }
        return this.form;
    }

    /**
     * @param {Boolean} enable 
     */
    toogleNextStep(enable){
        this.form.toogleNextStep(enable);
    }
}

class PersonalView extends View{

}

class AddressView extends View {

}

class PaymentView extends View {

}

class SuccessView{

    /**
     * View for success
     * @param {string} paymentDataId 
     */
    success(paymentDataId){
        return `Success message! PaymentDataId = ${paymentDataId}!`; 
    }

    /**
     * View for error
     */
    error(){
        return 'Error';
    }

    async getView(){
        let storages = StorageFactory.storages;
        let data = {};
        for(let x in storages){
            data = Object.assign(data, storages[x].getStorage());
        }

        let response = await fetch('/api.php', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        response = await response.json();
        
        if(typeof response.paymentDataId !== 'undefined'){
            return this.success(response.paymentDataId);
        }else{
            return this.error();
        }
    }
}