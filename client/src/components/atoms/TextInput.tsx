import { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { capFirstLetter } from '../../utils'

export type TTextInput = {
    name: string
    value: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: HTMLInputTypeAttribute
    disabled?: boolean
}

const TextInput = ({ name, value, onChange, placeholder, type, disabled }: TTextInput) => {
    return (
        <div className='w-full'>
            <label htmlFor={name}>{capFirstLetter(name)}</label>
            <div
                className={`flex border h-[40px] border-border p-1 rounded-md text-grey w-full items-center overflow-hidden px-2 gap-2 mt-1  ${
                    disabled ? 'bg-gray-100' : 'bg-whitek'
                }`}
            >
                <input
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    type={type}
                    disabled={disabled}
                    onChange={onChange}
                    className={`h-6 px-0 w-full font-thin text-grey placeholder:text-[16px] outline-none border-none disabled:cursor-not-allowed disabled:bg-gray-100`}
                />
            </div>
        </div>
    )
}

export default TextInput
