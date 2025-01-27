export const getStreamDecoder = (response: Response) => {
    const body = response.body as ReadableStream<Uint8Array>
    const reader = body.getReader()
    const decoder = new TextDecoder('utf-8')

    return { 
        reader,
        decoder
    }
}