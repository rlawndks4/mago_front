import { logoSrc, backUrl } from "../Data";
import { EditorState } from "draft-js"
import { columnObjFormat, editContentFormat, sidebarContentFormat, sidebarObjFormat, sidebarObjListFormat } from "./ManagerContentFormat";
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsPerson, BsCameraVideo, BsAlarm, BsGraphUp } from 'react-icons/bs'
import { MdOutlineAccessTime, MdNotificationImportant, MdOutlineFeaturedPlayList, MdOutlineStickyNote2 } from 'react-icons/md'
import { IoStatsChartSharp, IoLogoReact } from 'react-icons/io5'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { AiOutlineQuestionCircle, AiOutlineRotateLeft, AiOutlineComment } from 'react-icons/ai'
import { WiDayHaze } from 'react-icons/wi'
import { SiMicrostrategy } from 'react-icons/si'
import { BiCommentDetail } from 'react-icons/bi'
import { GoRepoPush } from 'react-icons/go'
export const editorState = {
    editorState: EditorState.createEmpty()
}

export const cardDefaultColor = {
    font: "#000",
    background: "#f4f4f4"
}
export const needTwoImage = ['issue', 'theme', 'feature'];


export const zSidebar = [
    { name: '회원관리', link: '/manager/list/user', icon: <BsPerson />, level: 40, allow_list: ['/manager/list/user'], schema: 'user' },
    { name: '회원통계', link: '/manager/list/user_statistics', icon: <BsGraphUp />, level: 40, allow_list: ['/manager/list/user_statistics'], schema: 'user_statistics' },
    { name: '전문가관리', link: '/manager/list/master', icon: <FaChalkboardTeacher />, level: 40, allow_list: ['/manager/list/master'], schema: 'master' },
    { name: '배너관리', link: '/manager/edit/setting', icon: <AiOutlineRotateLeft />, level: 40, allow_list: ['/manager/edit/setting'], schema: 'setting' },
    { name: '강의관리', link: '/manager/list/academy_category', icon: <MdOutlineStickyNote2 />, level: 40, allow_list: ['/manager/list/academy_category'], schema: 'academy_category' },
    { name: '강의컨텐츠관리', link: '/manager/list/academy', icon: <MdOutlineStickyNote2 />, level: 40, allow_list: ['/manager/list/academy'], schema: 'academy' },
    { name: '댓글관리', link: '/manager/list/comment', icon: <BiCommentDetail />, level: 40, allow_list: ['/manager/list/comment'], schema: 'comment' },
    { name: '결제내역관리', link: '/manager/list/subscribe', icon: <BiCommentDetail />, level: 40, allow_list: ['/manager/list/subscribe'], schema: 'subscribe' },
    { name: '문의관리', link: '/manager/list/request', icon: <BiCommentDetail />, level: 40, allow_list: ['/manager/list/request'], schema: 'request' },
    { name: 'FAQ관리', link: '/manager/list/faq', icon: <BiCommentDetail />, level: 40, allow_list: ['/manager/list/faq'], schema: '' },
    { name: '이벤트관리', link: '/manager/list/event', icon: <IoLogoReact />, level: 30, allow_list: ['/manager/list/event'], schema: '' },
    { name: '공지사항', link: '/manager/list/notice', icon: <AiOutlineQuestionCircle />, level: 30, allow_list: ['/manager/list/notice'], schema: '' },
    { name: '푸시알림', link: '/manager/list/alarm', icon: <BsAlarm />, level: 30, allow_list: ['/manager/list/alarm'], schema: '' },
    { name: '팝업관리', link: '/manager/list/popup', icon: <GoRepoPush />, level: 30, allow_list: ['/manager/list/popup'], schema: '' },
];

export const objManagerListContent = {
    user: sidebarObjFormat(
        '회원 리스트',
        'user',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    user_statistics: sidebarObjFormat(
        '회원 통계',
        'user_statistics',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    master: sidebarObjFormat(
        '전문가 리스트',
        'user',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        ['level=30'],
        true,
        false),
    academy_category: sidebarObjFormat(
        '강의 관리',
        'academy_category',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    academy: sidebarObjFormat(
        '강의 컨텐츠 관리',
        'academy',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    comment: sidebarObjFormat(
        '댓글 관리',
        'comment',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    subscribe: sidebarObjFormat(
        '결제 내역 관리',
        'subscribe',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    request: sidebarObjFormat(
        '문의 관리',
        'request',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    faq: sidebarObjFormat(
        'FAQ 관리',
        'faq',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    event: sidebarObjFormat(
        '이벤트 관리',
        'event',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    notice: sidebarObjFormat(
        '공지 관리',
        'notice',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    alarm: sidebarObjFormat(
        '푸시알림 관리',
        'alarm',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    popup: sidebarObjFormat(
        '팝업 관리',
        'popup',
        [
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('정보수정', '', 'edit', 'edit'),
            columnObjFormat('정보수정', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
}
export const getManagerListApi = (table, num) => {
    let str = "";
    return str;
}
export const slideSetting = {
    infinite: false,
    dots: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 2500,
    slidesToShow: 1.15,
    slidesToScroll: 1,
    breakpoint: 480,
    beforeChange: (current, next) => { console.log(current) },
    afterChange: current => { console.log(current) },
}
export const managerNoteObj = {
    DAILY_PAYMENT_PROBABILITY: "데일리 지급 확률이 수정 되었습니다.",
    ADD_USER: "회원이 추가 되었습니다.",
    UPDATE_USER: "회원 정보가 수정 되었습니다.",
    UPDATE_USER_MONEY: "회원 머니가 수정 되었습니다.",
    ADD_MAIN_BANNER: "메인 배너가 추가 되었습니다.",
    UPDATE_MAIN_BANNER: "메인 배너가 수정 되었습니다.",
    ADD_NOTICE: "공지가 추가 되었습니다.",
    UPDATE_NOTICE: "공지가 수정 되었습니다.",
    ADD_MARKETING: "매출이 추가 되었습니다.",
    UPDATE_MARKETING: "매출이 수정 되었습니다.",
    ADD_COUPON_CATEGORY: "쿠폰 카테고리가 추가 되었습니다.",
    UPDATE_COUPON_CATEGORY: "쿠폰 카테고리가 수정 되었습니다.",
    ADD_COUPON_BRAND: "쿠폰 브랜드가 추가 되었습니다.",
    UPDATE_COUPON_BRAND: "쿠폰 브랜드가 수정 되었습니다.",
    ADD_COUPON: "쿠폰 상품이 추가 되었습니다.",
    UPDATE_COUPON: "쿠폰 상품이 수정 되었습니다.",
    ADD_OUTLET_CATEGORY: "아울렛 카테고리가 추가 되었습니다.",
    UPDATE_OUTLET_CATEGORY: "아울렛 카테고리가 수정 되었습니다.",
    ADD_OUTLET_BRAND: "아울렛 브랜드가 추가 되었습니다.",
    UPDATE_OUTLET_BRAND: "아울렛 브랜드가 수정 되었습니다.",
    ADD_OUTLET: "아울렛 상품이 추가 되었습니다.",
    UPDATE_OUTLET: "아울렛 상품이 수정 되었습니다.",
}
export { backUrl };