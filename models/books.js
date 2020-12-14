const { Pool } = require("pg");
const pool = new Pool();

console.log("pool start")


pool.on("error", (err, client) => {
  console.error("Unexpected error", err)
  process.exit(-1)
})

//returning ALL books
getAll = (cb) => {
    return pool.query("SELECT * FROM books;", (err, res) => {
        if(!err){
            cb(res.rows)
        }
        else{
            cb('error')
        }
      })
}

//returning A SINGLE book
getOne = (isbn, cb) => {
    pool.query("SELECT * FROM books WHERE isbn='"+isbn+"';", (err, res) => {
        if (!err){
            cb(res.rows[0])
        }
        else{
            cb('error')
        }
      }) 
}

postOne = (values, cb) => {
    pool.query("INSERT INTO books (isbn, name, author, release_date) VALUES ('"+ values.isbn +"', '"+ values.name +"', '"+ values.author +"', "+ values.release_date +");", (err, res) => {
        if (!err){
            cb(values)
        }
        else{
            cb('error')
        }
      }) 
}

updateOne = (isbn,values,cb) => {
    pool.query("UPDATE books SET name = '"+ values.name +"',author = '"+ values.author +"',release_date = "+ values.release_date +" WHERE isbn = '"+isbn+"'", (err, res) => {
        if (!err){
            cb(values)
        }
        else{
            cb('error')
        }
      }) 
}

deleteOne = (isbn, cb) => {
    pool.query("DELETE FROM books WHERE isbn = '" + isbn + "'", (err, res) => {
        if (!err){
            cb('success')
        }
        else{
            cb('error')
        }
      }) 
}


exports.getAll = getAll;
exports.getOne = getOne;
exports.postOne = postOne;
exports.updateOne = updateOne;
exports.deleteOne = deleteOne;

