import { PiShareFatLight } from "react-icons/pi";

import {
  PiArrowLineDownThin,
  PiBookmarkSimpleThin,
  PiScissorsLight,
} from "react-icons/pi";

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
