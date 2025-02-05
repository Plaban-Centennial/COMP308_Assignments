import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from './LoginStatus';
//
// this component is used to list all articles
function ListGames(props) {
  let navigate = useNavigate();
  //
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiUrl = "api/api/games";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('<List>result.data:', result.data)
          //check if the user has logged in
          if (result.data.screen !== 'auth') {
            console.log('data in if:', result.data)
            console.log('data state in if:', result.data.state)
            setData(result.data);
            setIsAuthenticated(isLoggedIn());
            setShowLoading(false);
          }
          else {
            // setIsAuthenticated(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          // setIsAuthenticated(false);
        });
    };
    fetchData();
  }, []);


  // const isLoggedIn = () => {

  //   const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");;

  //   return token !== '';

  // }

  const addGame = (id) => {
    axios.post("/api/users/modifygameforUser/" + id).then((result) => {
      console.log('results from save game:', result.data)
      navigate('/showgame/' + id)

    }).catch((error) => setShowLoading(false));

  }

  return (
    <div>
      {data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>}
          <ListGroup>
            {data.map((item, idx) => (
              // <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.title} ({item.releaseYear})</ListGroup.Item>
              <ListGroup.Item key={idx} >{item.title} ({item.releaseYear})
                {isAuthenticated && (
                  <Button variant="primary" onClick={() => addGame(item._id)} style={{ marginLeft: '10px' }}>
                    Add Game
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default ListGames;
