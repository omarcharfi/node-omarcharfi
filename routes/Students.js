const express = require('express');
var Student = require('../models/Student.js')

const router = express.Router();

router.post('/' , (req,res,next)=>{
    let student = new Student({name: req.body.name , age :req.body.age , classe : req.body.classe , note: req.body.note})
    student.save((err,newstudent)=>{
        if(err){
            console.log('errooooor')
        }else{
            res.json(newstudent);
            console.log("added")
        }
    })
})

router.get('/', async(req, res ,next)=>{
     try{
         await  Student.find({})
         .then(result=>{
             res.send(result)
         return result ;
         
         })
     }
     catch(err){
          console.log(err)
     }
  
 })

 router.delete('/delete/:id', async(req,res)=>{
    try {
        await Student.findOneAndDelete(
            {id:req.params.id}
            );
        res.send("deleted ! ")
        
    } catch (err) {
        res.send(err);
        
    }
    
    })


    router.put('/update/:id',async(req,res)=>{
        try {
            await Student.findOneAndUpdate(
                     {id:req.params.id},
                     {name :req.body.name , age:req.body.age , classe: req.body.classe, note:req.body.note},
                     );
                  
            res.send('Updateeed !! ')
            
        } catch (err) {
            res.send(err);
            
        }
    })

    router.get('/findbyname/:name',function(req,res){
        Student.findOne({name:req.params.name})
        .then(resutl=>{
            if(!resutl){return res.status(404).end();}
            return res.status(200).json(resutl)
        })
    })

    router.get('/age',function(req,res){
         
        Student.find({age:{$gt : 18}}).then(result=>{
            if(!result){return res.status(404).end()}
            return res.status(200).json(result)
        })
        
    })




    router.put('/updateNote' ,async(req,res)=>{
        try {
        Student.find({classe:"4twin5"}).then(result=>{
            result.map(student=>{
                student.note+=2 
                student.save()
            }
                )
        })
        res.send('done!!')
    } catch (err) {
        res.send(err);
    }})

router.delete('/deleteage', async(req,res)=>{
    try {
        await Student.find({age:{$lt : 18}}).then(
            result=>{
                result.map(student=>{
                    Student.findOneAndDelete( {id:student.id})
                })
            }
        );
        
        
    } catch (err) {
        res.send(err);
        
    }})

 module.exports= router 