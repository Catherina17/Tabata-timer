import styles from './input.module.css'

export const InputField = ({ label, value, onChange }) => (
  <div className={styles.inputField}>
    <label>{label}</label>
    <input 
      type='number'
      value={value}
      onChange={onChange}
      min='1'
    />
  </div>
);