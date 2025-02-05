import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single article
function ShowGame(props) {
  let navigate = useNavigate()
  let {id} = useParams();
  //
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/games/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from games',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editGame = (id) => {
    navigate('/editgame/' + id);
    
  };

  const deleteGame = (id) => {
    setShowLoading(true);
    const game = {title: data.title, genre: data.genre, platform: data.platform , releaseYear: data.releaseYear, developer: data.developer, rating: data.rating, description: data.description };
    //
    axios.delete(apiUrl, game)
      .then((result) => {
        setShowLoading(false);
        navigate('/listgames')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
        <h1>Title: {data.title}</h1>
        <p>Release: {data.releaseYear}</p>
        <p>Developer: {data.developer}</p>
        <p>Genre: {data.genre}</p>
        <p>Platform: {data.platform}</p>
        <p>Rating: {data.rating}</p>
        <p>Description: {data.description}</p>
        
        <p>
          {/* <Button type="button" variant="primary" onClick={() => { editArticle(data._id) }}>Edit</Button>&nbsp; */}
          <Button type="button" variant="danger" onClick={() => { deleteGame(data._id) }}>Delete</Button>
        </p>
   </div>
  );
}

export default ShowGame;
