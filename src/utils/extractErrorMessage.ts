export const extractErrorMessage = (error: any): string | undefined =>
{
    if (error.code === 4001) return undefined
    let message: string = ""
    if (error.message)
    {
        const result = error.message.match(/message":"([\w\s:\-,;.?!]*)/)
        message = result && result.length > 1 ? result[1] : error.message
    }
    else
    {
        message = error.reason

    }
    return message ? `Failed: ${message}` : `Failed`;
}