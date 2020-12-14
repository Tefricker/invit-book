const { Pool } = require("pg");
const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: 5432,
      }
);

console.log("pool start")





pool.on("error", (err, client) => {
  process.exit(-1)
})

//Initialising table
pool.query("CREATE TABLE books (isbn VARCHAR(100), name VARCHAR(100), author VARCHAR(100),release_date integer)", (err, res) => {
})


//First data, exemple
pool.query("INSERT INTO books (isbn, name, author, release_date) VALUES ('423432JGGH', 'La carte et le territoire', 'Michel Houellebecq', 15641513);", (err, res) => {
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

