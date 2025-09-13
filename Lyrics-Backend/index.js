const express = require('express');
const cors = require('cors');
const app = express();
//const fetch = require('node-fetch');
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
app.get('/', (req,res) => {
  res.send('Backend');
});

app.get('/api/search', async (req,res) => {
  const song = req.query.song;
  if(!song){
    return res.status(400).json({ error: "Song not found" });
  }
  try{
    const searchResponse = await fetch(`https://api.genius.com/search?q=${encodeURIComponent(song)}`, 
    {headers: {
    Authorization: `Bearer rJraixloZKIgxi4gdUk4jYAFXFL7mBdX_iE-YWCbj8SvM__BcIltqGmAIoOKCRTs`}}
  );
  const searchData = await searchResponse.json();
  if(!searchData.response.hits.length){
    return res.status(404).json({error: 'No result found'});
  }
  const hit = searchData.response.hits[0].result;
  
    const title = hit.title;
    const artist = hit.primary_artist.name;
    const image = hit.song_art_image_thumbnail_url;
    const url = hit.url; // Genius webpage

    res.json({title, artist, image, url});
  } catch(error) {
    console.error('Error:', error);
    res.status(500).json({ error: "API call failed" });
  }
});