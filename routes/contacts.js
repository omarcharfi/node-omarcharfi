const express = require('express');
var Contact = require('../models/contact.js')

const router = express.Router();



router.post('/' , (req,res,next)=>{
    let contact = new Contact({fullname: req.body.contactName , phone :req.body.contactNumber })
    contact.save((err,newContact)=>{
        if(err){
            console.log('errooooor')
        }else{
            res.json(newContact);
            console.log("added")
        }
    })
})

router.get('/', async(req, res ,next)=>{
   /* Contact.find(
    (err, contacts) => {
    res.render(
    '../views/form.twig',
    { title : "Contact list", cont : contacts
    }
    );
    }
    )*/



    try{
        await  Contact.find({})
        .then(result=>{
            res.render('../views/form.twig', { title : "Contact list", cont : result
        })
        console.log(result)
        })
    }
    catch(err){
         console.log(err)
    }
 
})

router.delete('/delete/:id', async(req,res)=>{
    try {
        await Contact.findOneAndDelete(
            {id:req.params.id}
            );
        res.send("deleted ! ")
        
    } catch (err) {
        res.send(err);
        
    }
    
    })
    router.put('/update/:id',async(req,res)=>{
        try {
            await Contact.findOneAndUpdate(
                     {id:req.params.id},
                     {fullName :req.body.fullName},
                     );
                  
            res.send('Updateeed !! ')
            
        } catch (err) {
            res.send(err);
            
        }
    })
    router.get('/findbyid/:id',function(req,res){
        Contact.findById(req.params.id).then(resutl=>{
            if(!resutl){return res.status(404).end();}
            return res.status(200).json(resutl)
        })
    })
    

module.exports= router 