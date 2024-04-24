const express = require('express'); 
const path = require('path'); 
const ejs = require('ejs'); 
const app = express();
const User = require('./UserModel')
const bodyParser = require('body-parser'); 
app.use(express.static('./public')); 
app.use(express.json())
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{ 
res.render('index'); 
}); 

app.get("/login",(req,res)=>{ 
    res.render('login'); 
    }); 

app.get("/blog",(req,res)=>{ 
res.render('blog'); 
}); 

app.get("/about",(req,res)=>{ 
    res.render('about'); 
    });
    
app.post("/signupUser", async(req, res) => {
    console.log(req.body)
    const {Firstname, Lastname, Email, Password} = req.body
  
    try {
      console.log(1)
      const user = await User.signup(Firstname, Lastname, Email, Password)

      res.status(200).json({Firstname, Lastname, Email})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }); 
  
app.post("/loginUser", async(req, res) =>{
    console.log(req.body)
    const {Email, Password} = req.body
    try {
        console.log(Email,Password)
      const user = await User.login(Email, Password)
    console.log(1)
        
      res.status(200).json({Email})// See token being sent in response to frontend
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
)

app.listen(3000,(req,res)=>{ 
console.log("Server is running at port 3000"); 
}); 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.ldxvqfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
