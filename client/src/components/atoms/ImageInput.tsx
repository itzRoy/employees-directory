import { ChangeEvent } from 'react'
import { SvgButton } from '.'
import { cancelIcon } from '../../assets'

type TImageInput = {
    value: string
    onChange: (value: string | ArrayBuffer | null) => void
    disabled?: boolean
}
const ImageInput = ({ onChange, value, disabled }: TImageInput) => {
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files && event?.target?.files[0]

        if (file) {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onload = () => {
                onChange(reader.result)
            }
        }
    }

    return (
        <div>
            {!value.length ? <input type='file' accept='image/*' onChange={handleImageChange} /> : null}
            {value.length ? (
                <div className='relative'>
                    {!disabled ? (
                        <SvgButton
                            onClick={() => onChange('')}
                            Svg={<img src={cancelIcon} />}
                            className='absolute left-[-8px] top-[8px] w-5 h-5 p-[0px]'
                        />
                    ) : null}
                    <img src={value} alt='Selected' />
                </div>
            ) : null}
        </div>
    )
}

export default ImageInput
