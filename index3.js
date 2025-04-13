const express=require("express")
const app =express()

//  creating a middle ware

let reqcount=0;
function requestInc(){
    reqcount=reqcount+1;
    console.log("Total number of request = " +reqcount);
    console.log(`total number of request={reqcount}`);

}
//  route handler 

app.get("/sum",function(req,res){
    // middle ware calling before the actual function call
   requestInc();
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        answer: a +  b
    })
})
app.get("/multiply",function(req,res){
    //  middle ware calling  before the actual funvtion call 
    requestInc();     
    const a=req.query.a;
    const b=req.query.b;
    res.json({
        answer: a * b
    })
})
app.listen(3000);