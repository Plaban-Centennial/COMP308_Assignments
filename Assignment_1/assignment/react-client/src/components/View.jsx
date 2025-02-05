import CreateArticle from './CreateArticle';
import ListArticles from './ListArticles';

import React, { useState } from 'react';
//
import axios from 'axios';
import AddGame from './AddGame';
import ListGamesForUser from './ListGamesForUser';
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [articleOperation, setArticleOperation] = useState('no-op');
  const [gameOperation, setGameOperation] = useState('no-game-op');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/api/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Verify Cookie button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/api/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }


  //
  const listArticles = (username) => {

    console.log('in listArticles: ', username)

  }
  //
  const createArticle = () => {
    console.log('in createArticle')

  }
  //
  return (
    <div className="App">
      {
        (() => {
          switch (gameOperation) {
            case 'list':
              return <ListGamesForUser />
            case 'create':
              return <AddGameToUser screen={screen} setScreen={setScreen} />

            default:
              return <div>
                <p>{screen}</p>
                <p>{data}</p>
                <button onClick={verifyCookie}>Verify Cookie</button>
                {/* <button onClick={() => setGameOperation('create')}>Add Game</button> */}

                <button onClick={() => setGameOperation('list')}>List Games</button>

                <button onClick={deleteCookie}>Log out</button>
              </div>
          }
        })()

      }

    </div>
  );
}
//
export default View;