import { useCallback, useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import YoutubeService from "../../../../apis/youtube";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../../components/DropDown/DropDown";
import { useAuth } from "../../../../contexts/AuthContext";
import {
  authMenuOptions,
  premiumMenuOptions,
  videoMenuoptions,
} from "../constants";
import styles from "./LoginStatus.module.css";
import PublicDropDownContent from "./PublicDropDownContent";
import { TfiPlus } from "react-icons/tfi";

const LoginStatus = () => {
  const [userDetail, setUserDetail] = useState(null);
  const { currentUser, signOut } = useAuth();
  const { fetchChannels } = YoutubeService;

  useEffect(() => {
    (async () => {
      const res = await fetchChannels({
        part: "snippet",
        mine: true,
      });

      setUserDetail(res.data.items[0]);
    })();
  }, [fetchChannels]);

  const handleClick = useCallback(
    (option) => {
      if (option.text === "로그아웃") {
        signOut();
      }
    },
    [signOut]
  );

  return (
    <>
      <DropDown>
        <DropDownTrigger>
          <button className={styles.create_btn}>
            <TfiPlus size={18} />
            <span>만들기</span>
          </button>
        </DropDownTrigger>
        <DropDownContent>
          <ul className={styles.video_menu_list}>
            {videoMenuoptions.map((option) => {
              return (
                <li className={styles.menu_item} key={option.text}>
                  <div className={styles.icon_center}>{option.icon}</div>
                  <span>{option.text}</span>
                </li>
              );
            })}
          </ul>
        </DropDownContent>
      </DropDown>
      <div className={styles.bell_center}>
        <IoIosNotificationsOutline size={26} />
      </div>
      <DropDown>
        <DropDownTrigger>
          <img
            src={currentUser.picture}
            alt="user_profile"
            className={styles.user_img}
          />
        </DropDownTrigger>
        <DropDownContent>
          <ul className={styles.menu_list}>
            <li className={styles.menu_user}>
              <img
                src={currentUser.picture}
                alt="user_profile"
                className={styles.user_img}
              />
              <div className={styles.user_info}>
                <div className={styles.user_name}>
                  <span>{currentUser.name}</span>
                  <span>{userDetail?.snippet.customUrl}</span>
                </div>
                <button className={styles.user_channel_btn}>
                  내 채널 보기
                </button>
              </div>
            </li>

            {authMenuOptions.map((option, i) => {
              return (
                <li
                  className={styles.menu_item}
                  key={option.text}
                  style={{
                    borderBottom: i === 2 ? "2px solid #f5f5f5" : "none",
                  }}
                  onClick={() => handleClick(option)}
                >
                  <div className={styles.icon_center}>{option.icon}</div>
                  <span>{option.text}</span>
                </li>
              );
            })}
            {premiumMenuOptions.map((option, i) => {
              return (
                <li
                  className={styles.menu_item}
                  key={option.text}
                  style={{
                    borderBottom: i === 2 ? "2px solid #f5f5f5" : "none",
                  }}
                >
                  <div className={styles.icon_center}>{option.icon}</div>
                  <span>{option.text}</span>
                </li>
              );
            })}

            <PublicDropDownContent />
          </ul>
        </DropDownContent>
      </DropDown>
    </>
  );
};

export default LoginStatus;
