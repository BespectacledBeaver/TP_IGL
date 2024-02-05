import { useState } from "react";

export function SearchField() {
    const [keywords, setKeywords] = useState('');
    const [searchOption, setSearchOption] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    

    const handleSearch = () => {
        fetch('http://127.0.0.1:8000/Searcharticles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search_options: searchOption,
                keywords: keywords,
                start_date: dateStart,
                end_date: dateEnd,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setArticles(data);
            })
            .catch(error => console.error('Error:', error));
    };

    return <forum method='post'>
        <input type="radio" name="criteria" id="title" className="criterion-input" aria-hidden="true" />
        <input type="radio" name="criteria" id="key-words" className="criterion-input" aria-hidden="true" />
        <input type="radio" name="criteria" id="authors" className="criterion-input" aria-hidden="true" />
        <input type="radio" name="criteria" id="institutions" className="criterion-input" aria-hidden="true" />
        <input type="submit" id="submit" aria-hidden="true" />

        <div className="search-bar">
            <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} />
            <label htmlFor="submit" onClick={handleSearch}>
                <svg aria-hidden="true" viewBox="0 0 100 100" className="lens">
                    <circle cx="50" cy="50" r="50" className="lens-bg" />
                    <path d="M82.0633 74.173C83.6852 75.8275 83.6587 78.4836 82.0041 80.1055C80.3496 81.7274 77.6935 81.7009 76.0716 80.0463L53.6895 57.2131L59.6812 51.3397L82.0633 74.173Z" />
                    <path d="M65.7564 39.8782C65.7564 53.0657 55.0657 63.7564 41.8782 63.7564C28.6906 63.7564 18 53.0657 18 39.8782C18 26.6906 28.6906 16 41.8782 16C55.0657 16 65.7564 26.6906 65.7564 39.8782ZM23.9695 39.8782C23.9695 49.7688 31.9875 57.7868 41.8782 57.7868C51.7688 57.7868 59.7868 49.7688 59.7868 39.8782C59.7868 29.9875 51.7688 21.9695 41.8782 21.9695C31.9875 21.9695 23.9695 29.9875 23.9695 39.8782Z" />
                </svg>
            </label>
        </div>

        <label htmlFor="title" className="criterion-label" onClick={setSearchOption('title')}> title </label>
        <label htmlFor="key-words" className="criterion-label" onClick={setSearchOption('keywords')}> keywords </label>
        <label htmlFor="authors" className="criterion-label" onClick={setSearchOption('authors')}> authors </label>
        <label htmlFor="institutions" className="criterion-label" onClick={setSearchOption('institutions')}> institutions </label>

        <div className="test">
            <div className="date__container">
                <p>From</p>
                <input type="date" name="start" id="start" value={dateStart} onChange={e => setDateStart(e.target.value)} />
            </div>
            <div className="date__container">
                <p>To</p>
                <input type="date" name="end" id="end" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
            </div>
        </div>
    </forum>
}