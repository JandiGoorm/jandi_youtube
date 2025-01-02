import React, { useState, useEffect } from 'react';
import './MenuComponent.css';
import { useNavigate } from "react-router-dom";


const MenuComponent = ({ menu }) => {
    const [show, setShow] = useState(false);
    const [menuName, setMenuName] = useState("");
    const [menuData, setMenuData] = useState([]);
    const navigate = useNavigate();

    const menuitems = [
        { icon: "🏠", label: "홈", link: "/" },
        { icon: "🔥", label: "Shorts", link: "/" },
        { icon: "📚", label: "구독", link: "/feed/subscriptions" },
        { icon: "🕒", label: "Youtube music", link: "https://music.youtube.com/" },
    ];
    const mypagemenuitems = [
        { icon: "🏠", label: "시청기록", link: "/" },
        { icon: "🔥", label: "재생목록", link: "/" },
        { icon: "📚", label: "내 동영상", link: "/feed/subscriptions" },
        { icon: "🕒", label: "나중에 볼 동영상", link: "https://music.youtube.com/" },
        { icon: "🕒", label: "좋아요 표시한 동영상", link: "https://music.youtube.com/" },
    ];

    const searchmenuitems = [
        { icon: "🏠", label: "인기 급상승", link: "/" },
        { icon: "🏠", label: "쇼핑", link: "/" },
        { icon: "🏠", label: "음악", link: "/" },
        { icon: "🏠", label: "영화", link: "/" },
        { icon: "🏠", label: "실시간", link: "/" },
        { icon: "🏠", label: "게임", link: "/" },
        { icon: "🏠", label: "스포츠", link: "/" },
        { icon: "🏠", label: "학습 프로그램", link: "/" },
        { icon: "🏠", label: "팟캐스트", link: "/" },
    ];
    const plusmenuitems = [
        { icon: "🏠", label: "Youtube 더보기", link: "/" },
        { icon: "🏠", label: "Youtube 스튜디오", link: "/" },
        { icon: "🏠", label: "Youtube Music", link: "/" },
        { icon: "🏠", label: "Youtube Kids", link: "/" },
    ];
    const settingmenuitems = [
        { icon: "🏠", label: "설정", link: "/" },
        { icon: "🏠", label: "신고 기록", link: "/" },
        { icon: "🏠", label: "고객센터", link: "/" },
        { icon: "🏠", label: "의견 보내기", link: "/" },
    ];

    useEffect(() => {
        let selectedMenu;
        switch (menu) {
            case "myPage":
                selectedMenu = mypagemenuitems;
                setShow(true);
                setMenuName("내 페이지");
                break;
            case "search":
                selectedMenu = searchmenuitems;
                setShow(true);
                setMenuName("탐색");
                break;
            case "plus":
                selectedMenu = plusmenuitems;
                setShow(true);
                setMenuName("Youtube 더보기");
                break;
            case "setting":
                selectedMenu = settingmenuitems;
                setShow(false);
                break;
            default:
                selectedMenu = menuitems;
                setShow(false);
                break;
        }
        setMenuData(selectedMenu);
    }, [menu]);

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
                {show && <li className="menuName">{menuName}</li>}
                {menuData.map((item, index) => (
                    <li key={index} className="menuItem" onClick={() => handleNavigation(item.link)}>
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuComponent;
