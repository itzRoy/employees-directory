import { ChangeEvent } from 'react'
import { SearchInput, SvgButton } from '../atoms'
import { lockIcon, plusIcon, unlockIcon } from '../../assets'
import { useNavigate } from 'react-router'
import config from '../../../config'

type THeader = {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
    onActivateClick: () => void
    onDeactivateClick: () => void
    searchValue: string
}
const TableHeader = ({ onSearchChange, searchValue, onActivateClick, onDeactivateClick }: THeader) => {
    const navigate = useNavigate()

    return (
        <div className='flex'>
            <SearchInput name='search' onChange={onSearchChange} placeholder='Global Search' value={searchValue} />
            <div className='flex-1 flex justify-end gap-6'>
                <SvgButton
                    Svg={<img alt='add new' src={plusIcon} />}
                    text='New'
                    onClick={() => navigate(config.routes.add)}
                    className='px-3 hover:bg-blue-700 text-white bg-blue-800'
                />
                <SvgButton
                    Svg={<img alt='add new' src={unlockIcon} />}
                    text='Activate'
                    onClick={onActivateClick}
                    className='px-3 hover:bg-green-600 text-white bg-green-700'
                />
                <SvgButton
                    Svg={<img alt='add new' src={lockIcon} />}
                    text='Deactivate'
                    onClick={onDeactivateClick}
                    className='px-3 hover:bg-red-600 text-white bg-red-600'
                />
            </div>
        </div>
    )
}

export default TableHeader
