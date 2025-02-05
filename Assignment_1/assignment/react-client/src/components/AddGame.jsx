import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// this component is used to create a new article
function AddGame(props) {
  //
  let navigate = useNavigate();
  //
  const username = props.screen;
  console.log('props.screen', props.screen)
  const [game, setGame] = useState({ _id: '', title: '', genre: '', platform: '', releaseYear: 1960, developer: '', rating: 5, description: '', username: '' });
  const [showLoading, setShowLoading] = useState(false);
  //
  const apiUrl = "api/api/games"
  //
  const saveGame = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { title: game.title, genre: game.genre, platform: game.platform, releaseYear: game.releaseYear, developer: game.developer, rating: game.rating, description: game.description };
    //
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log('results from save game:', result.data)
        navigate('/showgame/' + result.data._id)

      }).catch((error) => setShowLoading(false));
  };
  //
  const onChange = (e) => {
    e.persist();

    setGame({ ...game, [e.target.name]: e.target.value });

  }

  return (
    <div>
      <h2> Add a Game to Database{username} </h2>
      {showLoading &&
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Form onSubmit={saveGame}>
        <Form.Group>
          <Form.Label>Game Title</Form.Label>
          <Form.Control type="text" name="title" id="title" placeholder="Enter title" value={game.title} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Genre</Form.Label>
          <Form.Control type="text" name="genre" id="genre" placeholder="Enter genre" value={game.genre} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Platform</Form.Label>
          <Form.Control type="text" name="platform" id="platform" placeholder="Enter platform" value={game.platform} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Release Year</Form.Label>
          <Form.Control type="number" name="releaseYear" id="releaseYear" placeholder="Enter release year" step="1" min="1960" value={game.releaseYear} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Developer</Form.Label>
          <Form.Control type="text" name="developer" id="developer" placeholder="Enter developer" value={game.developer} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Rating</Form.Label>
          <Form.Control type="number" name="rating" id="rating" placeholder="Enter rating" step="1" min="0" max="10" value={game.rating} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label> Description</Form.Label>
          <Form.Control as="textarea" rows="3" name="description" id="description" placeholder="Enter description" value={game.description} onChange={onChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Game to Database
        </Button>
      </Form>
    </div>
  );


}
// 
export default AddGame;
