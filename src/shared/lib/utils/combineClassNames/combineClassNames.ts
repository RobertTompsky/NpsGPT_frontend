export const combineClassNames = (
    styles: string,
    ...classes: (string | undefined)[]
): string => {
    return [
        styles,
        ...classes.filter(Boolean)
    ].join(' ');
};