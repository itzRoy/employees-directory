import { ChangeEvent } from 'react'
import { SearchInput, SvgButton } from '../atoms'
import { plusIcon } from '../../assets'
import { useNavigate } from 'react-router'
import config from '../../../config'

type THeader = {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
    searchValue: string
}
const TableHeader = ({ onSearchChange, searchValue }: THeader) => {
    const navigate = useNavigate()

    return (
        <div className='flex'>
            <SearchInput name='search' onChange={onSearchChange} placeholder='Global Search' value={searchValue} />
            <div className='flex-1 flex justify-end'>
                <SvgButton
                    Svg={<img alt='add new' src={plusIcon} />}
                    text='New'
                    onClick={() => navigate(config.routes.add)}
                    className='px-3 hover:bg-blue-700 text-white bg-blue-800'
                />
            </div>
        </div>
    )
}

export default TableHeader
