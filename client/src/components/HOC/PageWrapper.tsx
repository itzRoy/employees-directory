import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentProps = Record<string, any>

const PageWrapper = <T extends ComponentProps>(Component: FC<T>) =>
    function HOC(props: T) {
        return (
            <div
                className='h-[100vh] max-h[100vh] flex flex-col px-[30px] md:px-[80px] py-[30px] md:py-[70px] dark:text-white-text bg-slate-200 dark:bg-background'
                id={Component.name}
            >
                <Component {...props} />
            </div>
        )
    }

export default PageWrapper
