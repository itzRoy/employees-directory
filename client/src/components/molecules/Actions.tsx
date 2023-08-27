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
            <SvgButton svg={viewIcon} onClick={onView} className='hover:bg-green-100' />
            <SvgButton svg={editIcon} onClick={onEdit} className='hover:bg-blue-200' />
            <SvgButton svg={deleteIcon} onClick={onDelete} className='hover:bg-red-300' />
        </div>
    )
}

export default Actions
