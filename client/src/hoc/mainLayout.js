import React from 'react';
import Header from '../components/Header/index';

const MainLayout = (props) => {
    return(
        <>
            <Header/>
            <>
                {props.children}
            </>
        </>
    )
}

export default MainLayout;