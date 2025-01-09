import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import styles from "./Channel.module.css";
import YoutubeService from "../../apis/youtube";
import { formatSubscriberCount } from "../../utils/channel";
import { formatVioeo } from "../../utils/Video";
import ChannelMoreInfo from "./ChannelMoreInfo";
import ChannelHomeSection from "./ChannelSections/ChannelHomeSection";
import ChannelVideoSection from "./ChannelSections/ChannelVideoSection";
import ChannelShortsSection from "./ChannelSections/ChannelShortsSection";
import { PiShareFatLight } from "react-icons/pi";
import { IoFlagOutline } from "react-icons/io5";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../components/DropDown/DropDown";
import { CiBellOn,CiBellOff  } from "react-icons/ci";
import { FiUserMinus } from "react-icons/fi";
import { BiSolidBellRing } from "react-icons/bi";

const ChannelPage = () => {
  const { channel } = useParams(); // URL에서 채널 ID를 가져옵니다.
  const [activeTab, setActiveTab] = useState("홈");
  const [detail, setDetail] = useState([]);
  const [modalDetail, setModalDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["홈", "동영상", "Shorts","재생목록","커뮤니티","스토어"]

  const fetchChannel = async (channelId) =>{
    try{
      const response = await YoutubeService.fetchChannel(10,channelId);
      const data = response.data.items[0];
      console.log(data);
      const content = {
        id:data.id,
        handle: data.snippet.customUrl,
        title:data.snippet.title,
        customUrl: data.snippet.customUrl,
        description: data.snippet.description,
        subscriberCount: formatSubscriberCount(data.statistics.subscriberCount),
        videoCount: formatVioeo(data.statistics.videoCount),
        banner: data.brandingSettings.image.bannerExternalUrl,
        thumbmails: data.snippet.thumbnails.default.url
      }
      const modalContent = {
        email: "email@example.com",
        url: `https://www.youtube.com/${data.snippet.customUrl}`,
        구독자: formatSubscriberCount(data.statistics.subscriberCount),
        동영상: data.statistics.videoCount+"개",
        조회수: data.statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +"회",
        가입일: new Date(data.snippet.publishedAt).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replace(/-/g, "."),
        country: data.snippet.country
      }
      setDetail(content);
      setModalDetail(modalContent);

    }catch(error){
      console.log("error: "+ error);
    }
  }
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  useEffect (()=> {
    fetchChannel(channel);
  },[]);

  return (
    <DefaultLayout>
      <div className={styles.channelPage}>
        {/* 배너 */}
        <div className={styles.channelBanner}>
        <img
          src={detail.banner}
          alt="Channel Banner"
          className={styles.bannerImage}
        />
        </div>
        {/* 채널 정보 */}
        <div className={styles.channelHeader}>    
          <div className={styles.avatarDiv}>
            <img 
            src={detail.thumbmails}
            alt="channel Avata"
            className={styles.channelAvata}
            />
          </div>
         <div className={styles.channelInfoDiv}>
          <div className={styles.channelName}>
            <span>{detail.title}</span>
          </div>
          <div className={styles.channelBasic}>
            <span className={styles.channelId}>{detail.customUrl}</span>
            <span>﹒</span>
            <span>구독자 {detail.subscriberCount}</span>
            <span>﹒</span>
            <span> 동영상 {detail.videoCount}</span>
          </div>
          <div className={styles.channelInfo}>
            <span className={styles.channelInfoP} onClick={()=> handleModal()}>{detail.description}</span>
            <span className={styles.moreInfo} onClick={()=> handleModal()}>...더보기</span>
          </div>
          <div className={styles.subscribeDiv}>
          <DropDown>
          <DropDownTrigger>
            <button className={styles.subscribe_btn}>
              <div  className={styles.dropdown_icon}><CiBellOn /></div>
              <span>구독중</span>
            </button>
          </DropDownTrigger>
          <DropDownContent>
            <div className={styles.dropdown_content}>
              <button>
                <div className={styles.dropdown_icon}><BiSolidBellRing /></div>
                <span>전체</span>
              </button>
              <button>
                <div  className={styles.dropdown_icon}><CiBellOn /></div>
                <span>맞춤설정</span>
              </button>
              <button>
                <div  className={styles.dropdown_icon}><CiBellOff /></div>
                <span>없음</span>
              </button>
              <button>
                <div  className={styles.dropdown_icon}><FiUserMinus /></div>
                <span>구독취소</span>
              </button>
            </div>
          </DropDownContent>
        </DropDown>
          </div>
         </div>
        </div>
        {/* 탭 네비게이션 */}
        <div className={styles.channelTabNav}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* 탭 컨텐츠 */}
        <div className={styles.channelTabContents}>
          {/* {activeTab === "홈" && <ChannelHomeSection channelId={channel}/>} */}
          {activeTab === "동영상" && <ChannelVideoSection channelId={channel}/>}
          {activeTab === "Shorts" && <ChannelShortsSection channelId={channel}/>}
        </div>
        
        {isModalOpen &&(
           <div className={styles.modalOverlay} onClick={handleModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않음
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalInfo}>정보</div>
              <button className={styles.closeButton} onClick={handleModal}>
                &times;
              </button>
              </div>
              <div>
                <div style={{ whiteSpace: "pre-line" }}>{detail.description}</div>
                <div>
                  <span className={styles.modalInfoName}>링크</span>

                </div>                
                <div className={styles.modalMoreInfo}>
                  <span className={styles.modalInfoName}>채널 세부정보</span>
                  <div>
                  {Object.entries(modalDetail).map(([key, value]) => 
                  value ? (
                      <ChannelMoreInfo key={key} name={key} value={value} />
                    ): null)}
                  </div>
                </div>
                <div className={styles.modalBtnDiv}>
                  <button className={styles.modalBtn}><PiShareFatLight className={styles.btnIcons}/>채널 공유</button>
                  <button className={styles.modalBtn}><IoFlagOutline className={styles.btnIcons}/>사용자 신고</button>
                </div>
              </div>
            </div>
            </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ChannelPage;
