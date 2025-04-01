import styles from './button.module.css'

export const Button = ({ children, ...props }) => {
    return (
        <button className={styles.button} {...props}>{children}</button>
    )
}
