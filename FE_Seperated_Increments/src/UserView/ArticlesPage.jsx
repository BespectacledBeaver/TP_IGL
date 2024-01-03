import { useState } from "react";
import { Header, Navigation, Footer } from './CommonFunctions';
import { Article } from './Article';
import "./Articles.css";
import "../styles.css";

export default function App() {
    const [articles, setBookmark] = useState([]);

    return <>
        <Header />
        <div className="main">
            <forum>
                <input type="radio" name="criteria" id="key-words" className="criterion-input" aria-hidden="true" />
                <input type="radio" name="criteria" id="authors" className="criterion-input" aria-hidden="true" />
                <input type="radio" name="criteria" id="institutions" className="criterion-input" aria-hidden="true" />
                <input type="submit" id="submit" aria-hidden="true" />

                <div className="search-bar">
                    <input type="text" />
                    <label htmlFor="submit">
                        <svg aria-hidden="true" viewBox="0 0 100 100" className="lens">
                            <circle cx="50" cy="50" r="50" className="lens-bg" />
                            <path d="M82.0633 74.173C83.6852 75.8275 83.6587 78.4836 82.0041 80.1055C80.3496 81.7274 77.6935 81.7009 76.0716 80.0463L53.6895 57.2131L59.6812 51.3397L82.0633 74.173Z" />
                            <path d="M65.7564 39.8782C65.7564 53.0657 55.0657 63.7564 41.8782 63.7564C28.6906 63.7564 18 53.0657 18 39.8782C18 26.6906 28.6906 16 41.8782 16C55.0657 16 65.7564 26.6906 65.7564 39.8782ZM23.9695 39.8782C23.9695 49.7688 31.9875 57.7868 41.8782 57.7868C51.7688 57.7868 59.7868 49.7688 59.7868 39.8782C59.7868 29.9875 51.7688 21.9695 41.8782 21.9695C31.9875 21.9695 23.9695 29.9875 23.9695 39.8782Z" />
                        </svg>
                    </label>
                </div>

                <label htmlFor="key-words" className="criterion-label"> key words </label>
                <label htmlFor="authors" className="criterion-label"> authors </label>
                <label htmlFor="institutions" className="criterion-label"> institutions </label>

                <div className="date__container">
                    <p>From</p>
                    <input type="date" name="" id="start" value="" />
                </div>
                <div className="date__container">
                    <p>To</p>
                    <input type="date" name="" id="end" value="" />
                </div>
            </forum>
            <div className="articles-list">
                <Article />
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model</a>
                        <p className="article-date">09/11/2001</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">250 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id2" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id2" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id3" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id3" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id4" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id4" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id5" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id5" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id6" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id6" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id7" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id7" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id8" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id8" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id9" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id9" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article">
                    <div className="article-info">
                        <a className="article-title">Semantic Analysis and Classification of Emails
                            through informative Selection of Features and Ensemble AI Model esgf resgd zsdfc  rzfds zefd fzrf zr zefqcd</a>
                        <p className="article-date">15/04/2023</p>
                        <p className="article-authors">Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari, Shivangi Sachan, Khushbu Doulan, Mainak Adhikari</p>
                        <p className="article-page-number">50 pages</p>
                    </div>

                    <input type="checkbox" id="bookmark-article-id10" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="bookmark-article-id10" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
            </div>
            <Navigation currentNavPage={1} maxNavPages={100}/>
        </div>
        <Footer />
    </>
}