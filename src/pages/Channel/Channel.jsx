import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import styles from "./Channel.module.css";
import YoutubeService from "../../apis/youtube";

const ChannelPage = () => {
  const { channel } = useParams(); // URL에서 채널 ID를 가져옵니다.
  const [activeTab, setActiveTab] = useState("홈");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = ["홈", "동영상", "Shorts","재생목록","커뮤니티","스토어"]

  const fetchChannel = async () =>{
    try{
      const response = await YoutubeService.fetchChannel();
      console.log(response);
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
    console.log(channel);
    fetchChannel();
  },[channel]);

  return (
    <DefaultLayout>
      <div className={styles.channelPage}>
        {/* 배너 */}
        <div className={styles.channelBanner}>
        <img
          src="https://via.placeholder.com/1920x300"
          alt="Channel Banner"
          className={styles.bannerImage}
        />
        </div>
        {/* 채널 정보 */}
        <div className={styles.channelHeader}>    
          <div className={styles.avatarDiv}>
            <img 
            src="https://via.placeholder.com/160"
            alt="channel Avata"
            className={styles.channelAvata}
            />
          </div>
         <div className={styles.channelInfoDiv}>
          <div className={styles.channelName}>
            <span>1분요리 뚝딱이형</span>
          </div>
          <div className={styles.channelBasic}>
            <span className={styles.channelId}>@1mincook</span>
            <span>﹒</span>
            <span>구독자 295만명</span>
            <span>﹒</span>
            <span> 동영상 1.6천개</span>
          </div>
          <div className={styles.channelInfo}>
            <span className={styles.channelInfoP} onClick={()=> handleModal()}>한국인이 좋아하는 편집속도에 맞춘 1분요리 영상을 업로드합니다.</span>
            <span className={styles.moreInfo} onClick={()=> handleModal()}>...더보기</span>
          </div>
          <div className={styles.subscribeDiv}>
            <button>구독중</button>
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
          {activeTab === "홈" && <p>홈화면</p>}
          {activeTab === "동영상" && <p>Videos content goes here...</p>}
        </div>
        
        {isModalOpen && (
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
                <div>dasfadsfadsfadsf</div>
                <span className={styles.modalInfo}>링크</span>
                <div className={styles.modalMoreInfo}>
                  <span className={styles.modalInfo}>채널 세부정보</span>
                </div>
                <div className={styles.modalBtnDiv}>
                  
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
