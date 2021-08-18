import React, { FC } from 'react';
import { Header } from '../Header';

const MainLayout: FC = ({ children }) => {
    return (
        <main className="MainLayout">
            <Header />
            <div className="content">
                {children}
            </div>
        </main>
    );
};

export { MainLayout };