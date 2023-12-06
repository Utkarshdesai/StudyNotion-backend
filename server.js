const express = require('express')
const app = express() 

app.listen(4500 , ()=>{
    console.log('server is started') 
})

app.get('/' , (req,res)=>{
    res.send("<h1> welcome to day 3 afternoon </h1>")
})

