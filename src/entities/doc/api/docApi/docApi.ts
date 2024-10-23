import { api } from "@/shared/api";
import { IDocInfo, IDocType } from "../../model";

export const docApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<{ mimetype: string, filepath: string }, FormData>({
            query: (body) => ({
                url: '/doc/uploadFile',
                method: 'POST',
                body
            })
        }),
        addDocsToVectorStore: builder.mutation<{ msg: string, name: string }, IDocInfo<IDocType>>({
            query: (body) => ({
                url: '/doc/addDocsToVectorStore',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Doc']
        })
    })
})

export const { useAddDocsToVectorStoreMutation, useUploadFileMutation } = docApi
