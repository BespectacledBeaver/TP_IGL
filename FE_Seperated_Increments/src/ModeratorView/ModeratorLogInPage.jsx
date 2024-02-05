import { useState } from "react";
import "../styles.css";
import "../Home.css";
import "../SuperLogIn.css";
import { useNavigate } from "react-router-dom";

export default function ModeratorLogIn() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/ModLogIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.is_authenticated) {
          console.log(data.moderateur);
          navigate('/'+data.moderateur+'/modmenu', {replace : 'True'});
        } else {
          console.log('Login failed!');
          // Handle failed login, e.g., display error message
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return <div className="main">
      <forum className="frame" method="post">
        <p>Log-in</p>

        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <input className="log-in__button" type="submit" value="Log-in" id="button-log-in" onClick={handleLogin}/>
      </forum>
      <div className='wave-scroller'>
        <div className='wave-scroller__inner'>
        <svg className="wave" viewBox="0 0 2886 625.03278">
          <path d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z m 0,0 V 625.001 H 2884 V 0 c 0,0 -355.6619,-7.076292 -702.2285,189.92925 C 1835.2049,386.9348 1635.9719,141.42808 1441,141.42808 Z" fill="#4fa9bf" id="path1" sodipodi:nodetypes="cccczc" inkscape:path-effect="#path-effect3" inkscape:original-d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z" transform="translate(2,0.03178788)"/>
        </svg>
        <svg className="wave" viewBox="0 0 2886 625.03278">
          <path d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z m 0,0 V 625.001 H 2884 V 0 c 0,0 -355.6619,-7.076292 -702.2285,189.92925 C 1835.2049,386.9348 1635.9719,141.42808 1441,141.42808 Z" fill="#4fa9bf" id="path1" sodipodi:nodetypes="cccczc" inkscape:path-effect="#path-effect3" inkscape:original-d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z" transform="translate(2,0.03178788)"/>
        </svg>
        </div>
      </div>
    </div>
}