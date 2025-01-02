import MenuComponent from "./Menu/Menu";
import SubscribeMenuComponent from "./SubscribeMenu/SubscribeMenu";

const Sidebar = () => {
  return (
    <>
      <MenuComponent menu={"first"} menuName={false} />
      <MenuComponent menu={"myPage"} menuName={true} />
      <SubscribeMenuComponent menu={"subscribe"} />
      <MenuComponent menu={"search"} menuName={true} />
      <MenuComponent menu={"plus"} menuName={true} />
      <MenuComponent menu={"setting"} menuName={false} />
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
