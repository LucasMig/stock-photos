import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    setIsLoading(true);

    let url;
    const urlPage = `&page${page}`;
    url = `${mainUrl}${clientID}${urlPage}`;

    try {
      const data = await fetch(url).then((res) => res.json());
      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data];
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello!");
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 5
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image) => {
            return <Photo key={image.id} {...image} />;
          })}
        </div>
        {isLoading && <h2 className="loading">loading...</h2>}
      </section>
    </main>
  );
}

export default App;
