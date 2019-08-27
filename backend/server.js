import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Issue from './models/issue';
import { runInNewContext } from 'vm';
const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('MongoDB database connection established successfully!');

});

router.route('/issues').get((req,res)=>{
Issue.find((err,issues)=>{
    if(err)
        console.log(err);

    else
        res.json(issues);
    });
});

router.route('/issues/:id').get((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
        if(err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/add').post((req,res)=>{
let issue =new Issue(req.body);
issue.save()
.then(issue=>{
    res.status(200).json({'issue':'Added Successfully'});
})
.catch(err=>{
    res.status(400).send('Failed to Create new Record');
});
});

router.route('/issues/update/:id').post((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
        if(!issue)
            return next(new Error('Could Not Load Document!'));
        else {
            issue.title=req.body.title;
            issue.responsible=req.body.responsible;
            issue.description=req.body.description;
            issue.severity=req.body.severity;
            issue.status=req.body.status;

            issue.save().then(issue=>{
                res.json('Data Updated!');

            }).catch(err=>{
                res.status(400).send('Update Failed!');
            });

        }
    });
});

router.route('/issues/delete/:id').get((req,res)=>{
    Issue.findByIdAndRemove({_id:req.params.id},(err,issue)=>{
        if(err)
            res.json(err);
        else    
            res.json('Removed Successfully');
    });
});

app.use('/',router);




app.listen(4000,()=> console.log("Express running at Port 4000!"));