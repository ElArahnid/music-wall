import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthForm } from '../AuthForm/auth-form';
import s from './style.module.css';

// const widthInner = Math.round(window.innerWidth / 40);
// const [widthCount, setWidthCount] = useEffect();

// setWidthCount = () => {
//     document.querySelector("#root").addEventListener("resize", () => {
//         console.log(window.innerWidth);
//     })
// }

// const colorSquare = (props) => {
//     let i = 0;
//     let div = [];
//     // console.log(widthInner);
//     while(i < props) {
//         i++;
//         div.push(<div className={s.colorSquare}></div>)
//     }
//     return [...div];
// }

const Header = () => {
    return (
        <>
        <header className={s.header}>
            <div className={s.headerBG}>
                {
                    // colorSquare(widthInner)
                }
            </div>
            <div className={s.logo}>
                <NavLink to={'/'}>logo</NavLink>
            </div>
            <div className={s.userPanel}>
                <AuthForm />
            </div>
        </header>
        </>
    )
}

export default Header;