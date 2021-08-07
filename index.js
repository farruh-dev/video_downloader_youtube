const express = require('express')
const http = require('http')
const ytdl = require('ytdl-core')
const path = require('path')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.get("/", (req, res) =>{
    const filePath = path.join(__dirname, 'public', 'index.html')
    res.sendFile(filePath, err =>{
        if(err) throw err;
    })
})

app.get('/videoInfo', async (req, res) =>{
    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    res.status(200).json(info);

})
app.get('/download', (req, res) =>{
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    res.header('Content-Disposition', 'attachment;\ filename="video.mp4"')
    ytdl(videoURL, {
        filter: format => format.itag == itag
    }).pipe(res);

})



app.listen(5000, () =>{
    console.log(`Server started on port 5000...`);
})
