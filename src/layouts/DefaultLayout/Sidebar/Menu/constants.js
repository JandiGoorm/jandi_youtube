import { VscHome } from "react-icons/vsc";
import { SiYoutubeshorts, SiYoutubemusic,SiYoutubekids,SiYoutubestudio } from "react-icons/si";
import { MdOutlineSubscriptions,MdOutlineFlag } from "react-icons/md";
import { RxCountdownTimer } from "react-icons/rx";
import { CgPlayList } from "react-icons/cg";
import { RiVideoLine,RiFireLine,RiShoppingBag4Line   } from "react-icons/ri";
import { LuClock4,LuGamepad  } from "react-icons/lu";
import { AiOutlineLike,AiOutlineQuestionCircle  } from "react-icons/ai";
import { TfiDownload } from "react-icons/tfi";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { BiMoviePlay } from "react-icons/bi";
import { BsBroadcast,BsBroadcastPin  } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { SlGraduation } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { BsExclamationSquare } from "react-icons/bs";

export const firstitems = [
  { icon: VscHome, label: "홈", link: "/" },
  { icon: SiYoutubeshorts, label: "Shorts", link: "/" },
  { icon: MdOutlineSubscriptions, label: "구독", link: "/feed/subscriptions" },
  { icon: SiYoutubemusic, label: "Youtube music", link: "https://music.youtube.com/" },
];

export const mypagemenuitems = [
  { icon: RxCountdownTimer, label: "시청기록", link: "/" },
  { icon: CgPlayList, label: "재생목록", link: "/" },
  { icon: RiVideoLine, label: "내 동영상", link: "/feed/subscriptions" },
  {
    icon: LuClock4,
    label: "나중에 볼 동영상",
    link: "https://music.youtube.com/",
  },
  {
    icon: AiOutlineLike,
    label: "좋아요 표시한 동영상",
    link: "/playlist?list=LL",
  },
  {
    icon: TfiDownload,
    label: "오프라인 저장 동영상",
    link: "https://music.youtube.com/",
  },
];

export const searchmenuitems = [
  { icon: RiFireLine , label: "인기 급상승", link: "/" },
  { icon: RiShoppingBag4Line , label: "쇼핑", link: "/" },
  { icon: HiOutlineMusicalNote, label: "음악", link: "/" },
  { icon: BiMoviePlay , label: "영화", link: "/" },
  { icon: BsBroadcast, label: "실시간", link: "/" },
  { icon: LuGamepad , label: "게임", link: "/" },
  { icon: GoTrophy, label: "스포츠", link: "/" },
  { icon: SlGraduation , label: "학습 프로그램", link: "/" },
  { icon: BsBroadcastPin , label: "팟캐스트", link: "/" },
];

export const plusmenuitems = [
  { icon: SiYoutubestudio , label: "Youtube 스튜디오", link: "/" },
  { icon: SiYoutubemusic , label: "Youtube Music", link: "/" },
  { icon: SiYoutubekids, label: "Youtube Kids", link: "/" },
];

export const settingmenuitems = [
  { icon: IoSettingsOutline, label: "설정", link: "/" },
  { icon: MdOutlineFlag, label: "신고 기록", link: "/" },
  { icon: AiOutlineQuestionCircle , label: "고객센터", link: "/" },
  { icon: BsExclamationSquare, label: "의견 보내기", link: "/" },
];

const menuConstants = {
  firstitems,
  mypagemenuitems,
  searchmenuitems,
  plusmenuitems,
  settingmenuitems,
};

export default menuConstants;
