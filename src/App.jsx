import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'


function App() {

  const [postsList, setPostsList] = useState([]);

  // funzione chiamata api tramite axios  
  function fetchTodos() {
    axios.get("http://localhost:3000/posts/")
      .then((res) => setPostsList(res.data))
  }

  // chiamata funzione solo al primo rendering
  useEffect(fetchTodos, []);

  // funzione rimozione post
  const removePost = (id) => {
    const updatedList = postsList.filter((post) => {
      return post.id !== id
    });
    setPostsList(updatedList);
  }


  return (
    <>

      {
        postsList.map((post) => (
          <div className='postItem' key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <h4>{post.autore}</h4>
            <p>{post.content}</p>
            <p>{post.tags.join(", ")}</p>
            <button onClick={() => removePost(post.id)}>Cancella Post</button>
          </div >
        ))

      }
    </>
  )
}

export default App
