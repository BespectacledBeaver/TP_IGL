import { useLocation, useNavigate } from 'react-router-dom';
import siteLogo from '../assets/scientifically.svg';

export function Header() {
    let location = useLocation();
    let urlParts = location.pathname.split('/');
    let userid = urlParts[1];

    let navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/' + userid, { replace: true });
    };

    const handleFavoritesClick = () => {
        navigate('/' + userid + '/favorites', { replace: true });
    };

    return <header>
        <a title="articles" onClick={handleLogoClick}>
            <img className="logo" src={siteLogo} alt="" />
        </a>
        <a title="favorites" className="profile" onClick={handleFavoritesClick}>
            <svg viewBox="0 0 47.94 47.94">
                <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z">
                </path>
            </svg>
        </a>
    </header>
}

export function Navigation({ currentNavPage, maxNavPages, goback, goforward }) {

    return <nav className="articles-list-nav">
        <button className={currentNavPage == 1 ? "opaque" : "clickable"} onClick={currentNavPage != 1 && goback}>
            <svg className="back" viewBox="0 0 71 61">
                <path d="M1.96484 26.4805C0.0117188 28.4336 0.0117188 31.6055 1.96484 33.5586L26.9648 58.5586C28.918 60.5117 32.0898 60.5117 34.043 58.5586C35.9961 56.6055 35.9961 53.4336 34.043 51.4805L17.5586 35.0117H65.4961C68.2617 35.0117 70.4961 32.7773 70.4961 30.0117C70.4961 27.2461 68.2617 25.0117 65.4961 25.0117H17.5742L34.0273 8.54297C35.9805 6.58984 35.9805 3.41797 34.0273 1.46484C32.0742 -0.488281 28.9023 -0.488281 26.9492 1.46484L1.94922 26.4648L1.96484 26.4805Z" />
            </svg>
        </button>
        <input type="text" value={currentNavPage} />
        <button>/</button>
        <button className="page-count-indicator">{maxNavPages}</button>
        <button className={currentNavPage == maxNavPages ? "opaque" : "clickable"} onClick={currentNavPage != maxNavPages && goforward}>
            <svg className="next" viewBox="0 0 71 61">
                <path d="M69.0351 33.5448C70.9883 31.5916 70.9883 28.4196 69.0351 26.4663L44.0337 1.46493C42.0804 -0.488308 38.9084 -0.488308 36.9552 1.46493C35.0019 3.41816 35.0019 6.59021 36.9552 8.54344L53.4405 25.0131H5.50028C2.7345 25.0131 0.5 27.2476 0.5 30.0134C0.5 32.7792 2.7345 35.0137 5.50028 35.0137H53.4248L36.9708 51.4833C35.0176 53.4366 35.0176 56.6086 36.9708 58.5619C38.924 60.5151 42.0961 60.5151 44.0493 58.5619L69.0507 33.5605L69.0351 33.5448Z" />
            </svg>
        </button>
    </nav>
}

export function Footer() {
    return <footer>
        <p>@Copyright 2024 - Scientifical.ly</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
    </footer>
}