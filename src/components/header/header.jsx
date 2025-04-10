import { NavLink } from 'react-router-dom'
import { Logo } from '../logo/logo'
import styles from './header.module.css'

export const Header = () => {
    return (
        <div className={styles.header}>
            <Logo />
            <div className={styles.linksContainer}>
                <NavLink 
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    to="/"
                >
                    Главная
                </NavLink>
                <NavLink 
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                    to="/tabata-timer"
                >
                    Tabata-таймер
                </NavLink>
                <NavLink 
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} 
                    to="/women-workouts"
                >
                    Для женщин
                </NavLink>
                <NavLink 
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} 
                    to="/men-workouts"
                >
                    Для мужчин
                </NavLink>
            </div>
        </div>
    )
}
