import { useState, useEffect } from "react";
import { Header, Navigation, Footer } from './CommonFunctions';
import { Article } from './Article';
import noResults from '../assets/File_Not_Found.png';
import "./Articles.css";
import "../styles.css";
import { useLocation } from "react-router-dom";

export default function Favorites() {
    window.scrollTo(0, 0);

    let location = useLocation();
    let urlParts = location.pathname.split('/');
    let useridbruh = urlParts[1];

    const [favorites, setFavoritedArticles] = useState([]);
    /*
    const [currentNavPage, setCurrentNavPage] = useState(1);

    const goBack = () => { setCurrentNavPage(currentNavPage - 1) };
    const goForward = () => { setCurrentNavPage(currentNavPage + 1) };
    */
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
                setFavoritedArticles(data)
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error);
            });
    }, []);

    return <>
        <Header />
        <div className="main">
            <p className="favorites-title">Favorites</p>
            <div className="articles-list">
                {favorites.message? (<div className="error"><img src={noResults} alt="" /><p>{favorites.message}</p></div>):(favorites.map(favorite => {
                    return <Article key={favorite.id} id={favorite.id} title={favorite.title} authors={favorite.authors} date={favorite.publication_date} favorited='True'/>
                }))}
            </div>
            {/*<Navigation currentNavPage={currentNavPage} maxNavPages={5} goback={goBack} goforward={goForward}/>*/}
        </div>
        <Footer />
    </>
}