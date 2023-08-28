type TStatusBullet = {
    value: boolean
    trueText: string
    falseText: string
}
const StatusBullet = ({ value, falseText, trueText }: TStatusBullet) => {
    return (
        <div className='flex justify-center items-center gap-2'>
            <span className={`w-2 h-2 rounded-full ${value ? 'bg-green-600' : 'bg-red-600'}`} />
            <p className={`${value ? 'text-green-600' : 'text-red-600'}`}>{value ? trueText : falseText}</p>
        </div>
    )
}

export default StatusBullet
