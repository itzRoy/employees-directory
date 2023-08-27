type TSvgButton = {
    svg?: unknown
    text?: string
    className?: string
    color?: string
    onClick: () => void
}
function SvgButton({ svg, text, onClick, className = '' }: TSvgButton) {
    return (
        <div
            role='button'
            onClick={onClick}
            className={`min-h-[30px] min-w-[30px]flex justify-center hover:bg-blue-100 hover:scale-110 transition-all ease duration-300 p-2 bg-gray-200 ${
                text ? 'rounded-lg' : 'rounded-full'
            } ${className}`}
        >
            {svg ? <img className='w-5 h-5' src={svg as string} /> : null}
            {text ? <p>{text}</p> : null}
        </div>
    )
}

export default SvgButton
