import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles.css";
import "./Moderation.css";

export default function ModMenu() {
    window.scrollTo(0, 0);

    const [article, setArticle] = useState({
        id: null,
        title: '', publication_date: '', authors: '',
        abstract: '', institutions: '', keywords: '',
        text: '', references: ''
    });
    const [articles, setArticles] = useState([]);
    const [articleListView, setArticleListView] = useState(true);

    const chosenArticle = async (event) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/ArticleDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    articleid: event.currentTarget.id,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setArticle(data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }

        setArticleListView(false);
    }

    const deleteArticle = () => {
            fetch('http://127.0.0.1:8000/DeleteArticleMod', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    article_id: article.id,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));/*
            window.location.reload(false);
            let location = useLocation();
            window.location.href = location.pathname;
            setArticleListView(true);
            setArticle((prevArticle) => {
                return { ...prevArticle, id: null };
            });*/
    }

    const saveArticle = () => {
        fetch('http://127.0.0.1:8000/SaveArticle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: article.id,
                title: article.title,
                publication_date: article.publication_date,
                authors: article.authors,
                abstract: article.abstract,
                institutions: article.institutions,
                keywords: article.keywords,
                text: article.text,
                references: article.references
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
        window.location.reload(false);
        let location = useLocation();
        window.location.href = location.pathname;
        setArticleListView(true);
        setArticle((prevArticle) => {
            return { ...prevArticle, id: null };
        });
    }

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await fetch('http://127.0.0.1:8000/SentarticlesMod', { method: 'POST' });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }
        fetchArticles();
    }, []);


    const updateTitle = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, title: event.target.value };
        });
    };

    const updateDate = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, publication_date: event.target.value };
        });
    };

    const updateAuthors = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, authors: event.target.value };
        });
    };

    const updateAbstract = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, abstract: event.target.value };
        });
    };

    const updateInstitutions = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, institutions: event.target.value };
        });
    };

    const updateKeywords = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, keywords: event.target.value };
        });
    };

    const updateText = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, text: event.target.value };
        });
    };

    const updateReferences = (event) => {
        setArticle((prevArticle) => {
            return { ...prevArticle, references: event.target.value };
        });
    };

    return <>
        <input className="mod-tab__input" type="radio" name="ModTabs" id="list-tab" defaultChecked />
        <input className="mod-tab__input" type="radio" name="ModTabs" id="text-tab" onChange={e => setArticleListView(!articleListView)} checked={!articleListView} />
        <div className="main">
            <div className="articles-list-tab">
                <label className="text-tab-label" htmlFor="text-tab">
                    <svg viewBox="0 0 320 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </label>
                <div>
                    {articles.map(article => {
                        return <div key={article.id} className="mod-article" id={article.id} onClick={chosenArticle}>
                            <p>{article.title}</p>
                        </div>
                    })}
                </div>
            </div>
            <div className="article-tab">
                <label className="list-tab-label" htmlFor="list-tab">
                    <svg viewBox="0 0 320 512">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </label>
                <forum>
                    <div className="article-tab-header">
                        <button className="article-button delete" onClick={deleteArticle}>
                            <svg viewBox="0 0 448 512">
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                            delete
                        </button>
                        <button className="article-button save" onClick={saveArticle}>
                            <svg viewBox="0 0 448 512">
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                            save
                        </button>
                    </div>
                    <div className="article-modification">
                        <div className="input-wrapper"><p>Title :</p><textarea value={article.title} onChange={e => updateTitle(e)} /></div>
                        <div className="input-wrapper"><p>Publishing Date :</p><input type="date" value={article.publication_date} onChange={e => updateDate(e)} /></div>
                        <div className="input-wrapper"><p>Authors :</p><textarea value={article.authors} onChange={e => updateAuthors(e)} /></div>
                        <div className="input-wrapper tall"><p>Abstract :</p><textarea value={article.abstract} onChange={e => updateAbstract(e)} /></div>
                        <div className="input-wrapper"><p>Institutions :</p><textarea value={article.institutions} onChange={e => updateInstitutions(e)} /></div>
                        <div className="input-wrapper"><p>Keywords :</p><textarea value={article.keywords} onChange={e => updateKeywords(e)} /></div>
                        <p>Article's Body :</p>
                        <textarea value={article.text} onChange={e => updateText(e)} />
                        <div className="input-wrapper taller"><p>References :</p><textarea role="textbox" value={article.references} onChange={e => updateReferences(e)} /></div>
                    </div>
                </forum>
            </div>
        </div>
    </>
}