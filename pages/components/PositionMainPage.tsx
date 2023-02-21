import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import MoodField from '../components/MoodField';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET


function PositionMainPage() {
  //Spotify
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);


  useEffect(() => {

    // API Access Token
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
    .then(result => result.json())
    .then(data => setAccessToken(data.access_token))
  }, [])

  // Search
  async function search() {
    console.log("Search for " + searchInput) // TSwift

    // Get request using search to get the Artist ID
    var searchParamters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParamters)
    .then(response => response.json())
    .then(data => { return data.artists.items[0].id })

    console.log("Aritist ID is " + artistId);

    // Get request with Artist ID grab all the albums from that artist
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums' + '?include_groups=album&market=US&limit=50', searchParamters)
    .then(response => response.json())
    .then(data => {
      console.log(data); // housekeeping
      setAlbums(data.items);
    });


    // Display those albums to the user
  }
  console.log(albums);

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl 
          placeholder="Search For Artist" 
          type="input"
          onKeyPress={event => {
            if (event.key == "Enter") {
              search();
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick= {event => { search() }}>Search</Button>
        </InputGroup>
        <MoodField/>
      </Container>
      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map( (album, i) => {
            console.log(album);
            return (
              <Card key={i}>
          <Card.Img src={album.images[0].url} />
          <Card.Body>
            <Card.Title>{album.name}</Card.Title>
          </Card.Body>
        </Card>
            )
          })}
        
        </Row>
      </Container>
    </div>
  );
}


export default PositionMainPage;