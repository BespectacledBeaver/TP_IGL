import { useEffect, useRef, useState } from "react";

export function LogInButton({ openModal }) {

  return <button className="log-in__button" onClick={openModal}>
    Log-in
  </button>
}

export function LogInForum({ openModal, closeModal }) {
  const ref = useRef();
  const [bool, signUp] = useState(false);

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

    if (!bool) {
      return <>
        <p>Log-in</p>
        <forum method="post">
          <input type="text" id="email" name="email" placeholder="email" />
          <div className="password-input">
            <input type="password" id="password" name="password" aria-label="password" placeholder="Password" />
          </div>

          <button className="log-in__button">
            Log-in
          </button>
        </forum>
        <p>Don't have an account?</p>
        <button className="log-in__button" onClick={() => signUp(true)}>
          Sign-up
        </button>
      </>
    }

    return <>
      <p>Sign-up</p>
      <forum method="post">
        <input type="text" id="email" name="email" placeholder="email" />
        <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="Password" />
        </div>
        <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="Password Confirmation" />
        </div>
        <button className="log-in__button">
          Sign-up
        </button>
      </forum>
    </>

  }


  return (
    <dialog className="modal" ref={ref} onCancel={closeModal} onClick={closeModal}>
      <div className="modal__inner" onClick={(event) => ignoreClick(event)}>
        {logIn()}
      </div>
    </dialog>
  );
}

{/*export function LogInButton() {
    return <button className="log-in__button">
        Log-in
      </button>
}

export function LogInForum(){
  return <dialog>

  </dialog>
}*/}