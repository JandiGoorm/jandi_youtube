import React from 'react';
import './Body.css';
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

const Body = function({children}) {

    return(
        <>
           <Header />
            <div className="pageBody">
                <div className="sideBody">
                    <Sidebar />
                </div>
                <div className="realBody">
                    {children}
                </div>
            </div>
        </>

    );
};

export default Body;