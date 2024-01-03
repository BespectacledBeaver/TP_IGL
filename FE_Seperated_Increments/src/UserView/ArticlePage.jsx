import { useState } from "react";
import { Header, Navigation, Footer } from './CommonFunctions';
import "./Article.css";
import "../styles.css";

export default function App() {
    const [modal, setModal] = useState(false);

    return <>
        <Header />
        <div className="main">
            <div className="article">
                <div className="article-header">
                    <p>
                        A pilot study using a machine-learning approach of morphological and hemodynamic parameters for predicting aneurysms enhancement
                    </p>

                    <input type="checkbox" id="bookmark-article-id" className="bookmark-input" aria-hidden="true" />

                    <label htmlFor="" className="download__container">
                        <svg className="download" viewBox="0 0 55 68">
                            <path className="download-line" d="M52.1912 60.2206H4.01471C1.79407 60.2206 0 61.4166 0 62.8971V65.5735C0 67.0539 1.79407 68.25 4.01471 68.25H52.1912C54.4118 68.25 56.2059 67.0539 56.2059 65.5735V62.8971C56.2059 61.4166 54.4118 60.2206 52.1912 60.2206Z"/>
                            <path className="download-arrow" d="M25.277 55.0266C26.8452 56.5948 29.392 56.5948 30.9603 55.0266L51.0338 34.953C52.6021 33.3848 52.6021 30.838 51.0338 29.2697C49.4656 27.7015 46.9187 27.7015 45.3505 29.2697L32.1271 42.5057V4.01471C32.1271 1.79407 30.333 0 28.1124 0C25.8917 0 24.0976 1.79407 24.0976 4.01471V42.4932L10.8742 29.2823C9.30597 27.714 6.75914 27.714 5.19089 29.2823C3.62265 30.8505 3.62265 33.3973 5.19089 34.9656L25.2644 55.0391L25.277 55.0266Z"/>
                        </svg>
                    </label>

                    <label htmlFor="bookmark-article-id" className="bookmark__container">
                        <svg className="bookmark" viewBox="0 0 384 512">
                            <path opacity="1" fill="#1E3050" className="to-bookmark" d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                            <path opacity="1" fill="#1E3050" className="bookmarked" d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                        </svg>
                    </label>
                </div>
                <div className="article-content">
                    
                </div>
                <Navigation currentNavPage={1} maxNavPages={25} />
            </div>
        </div>
        <Footer />
    </>
}