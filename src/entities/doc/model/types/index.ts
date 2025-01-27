interface IBaseDocFields {
    name: string
    url: string
}

type IDocTypesMap = {
    file: {
        type: 'file',
        mimetype: string
    },
    web: {
        type: 'web'
    }
}

export type IDocType = IDocTypesMap[keyof IDocTypesMap]['type']

export type IDocInfo<T extends IDocType> = IBaseDocFields & IDocTypesMap[T]