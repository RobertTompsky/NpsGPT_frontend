import React from 'react';

interface IGroup {
    children: React.ReactNode
    width?: string
    gap?: string
}

export const Group = ({
    children,
    width,
    gap
}: IGroup) => {
    return (
        <div style={{ width, gap, display: 'flex' }}>
            {children}
        </div>
    );
};
