const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())


// routes
app.get('/', (req, res) => {
    res.send('server running marvellously')
})

app.listen(PORT, () =>{
    console.log(`server is running at http://localhost:${PORT}`)
})