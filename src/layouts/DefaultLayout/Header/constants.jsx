import { RiShieldUserLine, RiMoonLine } from "react-icons/ri";
import { IoLanguageOutline } from "react-icons/io5";
import { TbShieldStar } from "react-icons/tb";
import { GrLanguage } from "react-icons/gr";
import { CiKeyboard } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { LuMessageSquareWarning } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { BsCollectionPlay } from "react-icons/bs";
import { FaSquareParking } from "react-icons/fa6";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { PiNotePencilThin } from "react-icons/pi";

export const publicMenuOptions = [
  {
    icon: <RiShieldUserLine size={24} />,
    text: "Youtube의 내 데이터",
  },
  {
    icon: <RiMoonLine size={22} />,
    text: "디자인: 기기 테마",
  },
  {
    icon: <IoLanguageOutline size={22} />,
    text: "언어: 한국어",
  },
  {
    icon: <TbShieldStar size={22} />,
    text: "제한 모드: 사용 안함",
  },
  {
    icon: <GrLanguage size={20} />,
    text: "위치: 한국",
  },
  {
    icon: <CiKeyboard size={24} />,
    text: "단축키",
  },
  {
    icon: <IoSettingsOutline size={22} />,
    text: "설정",
  },
  {
    icon: <GoQuestion size={22} />,
    text: "고객센터",
  },
  {
    icon: <LuMessageSquareWarning size={22} />,
    text: "의견 보내기",
  },
];

export const authMenuOptions = [
  {
    icon: <FaGoogle size={22} />,
    text: "Google 계정",
  },
  {
    icon: <MdOutlineSwitchAccount size={22} />,
    text: "계정 전환",
  },
  {
    icon: <CiLogin size={22} />,
    text: "로그아웃",
  },
];

export const premiumMenuOptions = [
  {
    icon: <BsCollectionPlay size={22} />,
    text: "YouTube 스튜디오",
  },
  {
    icon: <FaSquareParking size={22} color="rgb(231, 46, 46)" />,
    text: "내 Premium 혜택",
  },
  {
    icon: <AiOutlineDollarCircle size={22} />,
    text: "구매 항목 및 멤버십",
  },
];

export const videoMenuoptions = [
  {
    icon: <AiOutlinePlaySquare size={22} />,
    text: "동영상 업로드",
  },
  {
    icon: <HiOutlineStatusOnline size={22} />,
    text: "라이브 스트리밍 시작",
  },
  {
    icon: <PiNotePencilThin size={22} />,
    text: "게시물 작성",
  },
];
