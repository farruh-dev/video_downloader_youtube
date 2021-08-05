const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get("/", (req, res) =>{
    const filePath = path.join(__dirname, 'public', 'index.html')
    res.sendFile(filePath, err =>{
        if(err) throw err;
    })

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}...`);
})