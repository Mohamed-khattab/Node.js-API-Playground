
var generator = require('../util/generator');
var memStorage = require('../util/memory.storage') ;
var model = require('../model/node.model') ;

exports.getAllNotes =  (req , res)=>{
    // var seqId = generator.generate();
    // memStorage.store.setItem(seqId ,"first note ");

    var keys = memStorage.getKeys(memStorage.store) ;
    var values = memStorage.getValues(memStorage.store) ;
    console.log("values " + JSON.stringify(values));
    return res.status(201).send(values)

    // const response = {id : 12 , notes:'hello form zamarkand' }
    // res.send("get all notes --------keys----"+JSON.stringify(keys));
    // res.status(200).send(response);
}
exports.saveNotes =  (req , res)=>{
    // get the params found in body and save it in a vew obj  from omdel 
    var seqId = generator.generate();
    var title = req.body.title; 
    var content = req.body.content ;
    // var createdBy = req.body.createdBy; 
    // var createdOn = reg.body.createdOn ;

    var createdBy ='admin' ; 
    var createdOn = new Date();
    console.log('title:', title, 'content:', content);
    if(!title  || !content){
      return res.status(500).send({error : 'title and content cannot me empty'});
    }
    // create obj
    var Note = model.Note ;
    var noteObj = new Note(seqId,title,content,createdBy, createdOn)
    memStorage.store.setItem(seqId , noteObj)
    return res.status(201).send('saved succdesfully ');
}
exports.updateNote =  (req , res)=>{
    var createdBy ='admin' ; 
    var createdOn = new Date();

    //req body 

    var noteId = req.body.noteId;
    var title = req.body.title; 
    var content = req.body.content ;
    // validation 
    console.log(noteId);
    if(!noteId){
        return res.status(500).send({error : 'noteID cannot me empty'});
      }
     var noteItem = memStorage.store.getItem(noteId);
     if(!noteItem){
        return res.status(500).send({error : 'note ID is not valid '});
     }
    if(!title  || !content){
      return res.status(500).send({error : 'title and content cannot me empty'});
    }
    // create obj
    var Note = model.Note ;
    var noteObj = new Note(noteId,title,content,createdBy, createdOn)
    memStorage.store.setItem(noteId , noteObj)
    return res.status(200).send('updated succdesfully ');
    // modified has a 200 status code 
}

exports.deleteNotes =  (req , res)=>{
    var noteId = req.params.noteId ; 
    if(!noteId){
        return res.status(500).send({error : 'noteID cannot me empty'});
    }
    var noteItem = memStorage.store.getItem(noteId);
    if(!noteItem){
       return res.status(500).send({error : 'note ID is not valid '});
    }
    memStorage.store.removeItem(noteId);
    res.send("removed successfully");
}