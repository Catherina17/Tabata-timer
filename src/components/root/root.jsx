import { Outlet, NavLink } from 'react-router-dom'
import { Logo } from '../logo/logo'
import { Footer } from '../footer/footer'
import { ContentArea } from '../contentArea/contentArea'
import styles from './root.module.css'

export const Root = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div>
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
            Тренировки для женщин
          </NavLink>
          <NavLink 
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} 
            to="/men-workouts"
          >
            Тренировки для мужчин
          </NavLink>
        </div>
      </header>
      <ContentArea />
      <Outlet />
      <Footer />
    </>
  )
}
