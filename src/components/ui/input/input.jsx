export const InputField = ({ label, value, onChange }) => (
    <div>
      <label>{label}</label>
      <input 
        type='number'
        value={value}
        onChange={onChange}
        min='1'
      />
    </div>
);