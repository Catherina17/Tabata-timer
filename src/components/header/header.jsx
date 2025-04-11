import { NavLink } from 'react-router-dom'
import { Logo } from '../logo/logo'
import styles from './header.module.css'

const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/tabata-timer', label: 'Tabata-таймер' },
    { path: '/women-workouts', label: 'Для женщин' },
    { path: '/men-workouts', label: 'Для мужчин' },
];

export const Header = () => {
    return (
        <div className={styles.header}>
            <Logo />
            <div className={styles.linksContainer}>
                {navLinks.map(({ path, label }) => (
                    <NavLink 
                        key={path}
                        className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                        to={path}
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
