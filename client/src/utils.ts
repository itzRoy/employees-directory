const capFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const fileDownloader = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url

    link.download = fileName

    link.click()

    URL.revokeObjectURL(url)
}

export { capFirstLetter, fileDownloader }
