var pool = require('./pool');
// promise
 exports.dbquery = (queryText, queryValues)=>{
    return new Promise((resolve , reject)=>{
        pool.query(queryText, queryValues)
        .then(res => {
             resolve(res) ;
        })
        .catch(err => {
            reject(err)
        })
    })
 }