import { useEffect } from 'react';

type RefType<T> = ((instance: T | null) => void) | React.RefObject<T | null>

export const useScrollToBottom = <T extends HTMLElement>(elemRef: RefType<T>, dependencies?: any[]) => {
    const scrollToBottom = () => {
        const elem = (elemRef as React.RefObject<HTMLElement>)?.current;
        if (elem) {
            const scrollHeight = elem.scrollHeight;
            const height = elem.clientHeight;
            const maxScrollTop = scrollHeight - height;
            elem.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    };

    useEffect(() => {
        if (elemRef && (elemRef as React.RefObject<HTMLElement>).current) scrollToBottom();
    }, dependencies);
};