import siteLogo from '../assets/scientifically.svg';

export function Header() {

    return <header>
        <a href="">
            <img className="logo" src={siteLogo} alt="" />
        </a>
        <a className="profile" href="">
        </a>
    </header>
}

export function Footer() {
    return <footer>
        <p>@Copyright 2024 - Scientifical.ly</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
    </footer>
}