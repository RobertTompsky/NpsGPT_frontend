import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"

const baseUrl = `${import.meta.env.VITE_SERVER_URL}`

const baseQueryWithRetry = retry(
    fetchBaseQuery({ baseUrl }),
    { maxRetries: 1}
)

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Chat', 'Doc'],
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})