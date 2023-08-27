type TSvgButton = {
    Svg?: JSX.Element
    text?: string
    className?: string
    color?: string
    onClick: () => void
    disabled?: boolean
}
function SvgButton({ Svg, text, onClick, disabled, className = '' }: TSvgButton) {
    return (
        <div
            role='button'
            onClick={!disabled ? onClick : () => {}}
            className={`relative min-h-[30px] min-w-[30px] w-auto gap-2 flex  hover:bg-blue-100 transition-all ease duration-300 p-2  ${
                text ? 'rounded-lg hover:scale-105' : 'rounded-full hover:scale-110 bg-gray-200'
            } ${className}`}
        >
            {Svg ? <div className='w-5 h-5'>{Svg}</div> : null}
            {text ? <p>{text}</p> : null}
        </div>
    )
}

export default SvgButton
