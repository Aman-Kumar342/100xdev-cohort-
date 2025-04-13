// create a middle ware function that logs each incoming requests HTTP method, url,and timestamp to the console 
//  q2. create a middle ware that count the total  umber of request sent to a server . Also create an endpoint that exposes it 

const express =require("express")
const app=express()

function loggermiddleware(req,res,next){
    console.log("Method is "+ req.method);
    console.log("url host is " + req.url);
    console.log(new Date());

    next();
}
app.use(loggermiddleware);

app.get("/sum",function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans:a+b
    })

});
app.get("/multiply",function(req,res){
    const a=req.query.a;
    const b= req.query.b;
    res.json({
        ans: a*b
    })

});

app.get("divide", function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        ans: a/b
    })
});
app.listen(3000);