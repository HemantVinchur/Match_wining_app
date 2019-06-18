const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const MongoClient = mongodb.MongoClient
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'myproject1';
const client = new MongoClient(url);

let app = express()
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(_dirname,'signup.html'))
        })

 app.get('/login.html', (req, res) => {
            res.sendFile(path.join(_dirname,'login.html'))
                })
        
client.connect((error) => {
     console.log('123')
     console.log(error)
    if (error) return process.exit(1)
    console.log('sucessful');
    const db = client.db(dbName);
    console.log("Connect executed");


app.get('/accounts', (req, res) => {
    db.collection('accounts')
        .find({}, { sort: { _id: -1 } })
        .toArray((error, accounts) => {
            if (error) return next(error)
            res.send(accounts)
            client.close();
        })
})

app.post('/accounts', (req, res, next) => {
    let newAccount = req.body
    db.collection('accounts').insert(newAccount, (error, results) => {
        console.log("Post executed");
        if (error) return next(error)
        res.send(results)
        client.close();
    })
})

app.post('/login',(req,res)=>{
    db.collection('accounts').findOne({ mail: req.body.mail}, function(err, user){
        console.log("000000000000000000000");
        console.log(user);
        console.log(user.mail);
              if(user.mail===null){
                console.log("11111111111111111111");
                res.send("Login invalid");
             }if (user.mail === req.body.mail && user.password === req.body.password){
                res.send("Successful login")
           } else {
             console.log("Credentials wrong");
             res.send("Login invalid");
           }
    })
  })

app.put('/accounts/:id', (req, res) => {
    db.collection('accounts')
        .update({ _id: mongodb.ObjectID(req.params.id) },
            { $set: req.body },
            (error, results) => {
                if (error) return next(error)
                res.send(results)
                client.close();
            }
        )
})

app.delete('/accounts/:id', (req, res) => {
    db.collection('accounts')
        .remove({ _id: mongodb.ObjectID(req.params.id) }, (error, results) => {
            if (error) return next(error)
            res.send(results)
            client.close();
        })
})
})
app.use(errorhandler())
app.listen(4000)
