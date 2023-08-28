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

    const randomJobIndex = Math.floor(Math.random() * jobTitles.length)
    const randomDepartmentIndex = Math.floor(Math.random() * departments.length)

    const title = jobTitles[randomJobIndex]
    const department = departments[randomDepartmentIndex]

    return {
        title,
        department,
    }
}

const SeedButton = () => {
    const [count, setCount] = useState(100)

    const onClick = async (num: number): Promise<void> => {
        if (num == 0) return setCount(100)

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
                className='bg-red-500 text-white hover:scale-100 hover:bg-red-500'
            />
        </div>
    )
}

export default SeedButton
