import {
  FaBed,
  FaWater,
  FaMountain,
  FaFire,
  FaTree,
  FaWifi,
  FaCar,
  FaHeart,
  FaBirthdayCake,
  FaMusic,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaCheck,
  FaUsers,
  FaCalendarAlt,
} from 'react-icons/fa';
import {
  MdSpa,
  MdRestaurant,
  MdBusinessCenter,
  MdHeadset,
  MdEmail,
  MdChat,
  MdSchedule,
  MdLocationOn,
  MdSend,
} from 'react-icons/md';
import {
  IoClose,
  IoChevronDown,
  IoChevronBack,
  IoChevronForward,
  IoChevronUp,
  IoPlayCircle,
} from 'react-icons/io5';
import { BsZoomIn, BsQuote, BsPlus, BsDash } from 'react-icons/bs';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoIosArrowUp } from 'react-icons/io';
import { GiPartyPopper } from 'react-icons/gi';

const ICONS = {
  // Amenities
  Bed: FaBed,
  Waves: FaWater,
  UtensilsCrossed: MdRestaurant,
  Mountain: FaMountain,
  Flame: FaFire,
  Trees: FaTree,
  Wifi: FaWifi,
  Car: FaCar,
  PartHall:GiPartyPopper,
  // Events
  Heart: FaHeart,
  Briefcase: MdBusinessCenter,
  Cake: FaBirthdayCake,
  Music: FaMusic,

  // Social
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Twitter: FaTwitter,
  Youtube: FaYoutube,

  // Contact / info
  Phone: FaPhone,
  Mail: FaEnvelope,
  Email: MdEmail,
  MapPin: MdLocationOn,
  Navigation: MdLocationOn,
  Send: MdSend,
  Headphones: MdHeadset,
  MessageSquare: MdChat,
  Clock: MdSchedule,
  Calendar: MdSchedule,
  CalendarDays: FaCalendarAlt,

  // UI
  Menu: HiMenuAlt3,
  X: IoClose,
  ChevronDown: IoChevronDown,
  ChevronUp: IoChevronUp,
  ChevronLeft: IoChevronBack,
  ChevronRight: IoChevronForward,
  ArrowUp: IoIosArrowUp,
  ArrowRight: FaArrowRight,
  ZoomIn: BsZoomIn,
  Quote: BsQuote,
  Plus: BsPlus,
  Minus: BsDash,
  Play: IoPlayCircle,

  // Status / feedback
  Star: FaStar,
  Sparkles: MdSpa,
  CheckCircle: FaCheckCircle,
  AlertCircle: FaExclamationCircle,
  Check: FaCheck,
  Users: FaUsers,
};

export default function IconMap({ name, className = '', size = 20, ...props }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} {...props} />;
}

export { FaWhatsapp };
