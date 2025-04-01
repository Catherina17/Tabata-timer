import styles from './footer.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerInfo}>
                    <div className={`${styles.column} ${styles.column1}`}>
                        <div className={styles.logo}>Tabata-таймер</div>
                        <div className={styles.aboutTimer}>
                            Эффективный таймер для ваших тренировок по методу Табата.
                        </div>
                        <div className={styles.findUs}>
                            <div className={styles.findUsText}>Найдите нас здесь:</div>
                            <div className={styles.findUsLinks}>
                                <div className={styles.findUsLink}>
                                    <a href='#'>FB</a>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.findUsLink}>
                                    <a href=''>TW</a>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.findUsLink}>
                                    <a href=''>INS</a>
                                </div>
                                <div className={styles.line}></div>
                                <div className={styles.findUsLink}>
                                    <a href=''>PT</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.column} ${styles.column2}`}>
                        <div className={styles.title}>О нас</div>
                        <ul className={styles.customList}>
                            <li className={styles.item}><a href=''>О сайте</a></li>
                            <li className={styles.item}><a href=''>Блог</a></li>
                            <li className={styles.item}><a href=''>Контакты</a></li>
                        </ul>
                    </div>
                    <div className={`${styles.column} ${styles.column3}`}>
                        <div className={styles.title}>Помощь</div>
                        <ul className={styles.customList}>
                            <li className={styles.item}><a href=''>Условия</a></li>
                            <li className={styles.item}><a href=''>Поддержка</a></li>
                            <li className={styles.item}><a href=''>Вопросы</a></li>
                        </ul>
                    </div>
                    <div className={`${styles.column} ${styles.column4}`}>
                        <div className={styles.title}>Подписка на новости</div>
                        <div className={styles.newsletterText}>
                        Подпишитесь, чтобы первыми получать новости о тренировках, акциях и обновлениях.
                        </div>
                        <div className={styles.newsletterForm}>
                            <form action=''>
                                <label>
                                    <input type='text' placeholder='Введите ваш email' className={styles.input} />
                                    <img src='./icons/send.svg' alt='send' className={styles.sendIcon} />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <div>© Все права защищены. Tabata-таймер 2025</div>
                </div>
            </div>
        </footer>
    )
}