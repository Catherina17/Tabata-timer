import { useLocation } from 'react-router-dom'
import { PAGE_CONTENT } from '../../constants/constants'
import styles from './contentArea.module.css'
  
export const ContentArea = () => {
  const location = useLocation();
  const { title, description } = PAGE_CONTENT[location.pathname] 

  return (
    <div className={styles.firstScreen}>
      <div className={styles.imageContainer}>
        <img 
          className={styles.backgroundImage}
          src='./images/photo.webp' 
          alt='Фоновое изображение' 
        />
        <div className={styles.textOverlay}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};