// Responsive image registry: room images carry srcset/width/height, the hero
// (OUTLOOK_IMG) is served from /public so it can be preloaded. See utils/images.js.
import { ROOM_IMG, OUTLOOK_IMG, SIZES } from './images';
import wineDineNight from '../assets/wine_dine_night.webp';

export const RESORT = {
  name: 'Red Fort Resort',
  shortName: 'Red Fort',
  tagline: 'Luxury Heritage Retreat',
  phone: '+91 98945 11911',
  phoneSecondary: '+91 98945 11744',
  email: 'hello@redfort.com',
  whatsapp: '919894511911',
  whatsappUrl: 'https://wa.me/919894511911',
  address: 'High school, 112, Vellimedu Via, Siruvani Main Rd, Alanthurai, Coimbatore, Tamil Nadu - 641101',
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d930.8093314137143!2d76.8088344!3d10.95962!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8674cdab52a1f%3A0xaa41d2285b6313be!2sRed%20Fort%20Resort!5e1!3m2!1sen!2sin!4v1780147975020!5m2!1sen!2sin",
  directionsUrl: 'https://maps.google.com/?q=Red+Fort+Resort',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'gallery', label: 'Gallery', href: '#gallery' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'amenities', label: 'Amenities', href: '#amenities' },
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const HERO_SLIDES = [
  {
    image: OUTLOOK_IMG.src,
    srcSet: OUTLOOK_IMG.srcSet,
    sizes: SIZES.hero,
    alt: 'Red Fort Resort pool and hillside outlook',
    width: OUTLOOK_IMG.width,
    height: OUTLOOK_IMG.height,
  },
  {
    image: ROOM_IMG.room1.src,
    srcSet: ROOM_IMG.room1.srcSet,
    sizes: SIZES.hero,
    alt: 'Premium heritage suite interior',
    width: ROOM_IMG.room1.width,
    height: ROOM_IMG.room1.height,
  },
];

/** Our Story section — local resort photography */
export const ABOUT_IMAGES = [
  {
    ...OUTLOOK_IMG,
    sizes: SIZES.aboutPrimary,
    alt: 'Red Fort Resort nestled in the Siruvani hills',
  },
  {
    ...ROOM_IMG.room2,
    sizes: SIZES.aboutSecondary,
    alt: 'Luxury room with heritage brick interiors',
  },
];

export const STATS = [
  { label: 'Happy Guests', value: 12500, suffix: '+' },
  { label: 'Luxury Rooms', value: 16, suffix: '' },
  { label: 'Years of Excellence', value: 7, suffix: '+' },
  { label: 'Events Hosted', value: 124, suffix: '+' },
];

export const AMENITIES = [
  { icon: 'Bed', title: 'Luxury Rooms', desc: 'Spacious suites with bespoke interiors.' },
  { icon: 'Flame', title: 'Campfire Nights', desc: 'Starlit gatherings with live acoustic performances.' },
  { icon: 'Trees', title: 'Nature Views', desc: 'Open green landscapes, offering a peaceful escape into nature.' },
  { icon: 'Wifi', title: 'Free WiFi', desc: 'High-speed connectivity across the entire property.' },
  { icon: 'Car', title: 'Spacious Parking', desc: 'Spacious car parking' },
  {
    icon: "PartHall",
    title: "Event & Party Hall",
    desc: "Perfect venue for birthdays, weddings, and celebrations.",
  },
];

export const GALLERY_CATEGORIES = ['All', 'Rooms', 'Dining', 'Nature', 'Events'];

export const GALLERY_IMAGES = [
  { ...ROOM_IMG.room1, sizes: SIZES.galleryTile, category: 'Rooms', alt: 'Premium guest room with elegant bedding at Red Fort Resort' },
  { ...ROOM_IMG.room2, sizes: SIZES.galleryTile, category: 'Rooms', alt: 'Heritage brick suite with luxury comforts, Red Fort Resort Coimbatore' },
  { ...ROOM_IMG.room3, sizes: SIZES.galleryTile, category: 'Rooms', alt: 'Spacious resort bedroom with valley views' },
  { ...ROOM_IMG.room4, sizes: SIZES.galleryTile, category: 'Rooms', alt: 'Deluxe king accommodation at Red Fort Resort' },
  { ...ROOM_IMG.room5, sizes: SIZES.galleryTile, category: 'Rooms', alt: 'Comfortable family-friendly room near Siruvani Hills' },
  { ...OUTLOOK_IMG, sizes: SIZES.galleryTile, category: 'Nature', alt: 'Hillside nature views near Siruvani from Red Fort Resort' },
  { ...ROOM_IMG.room4, sizes: SIZES.galleryTile, category: 'Dining', alt: 'In-room dining and lounge space' },
  { ...ROOM_IMG.room3, sizes: SIZES.galleryTile, category: 'Dining', alt: 'Private in-suite dining setup' },
  { ...OUTLOOK_IMG, sizes: SIZES.galleryTile, category: 'Events', alt: 'Outdoor gatherings with valley views at Red Fort Resort' },
];

export const SHORT_VIDEOS = [
  {
    title: 'Sunrise Yoga Deck',
    poster: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-on-a-mountain-3280-large.mp4',
  },
  {
    title: 'Chef\'s Table Experience',
    poster: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-437-large.mp4',
  },
  {
    title: 'Forest Trail Adventure',
    poster: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hiking-through-a-forest-1273-large.mp4',
  },
  {
    title: 'Wine & Dine Night',
    poster: wineDineNight,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-wine-and-dine-night-437-large.mp4',
  },
];

export const EVENT_TYPES = [
  {
    icon: 'Heart',
    title: 'Dream Weddings',
    desc: 'Enchanting ceremonies with floral arches, live music, and bespoke menus.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    icon: 'Briefcase',
    title: 'Corporate Retreats',
    desc: 'Executive meetings, team-building, and premium conference facilities.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  },
  {
    icon: 'Cake',
    title: 'Birthday Celebrations',
    desc: 'Personalized décor, themed cakes, and private celebration lounges.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  },
  {
    icon: 'Music',
    title: 'Music Nights',
    desc: 'Live bands, DJ sets, and acoustic sessions under the stars.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  },
];


export const UPCOMING_EVENTS = [
  { date: 'Jun 14', title: 'Summer Jazz Under the Stars', type: 'Music Night' },
  { date: 'Jun 28', title: 'Wellness & Wine Weekend', type: 'Special Event' },
  { date: 'Jul 12', title: 'Monsoon Wedding Showcase', type: 'Wedding Expo' },
  { date: 'Aug 02', title: 'Corporate Leadership Summit', type: 'Corporate' },
];

export const NEARBY_PLACES = [
  {
    name: 'Isha Yoga Center & Dhyanalinga',
    distance: '25 km',
    time: '36 min',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Isha_Yoga_center.jpg',
    mapsUrl: 'https://maps.google.com/?q=Isha+Yoga+Center+Coimbatore',
  },
  {
    name: 'Kovai Kutralam Falls',
    distance: '28 km',
    time: '45 min',
    image: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/6/2026/01/13125541/kovai-coimbatore.jpeg',
    mapsUrl: 'https://maps.google.com/?q=Kovai+Kutralam+Falls+Coimbatore',
  },
  {
    name: 'Siruvani Dam',
    distance: '33 km',
    time: '55 min',
    image: 'https://cf-images.assettype.com/tnm/import/sites/default/files/siruvani3x2.jpg?w=1200&h=900&auto=format%2Ccompress&fit=max&enlarge=true',
    mapsUrl: 'https://maps.google.com/?q=Siruvani+Dam+Coimbatore',
  },
  {
    name: 'Marudhamalai Temple',
    distance: '18 km',
    time: '30 min',
    image: 'https://yatramantra.com/wp-content/uploads/2019/08/Marudhamalai_Temple.png',
    mapsUrl: 'https://maps.google.com/?q=Marudhamalai+Temple+Coimbatore',
  },
  {
    name: 'Perur Pateeswarar Temple',
    distance: '9 km',
    time: '20 min',
    image: 'https://s7ap1.scene7.com/is/image/incredibleindia/perur-pateeswarar-temple-coimbatore-tamil%20nadu-attr-about?qlt=82&ts=1726654103647',
    mapsUrl: 'https://maps.google.com/?q=Perur+Pateeswarar+Temple+Coimbatore',
  },
  {
    name: 'Eachanari Vinayagar Temple',
    distance: '11 km',
    time: '25 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCcTiLfyDpGoIUdZ81QD7SL5eUKaaY96Wh1g&s',
    mapsUrl: 'https://maps.google.com/?q=Eachanari+Vinayagar+Temple+Coimbatore',
  },
  {
    name: 'Gedee Car Museum',
    distance: '3 km',
    time: '10 min',
    image: 'https://gedeecarmuseum.com/wp-content/uploads/2015/09/bg2.jpg',
    mapsUrl: 'https://maps.google.com/?q=Gedee+Car+Museum+Coimbatore',
  },
  {
    name: 'Semmozhi Poonga',
    distance: '18 km',
    time: '30 min',
    image: 'https://cf-images.assettype.com/newindianexpress%2F2025-11-25%2F5uoht6xs%2F1_1_semmozhipark8_2511cbe_3.jpg?rect=0%2C69%2C805%2C453',
    mapsUrl: 'https://maps.google.com/?q=Semmozhi+Poonga+-+Coimbatore,+Tamil+Nadu',
  },
  {
    name: 'Gass Forest Museum',
    distance: '4 km',
    time: '12 min',
    image: 'https://tnpmcbe.in/images/Forest-Musuem-2.jpg',
    mapsUrl: 'https://maps.google.com/?q=Gass+Forest+Museum+Coimbatore',
  },
  {
    name: 'TNAU Botanical Garden',
    distance: '6 km',
    time: '15 min',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80',
    mapsUrl: 'https://maps.google.com/?q=TNAU+Botanical+Garden+Coimbatore',
  },
  {
    name: 'Kovai Kondattam',
    distance: '12 km',
    time: '25 min',
    image: 'https://i.ytimg.com/vi/I-O-h7GEel0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAbRNztreujpi96Um_AGWd3AfudcA',
    mapsUrl: 'https://maps.google.com/?q=Kovai+Kondattam+Coimbatore',
  },
  {
    name: 'Black Thunder Water Theme Park',
    distance: '40 km',
    time: '1 hr',
    image: 'https://d3fphkxyf5o5bm.cloudfront.net/image-resize/format=webp,w=1200/QwRY54Li1HMwD7oNfp5QYlCuL9wn0uryCE2mA2OPQr',
    mapsUrl: 'https://maps.google.com/?q=Black+Thunder+Theme+Park+Mettupalayam',
  },
  {
    name: 'Monkey Falls',
    distance: '65 km',
    time: '1 hr 30 min',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Monkey_falls5.JPG',
    mapsUrl: 'https://maps.google.com/?q=Monkey+Falls+Coimbatore',
  },
  {
    name: 'Aliyar Dam',
    distance: '62 km',
    time: '1 hr 20 min',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aliyar-Dam.JPG',
    mapsUrl: 'https://maps.google.com/?q=Aliyar+Dam+Coimbatore',
  },
  {
    name: 'Valparai Hills',
    distance: '105 km',
    time: '3 hr',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Valparai_GhatRoad.JPG',
    mapsUrl: 'https://maps.google.com/?q=Valparai+Hills+Coimbatore',
  },  
  {
    name: 'Velingiri Hills',
    distance: '28 km',
    time: '1 hr',
    image: 'https://cf-images.assettype.com/newindianexpress/2024-04/b8aaf5be-3c0c-41b2-92ba-58073a4a3ad0/Medical_camp.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
    mapsUrl: 'https://maps.google.com/?q=Velingiri+Hills+Coimbatore',
  }
];

export const FAQS = [
  {
    q: 'What are the check-in and check-out times?',
    a: 'Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are available upon request, subject to availability.',
  },
  {
    q: 'Do you offer airport transfers?',
    a: 'Yes, we provide premium chauffeur transfers from Cochin International Airport. Please contact our concierge at least 48 hours before arrival.',
  },
  {
    q: 'Is the resort family-friendly?',
    a: 'Absolutely. We offer family suites, a kids\' activity zone, babysitting services, and child-friendly dining options.',
  },
  {
    q: 'Can I host a wedding at Red Fort Resort?',
    a: 'We specialize in destination weddings with dedicated planners, customizable packages, and stunning outdoor venues for up to 300 guests.',
  },
  {
    q: 'What dining options are available?',
    a: 'Guests enjoy our signature restaurant, in-room dining 24/7, and private chef experiences for special occasions.',
  },
  {
    q: 'Is there a cancellation policy?',
    a: 'Free cancellation up to 7 days before arrival. Cancellations within 7 days incur a one-night charge. Peak season terms may vary.',
  },
];

export const SOCIAL_LINKS = [
  { platform: 'Instagram', url: 'https://instagram.com/redfort_resort', icon: 'Instagram' },
  { platform: 'Facebook', url: 'https://facebook.com/redfort_resort', icon: 'Facebook' },
  { platform: 'Twitter', url: 'https://twitter.com/redfort_resort', icon: 'Twitter' },
  { platform: 'Youtube', url: 'https://youtube.com/redfort_resort', icon: 'Youtube' },
];

export const FOOTER_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
