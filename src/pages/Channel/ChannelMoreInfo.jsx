import styles from "./ChannelMoreInfo.module.css";
import { CiMail } from "react-icons/ci";
import { RiGlobalLine } from "react-icons/ri";
import { SlPeople, SlSocialYoutube } from "react-icons/sl";
import { MdOutlineShowChart } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { GiWorld } from "react-icons/gi";

const ChannelMoreInfo = ({ name, value }) => {
  const isEnglishName = (name) => {
    return /^[a-zA-Z]+$/.test(name);
  };

  const getIcon = (name) => {
    switch (name) {
      case "email":
        return <CiMail />;
      case "url":
        return <RiGlobalLine />;
      case "구독자":
        return <SlPeople />;
      case "동영상":
        return <SlSocialYoutube />;
      case "조회수":
        return <MdOutlineShowChart />;
      case "가입일":
        return <IoMdInformationCircleOutline />;
      case "country":
        return <GiWorld />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {getIcon(name) && <span className={styles.icon}>{getIcon(name)}</span>}
      {isEnglishName(name)?<span>{value}</span>:<span>{name}: {value}</span>}
    </div>
  );
};

export default ChannelMoreInfo;
