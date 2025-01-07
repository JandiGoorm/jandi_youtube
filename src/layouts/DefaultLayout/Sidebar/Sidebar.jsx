import MenuComponent from "./Menu/Menu";
import SubscribeMenu from "./SidebarSubscribe/SidebarSubscibe";

const Sidebar = (width) => {
  return (
    <>
      <MenuComponent menu={"first"} />
      <MenuComponent menu={"myPage"} />
      <SubscribeMenu />
      <MenuComponent menu={"search"} />
      <MenuComponent menu={"plus"} />
      <MenuComponent menu={"setting"} />
      {/*<div className="sidebarDiv">*/}
      {/*    <ul className="sidebarMenu">*/}
      {/*        {menuitems.map((item, index) => (*/}
      {/*            <li key={index} className="menuItem">*/}
      {/*                <span className="icon">{item.icon}</span>*/}
      {/*                <span className="label">{item.label}</span>*/}
      {/*            </li>*/}
      {/*        ))}*/}
      {/*    </ul>*/}
      {/*</div>*/}
    </>
  );
};

export default Sidebar;
