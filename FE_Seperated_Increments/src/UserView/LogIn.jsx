import { useEffect, useRef, useState } from "react";

export function LogInButton({ openModal }) {

  return <button className="log-in__button" onClick={openModal}>
    Log-in
  </button>
}

export function LogInForum({ openModal, closeModal }) {
  const ref = useRef();
  const [bool, signUp] = useState(false);
  const [modalHeading, toggleHeading] = useState("Log-in");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    fetch('http://127.0.0.1:8000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the retrieved data, e.g., update state with the signup response
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  const handleLogin = () => {
    fetch('http://127.0.0.1:8000/login', {
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
          console.log('Login successful! Username:', data.username);
          // Handle successful login, e.g., redirect to another page
        } else {
          console.log('Login failed!');
          // Handle failed login, e.g., display error message
        }
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const ignoreClick = (event) => {
    event.stopPropagation();
  }

  function logIn() {

    return <>
      <p>{modalHeading}</p>
      <forum method="post">
        <input type="text" id="username" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {(bool && <div className="password-input">
          <input type="password" id="password-conf" name="password-conf" aria-label="password-conf" placeholder="confirm password" />
        </div>)}
        <button type='submit' className="log-in__button" onClick={handleLogin}>
          {modalHeading}
        </button>
      </forum>
      {(!bool && <><p>Don't have an account?</p>
        <button type='submit' className="log-in__button" onClick={() => { signUp(true); toggleHeading("Sign-up"); }}>
          Sign-up
        </button>
      </>)}
    </>
  }


  return (
    <dialog className="modal" ref={ref} onCancel={closeModal} onClick={() => { closeModal(); signUp(false); toggleHeading('Log-in'); }}>
      <div className="modal__inner" onClick={(event) => ignoreClick(event)}>
        {logIn()}
      </div>
    </dialog>
  );
}
