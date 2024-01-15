import './Input.css'

export default function Input ( {label, value , setValue, type = 'text'} : {label: string, value: string, setValue: Function, type?: string}) {
    return (
        <div className="input_container">
            <input type={type} id="input" name={value} value={value} onChange={e => setValue(e.target.value.trim())} required/>
            <label htmlFor="input" className="label">{label}</label>
            <div className="line"></div>
        </div>
    )
}