import $ from 'jquery';
import albumImg from '../assets/images/icon/albums.svg';
import albumWhiteImg from '../assets/images/icon/albums-white.svg';
import albumActiveImg from '../assets/images/icon/albums-active.svg';
import bulbImg from '../assets/images/icon/bulb.svg';
import bulbWhiteImg from '../assets/images/icon/bulb-white.svg';
import bulbActiveImg from '../assets/images/icon/bulb-active.svg';
import featureImg from '../assets/images/icon/features.svg';
import featureWhiteImg from '../assets/images/icon/features-white.svg';
import featureActiveImg from '../assets/images/icon/features-active.svg';
import talkImg from '../assets/images/icon/talk.svg';
import talkWhiteImg from '../assets/images/icon/talk-white.svg';
import talkActiveImg from '../assets/images/icon/talk-active.svg';
import thumbImg from '../assets/images/icon/thumb.svg';
import thumbWhiteImg from '../assets/images/icon/thumb-white.svg';
import thumbActiveImg from '../assets/images/icon/thumb-active.svg';
import menu5Icon from '../assets/images/icon/speaker.svg';
import menu5IconWhite from '../assets/images/icon/speaker-white.svg';
import menu5IconActive from '../assets/images/icon/speaker-active.svg';
import logo from '../assets/images/test/logo.png'
import defaultImage from '../assets/images/test/default-image.png'
import { EditorState } from "draft-js"
import theme from '../styles/theme';
import axios from 'axios';

const test = true;

//export const backUrl = "http://localhost:8001";
export const backUrl = "https://mago1004.com:8443";

export const frontUrl = "https://mago1004.com";
//export const frontUrl = "http://localhost:3000";

export const logoSrc = logo;
export const defaultImageSrc = defaultImage;
//http://weare-first.com:8001
export const editorState = {
    editorState: EditorState.createEmpty()
}
export const KAKAO_CLIENT_ID = "5c686a9c9a72a12ef2ef700e07d03b31";
export const KAKAO_REDIRECT_URI = `${frontUrl}/oauth/callback/kakao`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

export const localization = {
    locale: 'ko',
}
export const zBottomMenu = [
    { name: `마사지GO!${window.innerWidth>=1000?' ▼':''}`, link: '/masterlist', icon: <img src={localStorage.getItem('dark_mode') ? bulbWhiteImg : bulbImg} className='menu-icon' alt="#" />, activeIcon: <img src={bulbActiveImg} className='menu-icon' alt="#" />, className: 'master-dropdown-btn', allowList: ['/masterlist'] },
    { name: '내주변', link: '/shop-list?is_around=1', icon: <img src={localStorage.getItem('dark_mode') ? featureWhiteImg : featureImg} className='menu-icon' alt="#" />, activeIcon: <img src={featureActiveImg} className='menu-icon' alt="#" />, className: '', allowList: ['/academylist'] },
    { name: '커뮤니티', link: '/community-list', icon: <img src={localStorage.getItem('dark_mode') ? albumWhiteImg : albumImg} className='menu-icon' alt="#" />, activeIcon: <img src={albumActiveImg} className='menu-icon' alt="#" />, className: '', allowList: ['/enrolmentlist'] },
    { name: '제휴문의', link: '/add-shop', icon: <img src={localStorage.getItem('dark_mode') ? thumbWhiteImg : thumbImg} className='menu-icon' alt="#" />, activeIcon: <img src={thumbActiveImg} className='menu-icon' alt="#" />, className: '', allowList: ['/reviewlist'] },
    { name: '고객센터', link: '/community-list', icon: <img src={localStorage.getItem('dark_mode') ? talkWhiteImg : talkImg} className='menu-icon' alt="#" />, activeIcon: <img src={talkActiveImg} className='menu-icon' alt="#" />, className: 'service-dropdown-btn', allowList: ['/servicecenter'] },
];

export const axiosInstance = axios.create({
    baseURL: `/`,
    timeout: 30000,
});

export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const needTwoImage = ['issue', 'theme', 'feature'];


export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const getCommunityCategoryFormat = (en, ko) =>{
    return {
        en: en,
        ko: ko
    }
}
export const objCommunityCategory = {
    manager:[
        getCommunityCategoryFormat('request','문의'),
        getCommunityCategoryFormat('faq','FAQ'),
        getCommunityCategoryFormat('notice','공지사항'),
    ],
    user:[
        getCommunityCategoryFormat('freeboard','자유게시판'),
        getCommunityCategoryFormat('question','질문게시판'),
        getCommunityCategoryFormat('humor','유머게시판'),
        getCommunityCategoryFormat('news','마사지소식'),
        getCommunityCategoryFormat('party','파티모집'),
    ],
    shop:[
        getCommunityCategoryFormat('shop_review','업체후기'),
        getCommunityCategoryFormat('shop_event','업체이벤트'),
    ]
}
export const slideSetting = (num) => {
    return {
        infinite: false,
        dots: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1.15,
        slidesToScroll: 1,
        breakpoint: 480,
        beforeChange(oldIndex, newIndex) {
            $(`.slider${num} > ul.slick-dots > li:nth-child(${(oldIndex % 1 == 0 ? oldIndex : parseInt(oldIndex) + 1) + 1})`).removeClass('slick-active');
            $(`.slider${num} > ul.slick-dots > li:nth-child(${(newIndex % 1 == 0 ? newIndex : parseInt(newIndex) + 1) + 1})`).addClass('slick-active');
        }
    }

}