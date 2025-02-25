import React from 'react';

interface IGroup {
    children: React.ReactNode
    width?: string
    gap?: string
    justifyContent?: string,
    alignItems?: string
}

export const Group = ({
    children,
    width,
    gap,
    justifyContent = 'normal',
    alignItems = 'normal'
}: IGroup) => {
    return (
        <div style={{ width, gap, display: 'flex', justifyContent, alignItems }}>
            {children}
        </div>
    );
};