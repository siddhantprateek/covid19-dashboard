const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const path = require('path')

const app = express()
const PORT = process.env.PORT || 4000

// middleware
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", 'index.html'));
});
app.use(express.json())
app.use(cors())


// routes
app.use('/', router)

// app.get('/api', (req, res) => {
//     res.send('server running marvellously')
// })

app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})
