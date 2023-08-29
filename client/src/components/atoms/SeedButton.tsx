import React, { useState } from 'react'
import { SvgButton } from '.'
import config from '../../../config'

const {
    api,

    endpoints: { employees },
} = config

function getRandomData() {
    const jobTitles = ['Software Engineer', 'UX Designer', 'Data Analyst', 'Product Manager']
    const departments = ['Engineering', 'Design', 'Analytics', 'Product']
    const status = [true, false]

    const randomJobIndex = Math.floor(Math.random() * jobTitles.length)
    const randomDepartmentIndex = Math.floor(Math.random() * departments.length)
    const randomStatus = Math.floor(Math.random() * status.length)

    return {
        title: jobTitles[randomJobIndex],
        department: departments[randomDepartmentIndex],
        isActive: status[randomStatus],
    }
}

const SeedButton = () => {
    const [count, setCount] = useState(100)
    const [disabled, setDisabled] = useState(false)

    const onClick = async (num: number): Promise<void> => {
        if (!disabled) {
            setDisabled(true)
        }

        if (num == 0) {
            setDisabled(false)
            return setCount(100)
        }

        const body = getRandomData()

        await fetch(api + employees, {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        setCount(num - 1)

        return onClick(num - 1)
    }

    return (
        <div className='absolute top-3'>
            <SvgButton
                onClick={() => onClick(count)}
                text={`Seed ${count}`}
                className={` text-white hover:scale-100 ${
                    !disabled ? 'bg-red-500 hover:bg-red-500' : 'cursor-not-allowed bg-gray-400'
                }`}
            />
        </div>
    )
}

export default SeedButton
