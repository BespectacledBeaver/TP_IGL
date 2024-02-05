import { useState } from "react";

export function SearchField() {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    return <div className="test">
            <div className="date__container">
                <p>From</p>
                <input type="date" name="start" id="start" value={dateStart} onChange={e => setDateStart(e.target.value)} />
            </div>
            <div className="date__container">
                <p>To</p>
                <input type="date" name="end" id="end" value={dateEnd} onChange={e => setDateEnd(e.target.value)} />
            </div>
        </div>
}