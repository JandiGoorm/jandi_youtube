import { PiShareFatLight } from "react-icons/pi";

import {
  PiArrowLineDownThin,
  PiBookmarkSimpleThin,
  PiScissorsLight,
} from "react-icons/pi";
import {
  MdOutlinePlaylistPlay,
  MdAccessTime,
  MdBookmarkBorder,
  MdOutlineFileDownload,
  MdOutlineShare,
} from "react-icons/md";
import { PiFlagThin } from "react-icons/pi";
import { VscCircleSlash } from "react-icons/vsc";
import { BiMinusCircle } from "react-icons/bi";

export const commentOrderOptions = {
  관련성순: "relevance",
  최신순: "time",
};

export const videoInfoButtons = [
  {
    icon: <PiShareFatLight size={20} />,
    text: "공유",
  },
  {
    icon: <PiArrowLineDownThin size={20} />,
    text: "오프라인 저장",
  },
  {
    icon: <PiScissorsLight size={20} />,
    text: "클립",
  },
  {
    icon: <PiBookmarkSimpleThin size={20} />,
    text: "저장",
  },
];

export const recommendDropdownVideoOptions = [
  {
    icon: <MdOutlinePlaylistPlay size={24} />,
    text: "현재 재생목록에 추가",
  },
  {
    icon: <MdAccessTime size={24} />,
    text: "나중에 볼 동영상에 저장",
  },
  {
    icon: <MdBookmarkBorder size={24} />,
    text: "재생목록에 저장",
  },
  {
    icon: <MdOutlineFileDownload size={24} />,
    text: "오프라인 저장",
  },
  {
    icon: <MdOutlineShare size={24} />,
    text: "공유",
  },
];

export const recommendDropdownChannelOptions = [
  {
    icon: <VscCircleSlash size={24} />,
    text: "관심 없음",
  },
  {
    icon: <BiMinusCircle size={24} />,
    text: "채널 추천 안함",
  },
  {
    icon: <PiFlagThin size={24} />,
    text: "신고",
  },
];
