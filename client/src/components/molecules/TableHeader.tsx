import { ChangeEvent } from 'react'
import { SearchInput, SvgButton } from '../atoms'
import { excelIcon, lockIcon, plusIcon, unlockIcon } from '../../assets'
import { useNavigate } from 'react-router'
import config from '../../../config'
import { useExportEmployeesMutation } from '../../store/api/employeesApi'

type THeader = {
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
    onActivateClick: () => void
    onDeactivateClick: () => void
    searchValue: string
    disabel?: boolean
}
const TableHeader = ({ onSearchChange, searchValue, onActivateClick, onDeactivateClick, disabel }: THeader) => {
    const navigate = useNavigate()
    const [exportExcel, { isLoading }] = useExportEmployeesMutation()

    return (
        <>
            <h1 className='ml-6 mb-4 text-xl'>Employees</h1>
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
                        Svg={<img alt='activate' src={unlockIcon} />}
                        text='Activate'
                        onClick={onActivateClick}
                        className={`px-3  text-white ${
                            !disabel
                                ? 'hover:bg-green-600 bg-green-600'
                                : 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                        }`}
                    />
                    <SvgButton
                        Svg={<img alt='deactivate' src={lockIcon} />}
                        text='Deactivate'
                        onClick={onDeactivateClick}
                        className={`px-3  text-white ${
                            !disabel
                                ? 'hover:bg-red-600 bg-red-600'
                                : 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                        }`}
                    />
                    <SvgButton
                        Svg={<img alt='deactivate' src={excelIcon} />}
                        text='Export Excel'
                        disabled={isLoading}
                        onClick={() => exportExcel(null)}
                        className={`px-3  text-white ${
                            !isLoading
                                ? 'hover:bg-green-700 bg-green-700'
                                : 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed'
                        }`}
                    />
                </div>
            </div>
        </>
    )
}

export default TableHeader
