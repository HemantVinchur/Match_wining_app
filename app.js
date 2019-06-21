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

try{
app.get('/accounts', (req, res, next) => {
    db.collection('accounts')
        .find({}, { sort: { _id: -1 } })
        .toArray((error, accounts) => {
            if (error){
                 return res.json({
                     statusCode: 400,
                     message:"User not found",
                     data: {}
                 })
                }
            return res.contentType("json").json({
                statusCode: 200,
                message: "User",
                data: {results}
            })
        })
})
}catch (err){
             console.log(err);
}
try{
app.post('/addTeam', (req, res, next) => {
    let newAccount = req.body
    db.collection('prediction_table').insert(newAccount, (error, results) => {
        console.log("add executed");
        if (error){
            return res.json({
                statusCode: 400,
                message:"User not found",
                data: {}
            })
           }
       return res.contentType("json").json({
           statusCode: 200,
           message: "User",
           data: {results}
       })
   })
})
}catch (err){
        console.log(err);
}
try{
app.post('/accounts', (req, res, next) => {
    let newAccount = req.body
    db.collection('accounts').insert(newAccount, (error, results) => {
        console.log("Post executed");
        if (error){
            return res.json({
                statusCode: 400,
                message:"User not found",
                data: {}
            })
           }
       return res.contentType("json").json({
           statusCode: 200,
           message: "Success",
           data: {results}
       })
   })
})
}catch (err){
        console.log(err);
}try{
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
           }if (user.mail != req.body.mail && user.password != req.body.password){
            res.send("Successful login")
       }       if (error){
        return res.json({
            statusCode: 400,
            message:"User not found",
            data: {}
        })
       }
   return res.contentType("json").json({
       statusCode: 200,
       message: "Success",
       data: {results}
   })
})
})
}catch (err){
    console.log(err);
}try{
  app.post('/addMatch', (req, res, next) => {
    let newAccount = req.body
    db.collection('prediction_table').insert(newAccount, (error, results) => {
        console.log("Post executed");
        if (error){
            return res.json({
                statusCode: 400,
                message:"User not found",
                data: {}
            })
           }
       return res.contentType("json").json({
           statusCode: 200,
           message: "Success",
           data: {results}
       })
    })
    })
    }catch (err){
        console.log(err);
    }
    try{
app.put('/addVote/:id/:teamName', (req, res, next) => {
    // db.collection('prediction_table')
    //     .update({ id: mongodb.ObjectID(req.params.id),
    //               "teams.name":req.params.teamName},
    //     {
    //         $inc: { "teams.$.votes": 1 },
    //     },
            
    //         //{ upsert: true },
    //         (error, results) => {
    //             if (error){
    //                 return res.json({
    //                     statusCode: 400,
    //                     message:"User not found",
    //                     data: {}
    //                 })
    //                }
    //            return res.contentType("json").json({
    //                statusCode: 200,
    //                message: "Success",
    //                data: {results}
    //            })
    //         })
    //         })
    //         }catch (err){
    //             console.log(err);
    //         }

    db.collection('prediction_table')
           .update(
               {
                   _id: mongodb.ObjectID(req.params.id),
                   "teams.name": req.params.teamName
               },
               {
                   $inc: {
                       "teams.$.vote": 1
                   }
               },
               (error, results) => {
                   if (error){
                    return res.json({
                        statusCode: 400,
                        message:"User not found",
                        data: {}
                    })
                   }
               return res.contentType("json").json({
                   statusCode: 200,
                   message: "Success",
                   data: {results}
               })
            })
            })
            }catch (err){
                console.log(err);
            }

app.delete('/accounts/:id', (req, res) => {
    db.collection('accounts')
        .remove({ _id: mongodb.ObjectID(req.params.id) }, (error, results) => {
            if (error){
                return res.json({
                    statusCode: 400,
                    message:"User not found",
                    data: {}
                })
               }
           return res.contentType("json").json({
               statusCode: 200,
               message: "Success",
               data: {results}
           })
        })
        })
    })
app.use(errorhandler())
app.listen(7000)