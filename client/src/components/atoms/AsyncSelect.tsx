import Select, { ActionMeta, SingleValue } from 'react-select'
import { useGetCountriesMutation } from '../../store/api/lovsApi'
import { useState } from 'react'

type TOption = { label: string; value?: string; _id?: string } | undefined

type TAsyncSelect = {
    url: string
    inputValue?: string
    setInputValue?: (val: string | undefined) => void
    selectedOption: TOption
    setSelectedOption: (
        newValue: SingleValue<TOption> | undefined,
        actionMeta: ActionMeta<TOption> | undefined,
    ) => void | unknown
    isSearchable?: boolean
    isClearable?: boolean
    placeholder?: string
    label?: string
    disabled?: boolean
}

const AsyncSelect = ({
    url,
    inputValue,
    selectedOption,
    setInputValue = () => {},
    setSelectedOption,
    placeholder,
    isClearable,
    isSearchable,
    label,
    disabled,
}: TAsyncSelect) => {
    const [fetch, { data, isLoading }] = useGetCountriesMutation()
    const [inputSave, setSave] = useState<string | undefined>()

    const onMenuClose = () => {
        if (selectedOption) {
            inputValue = ''
        }

        setSave(inputValue)

        if (setInputValue) {
            setInputValue(inputValue)
        }
    }

    const onMenuOpen = () => {
        if (!data) fetch(url)
    }

    const onFocus = () => {
        setInputValue(inputSave)

        setSave('')
    }

    return (
        <div className='w-full'>
            {label ? <p className='mb-1'>{label}</p> : null}
            <div className={`${disabled && 'cursor-not-allowed'}`}>
                <Select
                    value={selectedOption}
                    onChange={(val, actionMeta) => {
                        inputValue = ''

                        setSelectedOption(val, actionMeta)
                    }}
                    onInputChange={(val) => {
                        if (val.length) {
                            setSelectedOption(undefined, undefined)
                        }

                        setInputValue(val)
                    }}
                    inputValue={inputValue}
                    isDisabled={disabled}
                    isLoading={isLoading}
                    options={data}
                    onMenuOpen={onMenuOpen}
                    isSearchable={isSearchable}
                    isClearable={isClearable}
                    blurInputOnSelect
                    onMenuClose={onMenuClose}
                    onFocus={onFocus}
                    placeholder={selectedOption?.label || inputSave || placeholder}
                />
            </div>
        </div>
    )
}

export default AsyncSelect
