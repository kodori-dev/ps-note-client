"use client";

import {createContext, useContext, ReactNode} from 'react';
import {HomePageRes} from '@/types/api/home-page';

const HomePageContext = createContext<HomePageRes>({} as HomePageRes);

interface HomePageProviderProps {
    children: ReactNode;
    value: HomePageRes;
}

export const HomePageProvider = ({children, value}: HomePageProviderProps) => {
    return (
        <HomePageContext.Provider value={value}>
            {children}
        </HomePageContext.Provider>
    );
};

export const useHomePageContext = () => useContext(HomePageContext);
