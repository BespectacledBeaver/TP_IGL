import { Header, Footer } from './CommonFunctions';
import "./Article.css";
import "../styles.css";

export default function App() {

    return <>
        <Header />
        <div className="main">
            <div className="article-header">
                <p>
                    A pilot study using a machine-learning approach of morphological and hemodynamic parameters for predicting aneurysms enhancement
                </p>

                <input type="checkbox" id="bookmark-article-id" className="bookmark-input" aria-hidden="true" />

                <label htmlFor="openpdf-article-id" className="openpdf__container">
                    <svg className="openpdf" viewBox="0 0 512 512">
                        <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z" />

                        {/*
                            <path className="openpdf-line" d="M52.1912 60.2206H4.01471C1.79407 60.2206 0 61.4166 0 62.8971V65.5735C0 67.0539 1.79407 68.25 4.01471 68.25H52.1912C54.4118 68.25 56.2059 67.0539 56.2059 65.5735V62.8971C56.2059 61.4166 54.4118 60.2206 52.1912 60.2206Z"/>
                            <path className="openpdf-arrow" d="M25.277 55.0266C26.8452 56.5948 29.392 56.5948 30.9603 55.0266L51.0338 34.953C52.6021 33.3848 52.6021 30.838 51.0338 29.2697C49.4656 27.7015 46.9187 27.7015 45.3505 29.2697L32.1271 42.5057V4.01471C32.1271 1.79407 30.333 0 28.1124 0C25.8917 0 24.0976 1.79407 24.0976 4.01471V42.4932L10.8742 29.2823C9.30597 27.714 6.75914 27.714 5.19089 29.2823C3.62265 30.8505 3.62265 33.3973 5.19089 34.9656L25.2644 55.0391L25.277 55.0266Z"/>
*/}
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
                <p className="article-title">A pilot study using a machine-learning approach of morphological and hemodynamic parameters for predicting aneurysms enhancement</p>
                <p className="bold centered">Nan Lv1 · Christof Karmonik2 · Zhaoyue Shi2 · Shiyue Chen3 · Xinrui Wang3 · Jianmin Liu1 · Qinghai Huang1</p>
                <p className="article-paragraph">Received: 16 December 2019 / Accepted: 18 May 2020
                    © CARS 2020
                </p>
                <p className="article-heading">Abstract</p>
                <p className="article-paragraph">
                    Purpose The development of straightforward classification methods is needed to identify unstable aneurysms and rupture
                    risk for clinical use. In this study, we aim to investigate the relative importance of geometrical, hemodynamic and clinical risk
                    factors represented by the PHASES score for predicting aneurysm wall enhancement using several machine-learning (ML)
                    models.
                    Methods Nine different ML models were applied to 65 aneurysm cases with 24 predictor variables. ML models were
                    optimized with the training set using tenfold cross-validation with five repeats with the area under the curve (AUC) as cost
                    parameter. Models were validated using the test set. Accuracy being significantly higher (p 0.05) than the non-information
                    rate (NIR) was used as measure of performance. The relative importance of the predictor variables was determined from a
                    subset of five ML models in which this information was available.
                    Results Best-performing ML model was based on gradient boosting (AUC 0.98). Second best-performing model was based
                    on generalized linear modeling (AUC 0.80). The size ratio was determined as the dominant predictor for wall enhancement
                    followed by the PHASES score and mean wall shear stress value at the aneurysm wall. Four ML models exhibited a statistically
                    significant higher accuracy (0.79) than the NIR (0.58): random forests, generalized linear modeling, gradient boosting and
                    linear discriminant analysis.
                    Conclusions ML models are capable of predicting the relative importance of geometrical, hemodynamic and clinical parameters for aneurysm wall enhancement. Size ratio, PHASES score and mean wall shear stress value at the aneurysm wall are
                    of highest importance when predicting wall enhancement in cerebral aneurysms</p>
            </div>
        </div>
        <Footer />
    </>
}