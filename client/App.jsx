import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";
import axios from 'axios'

const App = () => {

  useEffect(() => {
    fetch('http://localhost:3000/api/chirps')
    .then(res => res.json())
    .then(allChirps => setChirps(allChirps) ) 
  }, []) 
  

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chirps, setChirps] = useState([
    {
      id: uuidv4(),
      username: "Josh",
      message: "This is the chirp body!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: uuidv4(),
      username: "Haylee",
      message: "Hello!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    {
      id: uuidv4(),
      username: "Garrett",
      message: "I'm not mad!",
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
  ]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleChirpSubmit = (e) => {
    e.preventDefault();

    const newChirp = {
      id: uuidv4(),
      username: username,
      message: message,
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    };

    setChirps([...chirps, newChirp]);
  };

  const postChirp = () => {
   axios.post('https://localhost:3000/api/chirps', {userid: 1, content: message} )
   .then(res => console.log(res.data))
   .catch((err) => console.log(err))
  };

  return (
    <>
      <div className="container text-body text-center">
        <div className="row">
          <div className="col-12 p-0">
            <nav>
              <img
                className="banner"
                src="./assets/banner.jpg"
                alt="logo for awesome site yay"
              />
              <h1>Ghibli Chirpr</h1>
            </nav>
          </div>
        </div>
        <div className="row">
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <textarea
                className="form-control mb-2"
                              aria-label="With textarea"
                              placeholder="(500 characters max)"
                value={message}
                onChange={handleMessageChange}
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn btn-dark" onClick={postChirp} type="submit">
                Chirp It!
              </button>
            </div>
          </form>
          <div className=" chirps mb-4">
            {chirps.map((chirp) => (
              <ChirpCard
                key={chirp.id}
                username={chirp.userid}
                message={chirp.content}
                created={chirp.created}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
