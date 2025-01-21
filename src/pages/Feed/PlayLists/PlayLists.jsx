import {  useState, useEffect } from "react";
import YoutubeService from "../../../apis/youtube";
import DefaultLayout from "../../../layouts/DefaultLayout/DefaultLayout";
import styles from "./Playlists.module.css";
import { FaPlay } from "react-icons/fa";
import { CgPlayList } from "react-icons/cg";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../components/DropDown/DropDown";

const FeedplayListsPage = () => {
  const [lists, setLists] = useState([]);
  
  const fetchChannelVideos = async () =>{
    try{
      const response = await YoutubeService.fetchPlayLists({
        part: "snippet,contentDetails",
        mine: true,
      });
      const data = response.data.items;
      console.log(data);

      setLists(data);
    }catch(error){
      console.log("error: "+ error);
    }
  }

  useEffect(()=> {
    fetchChannelVideos();
  },[]);

  return (
    <DefaultLayout>
      <div className={styles.container} >
        <div className={styles.headerContainer} >
          <h1 className={styles.header}>재생목록</h1>
        </div>
        <div className={styles.subscribeDiv}>
          <DropDown>
          <DropDownTrigger>
            <button className={styles.subscribe_btn}>
              <span>최신순</span>
            </button>
          </DropDownTrigger>
          <DropDownContent>
            <div className={styles.dropdown_content}>
              <button>
                <span>가나다순</span>
              </button>
              <button>
                <span>최신순</span>
              </button>
            </div>
          </DropDownContent>
        </DropDown>
          </div>
        <div className={styles.playListContainer}>
          <ul className={styles.video_list}>
            {lists.map((list) => (
              <li className={styles.video_item} key={list.id}>
                <div>
                  <img
                    className={styles.video_thumbnail}
                    src={list.snippet.thumbnails.medium.url}
                    alt={list.snippet.localized.title}
                  />
                  <p className={styles.video_duration}><CgPlayList className={styles.duration_icon}/> 동영상{list.contentDetails.itemCount} 개</p>
                  <div className={styles.hover_overlay}><FaPlay /> 모두 재생</div>
                </div>
                <div className={styles.video_description}>
                  <p className={styles.video_title}>{list.snippet.localized.title}</p>
                  <p className={styles.video_sub}>모든 재생목록 보기</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FeedplayListsPage;
