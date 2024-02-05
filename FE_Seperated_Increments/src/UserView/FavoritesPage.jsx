import { useState, useEffect } from "react";
import { Header, Navigation, Footer } from './CommonFunctions';
import { Article } from './Article';
import "./Articles.css";
import "../styles.css";
import { useLocation } from "react-router-dom";

export default function Favorites() {
    let location = useLocation();
    let urlParts = location.pathname.split('/');
    let useridbruh = urlParts[1];

    const [articles, setFavoritedArticles] = useState([]);
    const [currentNavPage, setCurrentNavPage] = useState(1);

    const goBack = () => { setCurrentNavPage(currentNavPage - 1) };
    const goForward = () => { setCurrentNavPage(currentNavPage + 1) };

    useEffect(() => {
        console.log(useridbruh);
        fetch('http://127.0.0.1:8000/ConsulterFav', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: useridbruh,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error);
            });
        /*
          async function fetchFavoritedArticles() {
              try {
                  const response = await fetch('http://127.0.0.1:8000/ConsulterFav' , {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          userid: userid,
                      }),
                  });
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  /*setFavoritedArticles(data);
                  console.log(data);
              } catch (error) {
                  console.error('Error fetching articles:', error);
              }
          }
          fetchFavoritedArticles();*/
    }, []);

    return <>
        <Header />
        <div className="main">
            <p className="title">Favorites</p>
            <div className="articles-list">
                {articles.map(article => {
                    return <Article key={article.id} id={article.id} title={article.title} authors={article.authors} date={article.publication_date} />
                })}
            </div>
            {/*<Navigation currentNavPage={currentNavPage} maxNavPages={5} goback={goBack} goforward={goForward}/>*/}
        </div>
        <Footer />
    </>
}