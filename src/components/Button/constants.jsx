import {
  TbBellRingingFilled,
  TbBell,
  TbBellOff,
  TbUserX,
} from "react-icons/tb";

export const subscriptionDropdownOptions = [
  {
    icons: <TbBellRingingFilled size={24} />,
    label: "전체",
  },
  {
    icons: <TbBell size={24} />,
    label: "맞춤설정",
  },
  {
    icons: <TbBellOff size={24} />,
    label: "없음",
  },
  {
    icons: <TbUserX size={24} />,
    label: "구독 취소",
  },
];
