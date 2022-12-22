const showdown = require('showdown');
const express = require('express')
const markdownpdf=require("markdown-pdf");
const fs=require('fs');
const app = express();
const converter = new showdown.Converter();
//利用fs讀檔
fs.readFile('./marktest/demo.md','utf-8',function(err,data){
    if(err){
        console.log("出錯")
        return
    } //偵錯
    html = converter.makeHtml(data);//md轉乘html格式 
    //利用fs寫入index.html
    fs.writeFile("./index.html",html,function(err,data){
        if(err){
            console.log(err);
        return;
        }//寫入的偵錯
    })
})
markdownpdf().from('./marktest/demo.md').to("./markd.pdf",function(err,data){
    if(err){
        console.log(err);
        return;
    }
    console.log('done');
});
app.get("/",(req,res)=>{
    fs.readFile("./index.html",function(err,data){
        if(err){
        console.log("讀檔出錯");
        }
        res.send(data.toString());
        res.end()
    })

})
app.listen(8000,()=>{
    console.log("Server is running on 8000")
})