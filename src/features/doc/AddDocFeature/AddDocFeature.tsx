import { 
    useAddDocsToVectorStoreMutation, 
    useUploadFileMutation 
} from '@/entities/doc/api';
import { DOC_TYPES } from '@/entities/doc/lib';
import { useDocInfo } from '@/entities/doc/lib/hooks';
import { IDocInfo, IDocType } from '@/entities/doc/model';
import { handleInputChange, handleSetFile } from '@/shared/lib/utils';
import { Button, Form, Input, Select, UploadLabel } from '@/shared/ui/components';
import { TextLoader } from '@/shared/ui/loaders';
import { Feedback } from '@/shared/ui/notifications';
import React, { useState } from 'react';

export const AddDocFeature: React.FC = () => {

    const { docInfo, docType, setDocInfo, setDocType } = useDocInfo('file')

    const [file, setFile] = useState<File | undefined>(undefined)

    const [feedback, setFeedback] = useState<string>('')

    const [uploadFile, {
        isLoading: isFileUploading,
        isError: isFileError
    }] = useUploadFileMutation()

    const [addDocsToVectorStore, {
        isLoading: isDocLoading,
        isSuccess: isDocSuccess,
        isError: isDocError
    }] = useAddDocsToVectorStoreMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (feedback) {
            setFeedback('')
        }

        try {
            switch (docInfo.type) {
                case 'file':
                    if (file) {
                        const formdata = new FormData()
                        formdata.append('doc', file)
                        
                        const { filepath, mimetype } = await uploadFile(formdata).unwrap()

                        const fileDocInfo: IDocInfo<'file'> = {
                            ...docInfo,
                            url: filepath,
                            mimetype
                        }

                        const { msg } = await addDocsToVectorStore(fileDocInfo).unwrap()

                        setFeedback(msg)
                        setFile(undefined)

                        break
                    } else {
                        console.log('Файл не был добавлен')
                        break
                    }
                case 'web':
                    const { msg } = await addDocsToVectorStore(docInfo).unwrap()
                    setFeedback(msg)

                    break
            }
        } catch (error) {
            console.error(error)
            setFeedback('Ошибка обработки запроса')
        }
    }

    return (
        <Form title='Дополнить базу' width='30%' onSubmit={handleSubmit}>
            <Input
                name='name'
                placeholder='Название...'
                value={docInfo.name}
                onChange={(e) => handleInputChange(e, setDocInfo)}
            />
            <Select
                options={DOC_TYPES.map(({ value, title }) => ({
                    value,
                    title
                }))}
                defaultOptionTitle='Выбрать тип документа...'
                value={docType}
                onChange={(e) => setDocType(e.target.value as IDocType)}
            />
            {
                docInfo.type === 'file'
                    ?
                    <React.Fragment>
                        <UploadLabel
                            title='Выбрать файл'
                            file={file}
                            htmlFor='file'
                        />
                        <Input
                            id='file'
                            type='file'
                            onChange={(e) => handleSetFile(e, setFile)}
                        />
                    </React.Fragment>
                    :
                    <Input
                        name='url'
                        placeholder='Ссылка...'
                        value={docInfo.url}
                        onChange={(e) => handleInputChange(e, setDocInfo)}
                    />
            }
            <Button
                children='Добавить'
                variant='approve'
                btnSize='small'
            />
            {
                isFileUploading || isDocLoading
                &&
                <TextLoader text='Обработка запроса' />
            }
            {
                isDocSuccess
                &&
                <Feedback message={feedback} type='success' />
            }
            {
                isFileError || isDocError
                &&
                <Feedback message={feedback} type='error' />
            }
        </Form>
    );
};
