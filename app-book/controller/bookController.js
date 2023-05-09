// var model = require('../model/storeModel') ;
var queries = require('../DataBase/queries'); 
var dbConnection = require('../DataBase/connection') ;
var util  = require('../util/utility') ;



exports.getBookList = async  (req , res)=>{
    try {
        
       var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
       var result = await dbConnection.dbquery(bookListQuery);// blocking here , we need to make it non 
       return res.status(200).send(JSON.stringify(result.rows)) ; 
    } catch (err) {
        console.log('Error : '+err)
        return res.status(500).send({error : 'Falid to list books'}) ;
    }
}

exports.getBookDetails = async  (req , res)=>{
    try {
       var bookId = req.params.bookId; 
       var bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
       var result = await dbConnection.dbquery(bookDetailsQuery , [bookId]);// blocking here , we need to make it non 
       return res.status(200).send(JSON.stringify(result.rows[0])) ; 
    } catch (err) {
        console.log('Error : '+err)
        return res.status(500).send({error : 'Falid to get books details '}) ;
    }
}


exports.saveBook =  async (req , res)=>{
    // get the params found in body and save it in a vew obj  from omdel 
    try {
        var createdBy ='admin' ; 
        var createdAt = new Date();

        var title  = req.body.title; 
        var description = req.body.description ;
        var author = req.body.author ;
        var publisher = req.body.publisher ;
        var pages = req.body.pages ;
        
        var storeCode = req.body.storeCode; 

        if(!title|| !author ||!publisher || !storeCode){
        return res.status(500).send({error : ' book attributes cannot be empty'});
        }
        values = [title , author, publisher , pages ,storeCode, description  , createdBy , createdAt];
       
        var saveBookQuery = queries.queryList.SAVE_Book_QUERY;
        await dbConnection.dbquery(saveBookQuery , values);

        return res.status(201).send('successfully  adding new book ');
    } catch (error) {
         console.log('Error : '+ error);   
         return res.status(500).send({error : 'Faild to add new book  '}); 
    }
}





exports.updateBook =  async (req , res)=>{
    // get the params found in body and save it in a vew obj  from omdel 
    try {
        var createdBy ='admin' ; 
        var createdAt = new Date();
        var bookId = req.body.bookId ; 

        var title  = req.body.title; 
        var description = req.body.description ;
        var author = req.body.author ;
        var publisher = req.body.publisher ;
        var pages = req.body.pages ;
        var storeCode = req.body.storeCode; 

        if(!bookId || !title|| !author ||!publisher || !storeCode){
        return res.status(500).send({error : ' book attributes cannot be empty'});
        }
        values = [title , author, publisher , pages ,storeCode, description  , createdBy , createdAt , bookId];
       
        var updateBookQuery = queries.queryList.UPDATE_Book_QUERY;
        await dbConnection.dbquery(updateBookQuery , values);

        return res.status(201).send('successfully update book with title :  '+ title);
    } catch (error) {
         console.log('Error : '+ error);   
         return res.status(500).send({error : 'update book with title :  '+ title}); 
    }
}



exports.deleteBook =async (req , res)=>{
   try {
    var bookId = req.params.bookId ; 
    if(!bookId){
        return res.status(500).send({error : 'bookId cannot me empty'});
    }
    var deleteBookQuery = queries.queryList.DELETE_Book_QUERY;
    await dbConnection.dbquery(deleteBookQuery , [bookId]);
    res.send(" successfully book removed ");
} catch (error) {
        console.log('Error : '+ error);   
        return res.status(500).send({error : 'Faild to delete the book with id :   '+ bookId}); 
   }
    
}

