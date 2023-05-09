//  here all the queries to be in one place 
exports.queryList={
   
    GET_STORE_LIST_QUERY :'SELECT STORE_ID,STORE_NAME , STORE_CODE, STORE_ADDRESS FROM BMG.STORE;',
   
    SAVE_STORE_QUERY : 'INSERT INTO BMG.STORE (STORE_NAME , STORE_CODE, STORE_ADDRESS , CREATES_BY, CREATED_AT )VALUES($1, $2, $3, $4, $5);',
  
    GET_BOOK_LIST_QUERY :'SELECT book_id, book_title, book_author, book_publisher, book_pages FROM bmg.books;', 
  
    GET_BOOK_DETAILS_QUERY:`
    SELECT BOOK_ID, BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES , BOOK_DESCRIPTION , BOOKS.STORE_CODE  , STORE.STORE_NAME , STORE.STORE_ADDRESS  
    FROM BMG.BOOKS 
    INNER JOIN BMG.STORE  ON BMG.BOOKS.STORE_CODE  = BMG.STORE.STORE_CODE 
        WHERE BOOK_ID  = $1;
    ` ,
    SAVE_Book_QUERY:`
    INSERT INTO BMG.BOOKS
    (BOOK_TITLE, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, STORE_CODE, BOOK_DESCRIPTION, CREATES_BY, CREATED_AT)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8);
    ` ,
    UPDATE_Book_QUERY: `
    UPDATE BMG.BOOKS
    SET BOOK_TITLE=$1, BOOK_AUTHOR=$2, BOOK_PUBLISHER=$3, BOOK_PAGES=$4, STORE_CODE=$5, BOOK_DESCRIPTION=$6, CREATES_BY=$7, CREATED_AT=$8
    WHERE BOOK_ID=$9;
    ` ,
    DELETE_Book_QUERY: `DELETE FROM BMG.BOOKS WHERE BOOK_ID=$1;
    `
}