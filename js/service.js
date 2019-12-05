class StorageFactory{

    static storages = {};

    /**
     * Get storages collection
     * @param {string} name
     * @return {Object|Array}
     */
    static getStorage(name){
        this.storages[name] = new StorageService(name);
        return this.storages[name];
    }

    /**
     * Clear localStorages
    */
    static clearStorage(){
        for(let x in this.storages){
            this.storages[x].clearStorage();
        }
    }

}

class StorageService{

    /**
     * @param {string} name
    */
    constructor(name){
        this.name = name;
    }

    /**
     * Set localStorage
    */
    setStorage(arr){
        localStorage.setItem(this.name, JSON.stringify(arr));
    }

    /**
     * Get localStorage
    */
    getStorage(){
        return JSON.parse(localStorage.getItem(this.name));
    }

    /**
     * Clear localStorage
    */
    clearStorage(){
        localStorage.removeItem(this.name);
    }

}