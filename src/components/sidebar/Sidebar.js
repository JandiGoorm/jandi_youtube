import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const menuitems = [
        { icon: "🏠", label: "Home" },
        { icon: "🔥", label: "Trending" },
        { icon: "📚", label: "Library" },
        { icon: "🕒", label: "History" },
        { icon: "👍", label: "Liked Videos" },
        { icon: "⚙️", label: "Settings" },
    ];

    return(
        <>
            <div className="sidebarDiv">
                <ul className="sidebarMenu">
                    {menuitems.map((item, index) => (
                        <li key={index} className="menuItem">
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    );
};

export default Sidebar;