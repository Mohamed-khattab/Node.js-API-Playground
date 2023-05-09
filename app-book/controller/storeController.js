// var model = require('../model/storeModel') ;
var queries = require('../DataBase/queries'); 
var dbConnection = require('../DataBase/connection') ;
var util  = require('../util/utility') ;

exports.getStoreList = async  (req , res)=>{
    try {
        
       var storeListQuery = queries.queryList.GET_STORE_LIST_QUERY;
       var result = await dbConnection.dbquery(storeListQuery);// blocking here , we need to make it non 
       return res.status(200).send(JSON.stringify(result.rows)) ; 
    } catch (err) {
        console.log('Error : '+err)
        return res.status(500).send({error : 'Falid to list store'}) ;
    }
}

exports.saveStore =  async (req , res)=>{
    // get the params found in body and save it in a vew obj  from omdel 
    try {
        var createdBy ='admin' ; 
        var createdAt = new Date();
        var storeName  = req.body.storeName; 
        var storeAddress = req.body.storeAddress ; 
        var storeCode = util.generateStoreCode() ; 

        console.log(storeAddress +'         ' + storeName);
        if(!storeName  || !storeAddress){
        return res.status(500).send({error : 'address and store name  cannot be empty'});
        }
        values = [storeName , storeCode , storeAddress , createdBy , createdAt];
       
        var saveStoreQuery = queries.queryList.SAVE_STORE_QUERY;
        await dbConnection.dbquery(saveStoreQuery , values);

        return res.status(201).send('successfully store saved');
    } catch (error) {
         console.log('Error : '+ error);   
         return res.status(500).send({error : 'Faild to save store '}); 
    }
}














