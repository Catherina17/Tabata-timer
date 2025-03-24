import { Outlet, NavLink } from 'react-router-dom'
import { Logo } from '../logo/logo'
import { Footer } from '../footer/footer';
import styles from './root.module.css'

export const Root = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <div>
          <NavLink className={styles.link} to="/">Главная</NavLink>
          <NavLink className={styles.link} to="/tabata-timer">Tabata-таймер</NavLink>
          <NavLink className={styles.link} to="/women-workouts">Тренировки для женщин</NavLink>
          <NavLink className={styles.link} to="/men-workouts">Тренировки для мужчин</NavLink>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
};
