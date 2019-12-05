class Presenter{

    /**
     * 
     * @param {Controller} controller 
     * @param {string} name 
     */
    constructor(controller, name = ''){
        this.storage = StorageFactory.getStorage(name);
        this.fillUp = false;
        this.controller = controller;
    }

    /**
     * @return {View}
    */
    getView(){
        return this.view.getView();
    }

    /**
     * Remove view from DOM
     */
    remove(){
        this.view.remove();
    }

    /**
     * @return {Boolean}
    */
    isHavePrevStep(){
        return this.controller.isHavePrevStep();
    }

    /**
     * @return {Model}
    */
    getModel(){
        return this.model;
    }

    moveToPrevStep(){
        this.controller.moveToPrevStep();
    }

    moveToNextStep(){
        this.storage.setStorage(this.model.getValues());
        this.controller.moveToNextStep();
    }

    /**
     * disable|enable button `Next Step`
     */
    toggleNextStep(){
        this.view.toogleNextStep(this.model.validate());
    }

    /**
     * Load data from localStorage or other sources
     * @param {Object|Array} data
     */
    loadData(data){
        if(null !== data){
            this.fillUp = true;
            this.model.load(data);
        }
    }

    /**
     * Check was form fill up
     * @return {Boolean}
     */
    isFillUp(){
        return this.fillUp;
    }

}

class PersonalPresenter extends Presenter{

    /**
     * @param {Controller} controller 
     */
    constructor(controller){
        super(controller, 'personal');
        this.view = new PersonalView(this);
        this.model = new PersonalModel();
        this.loadData(this.storage.getStorage());
    }

}

class AddressPresenter extends Presenter{
    /**
     * @param {Controller} controller 
     */
    constructor(controller){
        super(controller, 'address');
        this.view = new AddressView(this);
        this.model = new AddressModel();
        this.loadData(this.storage.getStorage());
    }
}

class PaymentPresenter extends Presenter{
    /**
     * @param {Controller} controller 
     */
    constructor(controller){
        super(controller, 'payment');
        this.view = new PaymentView(this);
        this.model = new PaymentModel();
        this.loadData(this.storage.getStorage());
    }

}

class SuccessPresenter extends Presenter{
    /**
     * @param {Controller} controller 
     */    
    constructor(controller){
        super(controller, '');
        this.view = new SuccessView(this);
        this.model = new SuccessModel();
    }
}