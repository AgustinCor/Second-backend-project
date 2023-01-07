const express =require("express");
const db=require ("./utils/database");
const initModels =require("./models/initModels");
const Users = require("./models/users.models");
const Tasks=require("./models/tasks.models");

const app=express();

app.use(express.json())

const PORT = 8000;

initModels();

db.authenticate()
.then(() => console.log("Autentiacion exitosa"))
 .catch((error) => console.log(error));

db.sync({alter:false})
  .then(()=> console.log("Sincronizacion exitosa"))
  .catch((error)=> console.log(error));
app.get('/',(req,res) => {
  res.status(200).json({message :"Bienvenido al server"});
});

app.get('/users',async (req,res) =>{
    try{
      const result = await Users.findAll(); //SELECT * FROM users;       
      res.status(200).json(result);
    }catch(error){
      console.log(error);
    }    
})

//Obtener el user por id:
app.get("/users/:id",async (req,res) =>{
  try{
    const {id}=req.params;
    const result =await Users.findByPk(id);
    res.status(200).json(result);
  }catch(error){
    console.log(error);
  }

})

//obtener por username
app.get("/users/username/:username",async(req,res)=>{
  try {
     const {username} =req.params;
     const result= await Users.findOne({where: { username } });
     res.status(200).json(result);
  }catch(error){
    console.log(error);
  }
});

app.post("/users",async (req,res)=>{
  try{
    const user=req.body;
    const result =await Users.create(user)
    res.status(200).json(result);
  }catch(error){
    res.status(400).json(error.message)
    console.log(error);
  }
});

app.put("/users/:id",async(req,res)=>{
  try{
  const {id} =req.params;
  const field =req.body;
  const result = Users.update(field,{
    where :{id}
  });
  res.status(200).json(result);
 }catch (error){
   res.status(400).json(error.message);
 }
});

app.delete("/users/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const result =Users.destroy({
       where:{id}
    });
    res.status(200).json(result);
  }catch(error){
    res.status(400).json(error.message);
  }
});

///////////////////////////////////////////////////////// todos/tasks:

app.get("/tasks",async(req,res) =>{
  try{
    const result =await Tasks.findAll();
    res.status(200).json(result);
  }catch(error){
    console.log(error);
  }
});

app.get("/tasks/:id",async(req,res) =>{
  try{
     const {id} =req.params;
     const result =await Tasks.findByPk(id);
     res.status(200).json(result);
  }catch(error){
    console.log(error);
  }
});

app.post("/tasks",async(req,res) =>{
  try{
    const task=req.body;
    const result=await Tasks.create(task);
    res.status(200).json(result);
  }catch(error){
    res.status(400).json(error.message);
  }
});

app.put("/tasks/:id",async(req,res) =>{
  try{
     const {id} =req.params;
     const field=req.body;
     const result=await Tasks.update(field,{
       where: {id}
      });
      res.status(200).json(result);
    }catch(error){
      res.status(400).json(error.message);
    }
});

app.delete("/tasks/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const result =await Tasks.destroy({where:{id}});
    res.status(200).json(result);
  }catch(error){
    res.status(400).json(error.message);
  }
});

app.listen(PORT, () =>{
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});