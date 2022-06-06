const client = require('./connection.js')
const express = require('express');

const app = express();

app.listen(3300, () => {
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/users', (req, res) => {
    client.query(`Select * from users`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res) => {
    client.query(`Select * from users where id=${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})
// client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/users', (req, res) => {
    const user = req.body;
    let insertQuery = `insert into users(id, first_name, last_name, location) 
                       values(${user.id}, '${user.first_name}', '${user.last_name}', '${user.location}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})
app.put('/users', async (req, res) => {
    let user = req.body;
    let findUser;
    let findUserQuery = `select * from users where id =${user.id}`
    client.query(findUserQuery, (err, result) => {
        if (!err) {
            findUser = result.rows[0];
            console.log(findUser)
        }
        else { console.log(err.message) }
    })
    client.end;
    console.log(findUser)


    let updateQuery = `update users
                       set first_name = '${user.first_name}',
                       last_name = '${user.last_name}',
                       location = '${user.location}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.delete('/users/:id', (req, res) => {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})