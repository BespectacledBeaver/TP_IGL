import { useState } from "react";
import siteLogo from './assets/scientifically.svg'
import { LogInButton, LogInForum } from './UserView/LogIn'
import "./styles.css"

export default function App() {
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
          <svg className="wave" viewBox="0 0 1440 625">
            <path d="M1441 89.5002V625.001H-2V89.5002C-2 89.5002 403.5 -111.5 798 89.5002C1192.5 290.5 1441 89.5002 1441 89.5002Z" fill="#4FA9BF" />
          </svg>
          <svg className="wave" viewBox="0 0 1440 625">
            <path d="M1441 89.5002V625.001H-2V89.5002C-2 89.5002 403.5 -111.5 798 89.5002C1192.5 290.5 1441 89.5002 1441 89.5002Z" fill="#4FA9BF" />
          </svg>
        </div>
      </div>
    </div>
  </>
}