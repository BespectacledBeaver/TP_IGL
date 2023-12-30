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
        <input type="text" id="email" name="email" placeholder="e-mail" />
        <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="password" />
        </div>
        {(bool && <div className="password-input">
          <input type="password" id="password" name="password" aria-label="password" placeholder="confirm password" />
        </div>)}
        <button className="log-in__button">
          {modalHeading}
        </button>
      </forum>
      {(!bool && <><p>Don't have an account?</p>
        <button className="log-in__button" onClick={() => {signUp(true); toggleHeading("Sign-up")}}>
          Sign-up
        </button>
        </>)}
    </>
  }


  return (
    <dialog className="modal" ref={ref} onCancel={closeModal} onClick={()=> {closeModal(); signUp(false); toggleHeading('Log-in');}}>
      <div className="modal__inner" onClick={(event) => ignoreClick(event)}>
        {logIn()}
      </div>
    </dialog>
  );
}