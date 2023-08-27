import Select, { ActionMeta, SingleValue } from 'react-select'
import { useGetCountriesMutation } from '../../store/api/lovsApi'
import { useState } from 'react'

type TOption = { label: string; _id: string }

type TAsyncSelect = {
    url: string
    inputValue?: string
    setInputValue?: (val: string) => void
    selectedOption: TOption
    setSelectedOption: (newValue: SingleValue<TOption>, actionMeta: ActionMeta<TOption>) => void | unknown
    isSearchable?: boolean
    isClearable?: boolean
    placeholder?: string
}

const AsyncSelect = ({
    url,
    inputValue,
    selectedOption,
    setInputValue,
    setSelectedOption,
    placeholder,
    isClearable,
    isSearchable,
}: TAsyncSelect) => {
    const [fetch, { data, isLoading }] = useGetCountriesMutation()
    const [inputSave, setSave] = useState('')

    const onMenuClose = () => {
        if (inputValue) {
            setSave(inputValue)

            setInputValue && setInputValue(inputValue)
        }
    }

    const onMenuOpen = () => {
        if (!data) fetch(url)
    }

    const onFocus = () => {
        setInputValue && setInputValue(inputSave)

        setSave('')
    }

    return (
        <Select
            value={selectedOption}
            onChange={setSelectedOption}
            onInputChange={setInputValue}
            inputValue={inputValue}
            isLoading={isLoading}
            options={data}
            onMenuOpen={onMenuOpen}
            isSearchable={isSearchable}
            isClearable={isClearable}
            blurInputOnSelect
            onMenuClose={onMenuClose}
            onFocus={onFocus}
            placeholder={inputSave || placeholder}
        />
    )
}

export default AsyncSelect
