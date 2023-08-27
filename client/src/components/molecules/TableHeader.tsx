import { ChangeEvent } from 'react'
import TextInput from '../atoms/TextInput'

type THeader = {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
    searchValue: string
}
const TableHeader = ({ onSearchChange, searchValue }: THeader) => {
    return (
        <div>
            <TextInput name='search' onChange={onSearchChange} placeholder='Global Search' value={searchValue} />
        </div>
    )
}

export default TableHeader
