import userModel from "./models/User.js";


export default class Users {
    
    get = (params) =>{
        //* Para que corran los test
        return userModel.find(params)
        //* Para ver el error en los test y ver los datos mas completos en el navegador
        return userModel.find(params).populate("pets._id");
    }

    getBy = (params) =>{
        return userModel.findOne(params);
    }

    save = (doc) =>{
        // doc._id="001"
        // doc.color="green"
        // doc.pets=[]
        // return doc
        return userModel.create(doc);
    }

    update = (id,doc) =>{
        return userModel.findByIdAndUpdate(id,{$set:doc})
    }

    delete = (id) =>{
        return userModel.findByIdAndDelete(id);
    }
}