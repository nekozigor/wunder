class Form{

    /**
     * 
     * @param {Presenter} presenter
     */
    constructor(presenter){
        this.fragment = new DocumentFragment();
        this.presenter = presenter;
    }

    /**
     * @return {From}
     */
    getForm(){
        if(typeof this.form !== 'undefined'){
            return this.form;
        }
        (this.presenter.isHavePrevStep()) && this.fragment.append(this.createPrevStepButton());
        this.fragment.append(this.createNextStepButton());
        this.form = document.createElement('form');
        this.form.append(this.fragment);
        return this.form;
    }

    /**
     * @return {DOMElement}
     */
    createPrevStepButton(){
        return this.createButton('Prev Step', this.presenter.moveToPrevStep.bind(this.presenter));
    }

    /**
     * @return {DOMElement}
     */
    createNextStepButton(){
        this.nextStep = this.createButton('Next Step', this.presenter.moveToNextStep.bind(this.presenter));
        this.nextStep.disabled = !this.presenter.isFillUp();
        return this.nextStep;
    }

    /**
     * @param {string} text
     * @param {function} callback
     * @return {DOMElement}
     */
    createButton(text, callback){
        let button = document.createElement('button');
        button.onclick = function(e){
            e.preventDefault();
            callback();
        }
        button.innerHTML = text;
        return button;
    }

    /**
     * Create input <div><span|error/><label/><input/></div>
     * @param {string} attrName 
     */
    addField(attrName){
        let div = document.createElement('div');
        let errorElement = this.createError(attrName);
        div.append(errorElement);
        div.append(this.createLabel(attrName));
        div.append(this.createInputText(attrName, errorElement));
        this.fragment.append(div);
    }

    /**
     * @param {string} attrName
     * @return {DOMElement}
     */
    createLabel(attrName){
        let label = document.createElement('label');
        label.innerText = this.presenter.getModel().getAttribute(attrName).title;
        label.setAttribute('for', attrName);
        return label;
    }

    /**
     * @param {string} attrName
     * @return {DOMElement}
     */
    createError(attrName){
        let errorMessage = this.presenter.getModel().getErrorMessage(attrName);
        let span = document.createElement('span');
        span.className = 'error';
        if(errorMessage !== null){
            span.innerText = errorMessage;
        }
        return span;
    }

    /**
     * @param {string} attrName
     * @return {DOMElement}
     */
    createInputText(attrName, errorElement){
        let input =  document.createElement('input');
        let presenter = this.presenter;
        input.value = presenter.model.getAttribute(attrName).value;
        input.addEventListener('change', function (e) {
            let error = presenter.getModel().getErrorMessage(attrName);
            if(null !== error){
                errorElement.innerText = error;
            }else{
                errorElement.innerText = '';
            }
        });

        input.addEventListener('keyup', function(e){
            this.value = presenter.getModel().filtering(attrName, this.value);
            presenter.getModel().getAttribute(attrName).value = this.value;
            presenter.toggleNextStep();
        });

        input.setAttribute('id', attrName);
        return input;
    }

    /**
     * @param {Boolean} enable 
     */
    toogleNextStep(enable){
        this.nextStep.disabled = !enable;
    }
}