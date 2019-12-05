class Controller{

    /**
     * 
     * @param {DOMElement} elm 
     */
    constructor(elm){
        this.App = elm;
        this.next = [
            new PersonalPresenter(this),
            new AddressPresenter(this),
            new PaymentPresenter(this),
            new SuccessPresenter(this)
        ];

        this.prevent = [];
        this.init();
    }

    init(){
        while(0 < this.next.length){
            if(this.next[0].isFillUp()){
                this.prevent.push(this.next.shift());
            }else{
                break;
            }
        }
        this.presenter = this.next.shift();
        this.render();
    }

    /**
     * @return {Boolean}
     */
    isHavePrevStep(){
        return this.prevent.length > 0;
    }

    moveToNextStep(){
        this.prevent.push(this.presenter);
        this.presenter.remove();
        this.presenter = this.next.shift();
        this.render();
    }

    moveToPrevStep(){
        this.presenter.remove();
        this.next.unshift(this.presenter);
        this.presenter = this.prevent.pop();
        this.render();
    }

    render(){
        let view = this.presenter.getView();
        if(Object.prototype.toString.call(view) === "[object Promise]"){
            view.then(data => this.App.append(data));
        }else{
            this.App.append(view);
        }         
    }

}