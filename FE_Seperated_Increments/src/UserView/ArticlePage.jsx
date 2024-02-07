import { Header, Footer } from './CommonFunctions';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./Article.css";
import "../styles.css";

export default function ArticlePage() {
    window.scrollTo(0, 0);

    let location = useLocation();
    let urlParts = location.pathname.split('/');
    let userid = urlParts[1];
    let articleId = urlParts[3];

    let [article, setArticle] = useState();
    let [favorite, setFavorite] = useState(location.state && location.state.favorited);
    let [bookmark, setBookmark] = useState(favorite ? "remove from bookmarks" : "add to bookmarks");

    useEffect(() => {
        async function fetchArticle() {
            try {
                const response = await fetch('http://127.0.0.1:8000/ArticleDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        articleid: articleId,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArticle(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }
        fetchArticle();
    }, []);

    const handleBookmark = (event) => {
        setFavorite(!favorite);
        setBookmark(favorite ? "add to bookmarks" : "remove from bookmarks");
        if (event.target.checked) {
            fetch('http://127.0.0.1:8000/SauvegarderFav', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userid: userid,
                    articleid: articleId,
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
                    articleid: articleId,
                }),
            })
                .then(response => response.json())
                .catch((error) => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }
    };

    const handlePDF = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/ArticleAsPDF', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    articleid: articleId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }

            // Convert the response blob to a blob URL
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Open the PDF in a new tab
            window.open(blobUrl, '_blank');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <>
        <Header />
        <div className="main">
            {article ? (
                <>
                    <div className="article-header">
                        <p>{article.title}</p>

                        <input type="checkbox" id="bookmark-article-id" className="bookmark-input" aria-hidden="true" onChange={e => handleBookmark(e)} checked={favorite} />

                        <label htmlFor="openpdf-article-id" className="openpdf__container" title="open as PDF" onClick={handlePDF}>
                            <svg className="openpdf" viewBox="0 0 512 512">
                                <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />
                            </svg>
                        </label>

                        <label htmlFor="bookmark-article-id" className="bookmark__container" title={bookmark}>
                            <svg className="bookmark" viewBox="0 0 384 512">
                                <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                                <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                            </svg>
                        </label>
                    </div>
                    <div className="article-content">
                        {/*<p className="article-title">{article.title}</p>*/}
                        <p className="bold centered">{article.authors}</p>
                        <p className="bold centered">{article.institutions}</p>
                        <p><b>{"Published : "}</b>{article.publication_date}</p>
                        <p className="article-heading">Abstract</p>
                        <p className="article-paragraph">{article.abstract}</p>
                        <p className="article-heading">Keywords</p>
                        <p className="article-paragraph">{article.keywords}</p>
                        <p className="article-paragraph">{article.text}</p>
                        <p className="article-heading">References</p>
                        <p className="article-paragraph">{article.references}</p>
                    </div>
                </>) : (<p>Bruh</p>)}
        </div>
        <Footer />
    </>
}