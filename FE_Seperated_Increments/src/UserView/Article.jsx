import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Article({ id, title, authors, date, favorited}) {
    let navigate = useNavigate();

    let location = useLocation();
    let urlParts = location.pathname.split('/');
    let userid = urlParts[1];

    let [favorite, setFavorite] = useState(favorited);
    let [bookmark, setBookmark] = useState(favorited?"remove from bookmarks":"add to bookmarks");

    const handleBookmark = (event) => {
        setFavorite(!favorite);
        setBookmark(favorite?"add to bookmarks":"remove from bookmarks");
        if (event.target.checked) {
            fetch('http://127.0.0.1:8000/SauvegarderFav', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userid,
                    articleid: id,
                }),
            })
                .then(response => response.json())
                .catch((error) => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }
        else {
            fetch('http://127.0.0.1:8000/EnleverFav', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userid,
                    articleid: id,
                }),
            })
                .then(response => response.json())
                .catch((error) => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }
    };
    const handleClick = () => {
        navigate('article/' + id, {state : {favorited : favorite}});
    };

    return <div className="article">
        <div className="article-info">
            <a className="article-title" onClick={handleClick}>{title}</a>
            <p className="article-date">{date}</p>
            <p className="article-authors">{authors}</p>
            <p className="article-page-number"></p>
        </div>

        <input type="checkbox" id={"article-" + id} className="bookmark-input" aria-hidden="true" onChange={e => handleBookmark(e)} checked={favorite}/>

        <label htmlFor={"article-" + id} className="bookmark__container" title={bookmark}>
            <svg className="bookmark" viewBox="0 0 384 512">
                <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
            </svg>
        </label>
    </div>
}