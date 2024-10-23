import { IDocInfo, IDocType } from "@/entities/doc/model";
import { useState, useEffect } from "react";

export const useDocInfo = (initialDocType: IDocType) => {
    const [docType, setDocType] = useState<IDocType>(initialDocType)

    const [docInfo, setDocInfo] = useState<IDocInfo<IDocType>>({
        name: '',
        url: '',
        type: 'file',
        mimetype: ''
    })

    useEffect(() => {
        setDocInfo((prev) => {
            switch (docType) {
                case 'file':
                    return {
                        ...prev as IDocInfo<'file'>,
                        type: docType,
                        mimetype: (prev as IDocInfo<'file'>).mimetype
                    }
                case 'web':
                    return {
                        ...prev as IDocInfo<'web'>,
                        type: docType
                    }
                default:
                    return prev
            }
        })
    }, [docType])

    return {
        docType,
        setDocType,
        docInfo,
        setDocInfo
    }
}