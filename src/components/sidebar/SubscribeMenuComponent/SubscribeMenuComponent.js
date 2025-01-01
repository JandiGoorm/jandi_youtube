import React, { useState, useEffect } from 'react';
import './SubscribeMenuComponent.css';
import { useNavigate } from "react-router-dom";


const MenuComponent = ({ menu }) => {
    const [menuData, setMenuData] = useState([]);
    const navigate = useNavigate();

    const mysubscribemenuitems = [
        { icon: "🏠", label: "myLorem ipsum", link: "/" },
    ];

    const handleNavigation = (link) => {
        if (link.startsWith("http")) {
            window.open(link, "_blank");
        } else {
            navigate(link);
        }
    };

    return (
        <div className="sidebarDiv">
            <ul className="sidebarMenu">
                <li className="menuName">구독</li>
                {mysubscribemenuitems.map((item, index) => (
                    <li key={index} className="menuItem" onClick={() => handleNavigation(item.link)}>
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </li>
                ))}
                <li className="menuMore">더보기</li>
            </ul>
        </div>
    );
};

export default MenuComponent;
