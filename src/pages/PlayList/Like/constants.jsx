import {
  MdOutlinePlaylistPlay,
  MdAccessTime,
  MdBookmarkBorder,
  MdOutlineFileDownload,
  MdOutlineShare,
} from "react-icons/md";

export const videoDropdownOptions = [
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
