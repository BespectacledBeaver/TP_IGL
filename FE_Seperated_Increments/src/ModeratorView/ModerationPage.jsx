import { useState, useEffect } from "react";
import "../styles.css";
import "./Moderation.css";

export default function ModMenu() {
    const [articles, setArticles] = useState([]);

    const chosenArticle = event => {
        console.log(event.currentTarget.id);
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
                console.log(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }
        fetchArticles();
    }, []);

    return <>
        <input className="mod-tab__input" type="radio" name="ModTabs" id="list-tab" defaultChecked />
        <input className="mod-tab__input" type="radio" name="ModTabs" id="text-tab" />
        <div className="main">
            <div className="articles-list-tab">
                <label className="text-tab-label" htmlFor="text-tab">
                    <svg viewBox="0 0 320 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </label>
                <div>
                    {articles.map(article => {
                        return <div className="mod-article" id={article.id} onClick={chosenArticle}>
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
                        <button className="article-button delete">
                            <svg viewBox="0 0 448 512">
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                            </svg>
                            delete
                        </button>
                        <button className="article-button save">
                            <svg viewBox="0 0 448 512">
                                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                            </svg>
                            save
                        </button>
                    </div>
                    <div className="article-modification">
                        <div className="textarea" role="textbox" aria-multiline="true" contentEditable="true" >
                            #&lt;p className="article-title"#&gt;<br></br>A pilot study using a machine-learning approach of morphological and hemodynamic parameters for predicting aneurysms enhancement#&lt;/p#&gt;<br></br>
                            #&lt;p className="bold centered"#&gt;<br></br>Nan Lv1 · Christof Karmonik2 · Zhaoyue Shi2 · Shiyue Chen3 · Xinrui Wang3 · Jianmin Liu1 · Qinghai Huang1#&lt;/p#&gt;<br></br>
                            #&lt;p className="article-paragraph"#&gt;<br></br>Received: 16 December 2019 / Accepted: 18 May 2020
                            © CARS 2020
                            #&lt;/p#&gt;<br></br>
                            #&lt;p className="article-heading"#&gt;<br></br>Abstract#&lt;/p#&gt;<br></br>
                            #&lt;p className="article-paragraph"#&gt;<br></br>
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
                            of highest importance when predicting wall enhancement in cerebral aneurysms#&lt;/p#&gt;<br></br>
                        </div>
                    </div>
                </forum>
            </div>
        </div>
    </>
}