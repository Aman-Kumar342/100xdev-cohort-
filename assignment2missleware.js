//  q2. create a middle ware that count the total  umber of request sent to a server . Also create an endpoint that exposes it 
const express=require("express");
const app=express()
let reqct=0;
function countmiddleware(req,res,next){
    reqct++;
    console.log("the total count is " + reqct);
    next();
}
app.use(countmiddleware);
app.get("/sum",function(req,res){
    const a=parseInt(req.query.a);
    const b= parseInt(req.query.b);
    res.json({
        ans: a+b

    });
});
app.get("/multiply", function(req,res){
    const a=parseInt(req.query.a);
    const b= parseInt(req.query.b);
    res.json({
        ans: a*b

    });
});
app.get("/request-count", function (req, res) {
    res.json({
        totalRequests: reqct
    });
});
app.listen(3000);