import { ChangeEvent } from 'react'
import { clearIcon, searchIcon } from '../../assets'

export type TSearchInput = {
    name: string
    value: string
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({ name, value, onChange, placeholder }: TSearchInput) => {
    const clearSearch = () => onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)

    return (
        <div
            className={`flex border h-[40px] border-border p-1 rounded-md text-grey w-[25%] items-center overflow-hidden px-2  mx-2 md:mx-6 gap-2 bg-white`}
        >
            <div
                className={`h-[200%] flex flex-col justify-around transition-all ease duration-300 ${
                    value.length ? 'translate-y-[-15px]' : 'translate-y-[15px]'
                }`}
            >
                <img src={searchIcon} />
                <img className='cursor-pointer' onClick={clearSearch} src={clearIcon} />
            </div>

            <input
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                className={`h-6 px-0 w-full font-thin text-grey placeholder:text-[16px] outline-none border-none`}
            />
        </div>
    )
}

export default SearchInput
