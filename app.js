

const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.json())

app.get('/tasks', (req, res) =>fs.readFile('./data.json','utf-8',(err,data)=>{
  if(err){
       res.status(500).send()
  }else{
      res.send(JSON.parse(data) )
  }
})) 

const findAccount = async (req,res)=>{
    const id = req.params.id
    const file = await asyncReadFile('./data.json')
    const accounts = JSON.parse(file).filter((item,index,array)=>item.id==id);
    res.send(accounts)
   // console.log(id)
//    if(accounts.filter(v=>v.id===id).length!=0){
//     res.status(400).send()
//    }else{
//     accounts.push(newAccount)
//     await asyncWritfile(JSON.stringify(accounts),'./data.json')
//     res.status(201).send(accounts)
//    }

}

app.get('/tasks/:id',findAccount)

deleteAccount = async (req,res)=>{
    const id = req.params.id
    const file = await asyncReadFile('./data.json')
    const accounts = JSON.parse(file).filter((item,index,array)=>item.id!=id);
    await asyncWritfile(JSON.stringify(accounts),'./data.json')
}

app.delete('/tasks/:id',deleteAccount)

const asyncWritfile = function(string,path){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,string,function(err){
            reject(err)
        })
    }).catch(err=>{
        return err
    })
}

asyncReadFile  = function(path){
    return new Promise(
        function(resolve,reject){
           fs.readFile(path,'utf-8',function(err,data) {
               if(err){
                   reject(err)
               }
               resolve(data)
           })
        }).catch(err=>{
          return err
        })
}

const createAccount = async (req,res)=>{
     const newAccount  = req.body
     const file = await asyncReadFile('./data.json')
     const accounts = JSON.parse(file)
     if(accounts.filter(v=>v.id===newAccount.id).length!=0){
         res.status(400).send()
     }else{
         accounts.push(newAccount)
         await asyncWritfile(JSON.stringify(accounts),'./data.json')
         res.status(201).send(accounts)
     }
}

app.post('/tasks',createAccount)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

exports.app = app