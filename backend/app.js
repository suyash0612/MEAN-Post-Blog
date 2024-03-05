const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use((req , res , next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
    next();
});

app.post("/api/posts",(req,res,next)=>{
    const post = req.body; // added by body-parser
    console.log(post);
    res.status(201).json({
        message:'post added successfully'
    });
});

app.use('/api/posts',(request , response, next )=>{
    const posts = [{
        id:'34f32f',
        title:'First server-side post',
        content:'This is coming from server'
    },
    {
        id:'fvbfdb8r',
        title:'Second server-side post',
        content:'This is coming from server!'
    }
    ];
    return response.status(200).json({
        message : 'Posts fetched successfully',
        posts : posts
    });
});

module.exports = app;