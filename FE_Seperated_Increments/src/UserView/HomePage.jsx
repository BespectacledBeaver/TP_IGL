import { useState } from "react";
import siteLogo from '../assets/scientifically.svg';
import { LogInButton, LogInForum } from './LogIn';
import "../styles.css";
import "../Home.css";

export default function Home() {
  const [modal, setModal] = useState(false);

  return <>
    <header>
      <a href="">
        <img className="logo" src={siteLogo} alt="" />
      </a>
      <LogInButton openModal={() => setModal(true)}/>
    </header>
    <LogInForum openModal={modal} closeModal={() => setModal(false)}/>
    <div className="main">
      <p>your <span>one stop</span> for</p>
      <p className="big-title">scientific articles</p>
      <div className='wave-scroller'>
        <div className='wave-scroller__inner'>
        <svg className="wave" viewBox="0 0 2886 625.03278">
          <path d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z m 0,0 V 625.001 H 2884 V 0 c 0,0 -355.6619,-7.076292 -702.2285,189.92925 C 1835.2049,386.9348 1635.9719,141.42808 1441,141.42808 Z" fill="#4fa9bf" id="path1" sodipodi:nodetypes="cccczc" inkscape:path-effect="#path-effect3" inkscape:original-d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z" transform="translate(2,0.03178788)"/>
        </svg>
        <svg className="wave" viewBox="0 0 2886 625.03278">
          <path d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z m 0,0 V 625.001 H 2884 V 0 c 0,0 -355.6619,-7.076292 -702.2285,189.92925 C 1835.2049,386.9348 1635.9719,141.42808 1441,141.42808 Z" fill="#4fa9bf" id="path1" sodipodi:nodetypes="cccczc" inkscape:path-effect="#path-effect3" inkscape:original-d="M 1441,141.42808 V 625.001 H -2 V 0 C -2,0 353.6619,-7.076292 700.22847,189.92925 1046.7951,386.9348 1246.0281,141.42808 1441,141.42808 Z" transform="translate(2,0.03178788)"/>
        </svg>
          {/*
          <svg className="wave" viewBox="0 0 1440 625">
            <path d="M1441 89.5002V625.001H-2V89.5002C-2 89.5002 403.5 -111.5 798 89.5002C1192.5 290.5 1441 89.5002 1441 89.5002Z" fill="#4FA9BF" />
          </svg>
          <svg className="wave" viewBox="0 0 1440 625">
            <path d="M1441 89.5002V625.001H-2V89.5002C-2 89.5002 403.5 -111.5 798 89.5002C1192.5 290.5 1441 89.5002 1441 89.5002Z" fill="#4FA9BF" />
</svg>*/}
        </div>
      </div>
    </div>
  </>
}