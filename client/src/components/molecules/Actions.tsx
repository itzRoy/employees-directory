import { deleteIcon, editIcon, viewIcon } from '../../assets'
import { SvgButton } from '../atoms'

type TActions = {
    onDelete: () => void
    onView: () => void
    onEdit: () => void
}
const Actions = ({ onDelete, onView, onEdit }: TActions) => {
    return (
        <div className='flex justify-evenly gap-2 w-[150px] items-center'>
            <SvgButton
                Svg={<img className='h-full w-full' alt='view' src={viewIcon} />}
                onClick={onView}
                className='hover:bg-green-100'
            />
            <SvgButton
                Svg={<img className='h-full w-full' alt='edit' src={editIcon} />}
                onClick={onEdit}
                className='hover:bg-blue-200'
            />
            <SvgButton
                Svg={<img className='h-full w-full' alt='delete' src={deleteIcon} />}
                onClick={onDelete}
                className='hover:bg-red-300'
            />
        </div>
    )
}

export default Actions
