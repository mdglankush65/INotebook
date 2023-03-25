const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000;

// App routes
app.use(cors());
app.use(express.json()); // to use req.body we must need this middleware ,a header and the body
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/api/v1/login', (req, res) => {
//     res.send('User Login');
// })

// app.get('/api/v2/signup',(req,res)=>{
//     res.send("User Sign in");
// })

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend app listening ${port}`)
})