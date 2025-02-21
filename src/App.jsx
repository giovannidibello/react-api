import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'

//  aggiungo i campi vuoti al form
const initialFormData = {
  title: "",
  image: "",
  content: "",
  tags: "",
};

function App() {

  const [postsList, setPostsList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  // funzione chiamata api tramite axios  
  function fetchTodos() {
    axios.get("http://localhost:3000/posts/")
      .then((res) => setPostsList(res.data))
  }

  // chiamata funzione solo al primo rendering
  useEffect(fetchTodos, []);


  // funzione di gestione delle info dei campi
  function handleFormData(e) {

    const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;

    // setto tramite lo stato l'oggetto con le info prese dai campi del form
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: value,
    }));
  }

  // funzione di gestione dell'invio del form (creazione post)
  function handleSubmit(e) {
    e.preventDefault();

    // invio dati BE
    axios.post("http://localhost:3000/posts/", formData)
      .then((res) =>

        // setPostList(res.data)
        setPostsList((currentPost) => [...currentPost, res.data])

      )
      .catch(err => {
        console.log(err)
      })

    setFormData(initialFormData);
  }

  // funzione rimozione post
  const removePost = (id) => {
    const updatedList = postsList.filter((post) => {
      return post.id !== id
    });

    // chiamata ad API sulla rotta di delete

    axios.delete(`http://localhost:3000/posts/${id}`)

      .then(res =>
        console.log(res),

        // lo sostituiamo anche nel FE
        setPostsList(updatedList)
      )
      .catch(err => console.log(err))

  }


  return (
    <>
      <form id='formpost' onSubmit={handleSubmit}>
        {/* valore titolo post */}
        <input
          type="text"
          name="title"
          onChange={handleFormData}
          value={formData.title}
          placeholder='Titolo Post'
        />

        {/* valore immagine */}
        <input
          type="text"
          name="image"
          onChange={handleFormData}
          value={formData.image}
          placeholder='Immagine Post'
        />

        {/* valore contenuto */}
        <input
          type="text"
          name="content"
          onChange={handleFormData}
          value={formData.content}
          placeholder='Contenuto Post'
        />

        {/* valore tags */}
        <input
          type="text"
          name="tags"
          onChange={handleFormData}
          value={formData.tags}
          placeholder='Tags Post (separati da , )'
        />

        {/* bottone di invio info */}
        <button>Aggiungi</button>
      </form>

      {postsList.length === 0 ? (
        <h1>Non ci sono posts</h1>
      ) : (
        postsList.map((post) => (
          <div className='postItem' key={post.id}>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <p>{post.content}</p>
            <p>{post.tags.join(", ")}</p>
            <button onClick={() => removePost(post.id)}>Cancella Post</button>
          </div >
        ))
      )}
    </>
  )
}

export default App
