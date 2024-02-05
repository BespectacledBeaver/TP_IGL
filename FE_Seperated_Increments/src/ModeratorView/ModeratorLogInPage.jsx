import "../styles.css";
import "../Home.css";
import "../SuperLogIn.css";

export default function ModeratorLogIn() {

  return <div className="main">
      <forum className="frame" method="post">
        <p>Log-in</p>

        <input type="text" id="username" name="username" placeholder="Username"/>
        <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="Password"/>
        </div>

        <input className="log-in__button" type="submit" value="Log-in" id="button-log-in"/>
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