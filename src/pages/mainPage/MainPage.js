import React, {useEffect, useRef, useState} from 'react';
import './MainPage.css';
import Body from "../../components/body/Body";


const MainPage = () => {

    const MainPageContent = () => {
        return (
            <>
                <h1 className="pageStyle">Welcome to Home</h1>
            </>
        )
    }

    return (
        <Body>
            <MainPageContent />
        </Body>
    );
};

export default MainPage;