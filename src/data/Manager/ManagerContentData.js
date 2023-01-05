import { logoSrc, backUrl } from "../Data";
import { EditorState } from "draft-js"
import { columnObjFormat, editColumnObjFormat, editContentFormat, sidebarContentFormat, sidebarObjFormat, sidebarObjListFormat } from "./ManagerContentFormat";
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
    { name: '기본설정', link: '/manager/edit/setting', icon: <AiOutlineRotateLeft />, level: 40, allow_list: ['/manager/edit/setting'], schema: 'setting' },
    { name: '퍼스트앱관리', link: '/manager/list/app', icon: <MdOutlineStickyNote2 />, level: 40, allow_list: ['/manager/list/app'], schema: 'app' },
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
export const zSidebarSubMenu = {
    setting: [
        { name: '공통', link: '/manager/edit/common_setting/1' },
        { name: '홈', link: '/manager/edit/home_setting/1' },
        { name: '수강신청', link: '/manager/edit/enrolment_setting/1' },
    ]
}
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
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    app: sidebarObjFormat(
        '퍼스트앱 리스트',
        'app',
        [
            columnObjFormat('앱아이콘', '', 'img', 'main_img'),
            columnObjFormat('앱이름', '', 'text', 'name'),
            columnObjFormat('링크', '', 'text', 'link'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
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
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    master: sidebarObjFormat(
        '전문가 리스트',
        'user',
        [
            columnObjFormat('프로필이미지', '', 'img', 'profile_img'),
            columnObjFormat('로그인타입', '', 'login_type', 'type'),
            columnObjFormat('아이디', '', 'text', 'id'),
            columnObjFormat('이름', '', 'text', 'name'),
            columnObjFormat('폰번호', '', 'text', 'phone'),
            columnObjFormat('접근권한', '', 'level', 'user_level'),
            columnObjFormat('가입일', '', 'text', 'date'),
            columnObjFormat('로그인시간', '', 'text', 'last_login'),
            columnObjFormat('수정', '', 'master_edit', 'master_edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        ['level=30'],
        true,
        true),
    academy_category: sidebarObjFormat(
        '강의 관리',
        'academy_category',
        [
            columnObjFormat('메인배너', '', 'img', 'main_img'),
            columnObjFormat('강사', '', 'text', 'master_nickname'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('난이도', '', 'text', 'difficulty'),
            columnObjFormat('수강기간', '', 'text', 'period'),
            columnObjFormat('정가', '', 'number', 'price'),
            columnObjFormat('할인율', '', 'text', 'discount_percent'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('BEST', '', 'status', 'is_best'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('컨텐츠추가', '', 'add_academy', 'add_academy'),
            columnObjFormat('강의컨텐츠리스트', '', 'academy_list', 'academy_list'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    academy: sidebarObjFormat(
        '강의 컨텐츠 관리',
        'academy',
        [
            columnObjFormat('메인이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('추가일', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        true,
        '100%',
        'category_pk'),
    comment: sidebarObjFormat(
        '댓글 관리',
        'comment',
        [
            columnObjFormat('카테고리', '', 'category_type', 'category_pk'),
            columnObjFormat('제목', '', 'text', 'item_title'),
            columnObjFormat('닉네임', '', 'text', 'nickname'),
            columnObjFormat('생성일', '', 'text', 'date'),
            columnObjFormat('댓글', '', 'text', 'note'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        false),
    subscribe: sidebarObjFormat(
        '결제 내역 관리',
        'subscribe',
        [
            columnObjFormat('유저아이디', '', 'text', 'id'),
            columnObjFormat('유저닉네임', '', 'text', 'nickname'),
            columnObjFormat('수강강의', '', 'text', 'title'),
            columnObjFormat('강사', '', 'text', 'master_nickname'),
            columnObjFormat('결제금액', '', 'number', 'price'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('이용종료일', '', 'text', 'end_date'),
        ],
        ['status=1'],
        false,
        false),
    request: sidebarObjFormat(
        '문의 관리',
        'request',
        [
            columnObjFormat('문의자아이디', '', 'text', 'id'),
            columnObjFormat('문의자닉네임', '', 'text', 'nickname'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('확인여부', '', 'request_status', 'request_status'),
            columnObjFormat('문의날짜', '', 'text', 'date'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        false,
        false),
    faq: sidebarObjFormat(
        'FAQ 관리',
        'faq',
        [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    event: sidebarObjFormat(
        '이벤트 관리',
        'event',
        [
            columnObjFormat('배너이미지', '', 'img', 'main_img'),
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('시작일', '', 'text', 'start_date'),
            columnObjFormat('종료일', '', 'text', 'end_date'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
    notice: sidebarObjFormat(
        '공지 관리',
        'notice',
        [
            columnObjFormat('제목', '', 'text', 'title'),
            columnObjFormat('등록일', '', 'text', 'date'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        true),
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
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
    popup: sidebarObjFormat(
        '팝업 관리',
        'popup',
        [
            columnObjFormat('이미지', '', 'img', 'img_src'),
            columnObjFormat('링크', '', 'text', 'link'),
            columnObjFormat('맨위로', '', 'top', 'top'),
            columnObjFormat('노출여부', '', 'status', 'status'),
            columnObjFormat('수정', '', 'edit', 'edit'),
            columnObjFormat('삭제', '', 'delete', 'delete'),
        ],
        [],
        true,
        false),
}
export const objManagerOptionCardContent = {

}
export const objManagerEditContent = {
    academy_category: {
        schema: 'academy_category',
        breadcrumb: '강의',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지', 'img', { field_name: 'content' }, 'main_img'),
            ],
            [
                editColumnObjFormat('서브이미지', 'img', { field_name: 'content2' }, 'sub_img')
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
                editColumnObjFormat('부제목', 'input', { placeholder: '부제목을 입력해 주세요.' }, 'sub_title'),
                editColumnObjFormat('해시태그', 'input', { placeholder: '#주식' }, 'hash'),
            ],
            [
                editColumnObjFormat('난이도', 'select', {
                    api_url: false, option_list: [
                        { name: '왕초보', val: 1 },
                        { name: '검색기', val: 2 },
                        { name: '단타', val: 3 },
                        { name: '종목발굴', val: 4 },
                        { name: '기억분석', val: 5 },
                    ]
                }, 'difficulty'),
                editColumnObjFormat('강사', 'select', {
                    api_url: '/api/items?table=user&level=30', option_list: [], use_name_column: 'nickname', use_val_column: 'pk'
                }, 'master_pk'),
            ],
            [
                editColumnObjFormat('수강대상', 'input', { placeholder: '수강대상을 입력해 주세요.' }, 'target'),
                editColumnObjFormat('수강기간', 'select', {
                    api_url: false, option_list: [
                        { name: '1일', val: 1 },
                        { name: '3일', val: 3 },
                        { name: '1주일', val: 7 },
                        { name: '2주일', val: 14 },
                        { name: '3주일', val: 21 },
                        { name: '1개월', val: 30 },
                        { name: '2개월', val: 60 },
                        { name: '3개월', val: 90 },
                        { name: '6개월', val: 180 },
                        { name: '1년', val: 365 },
                    ]
                }, 'period'),
                editColumnObjFormat('강의구성', 'input', { placeholder: '강의구성을 입력해 주세요.' }, 'composition'),
            ],
            [
                editColumnObjFormat('정가', 'input', { type: 'number', placeholder: '숫자를 입력해 주세요.' }, 'price'),
                editColumnObjFormat('할인율', 'input', { type: 'number', placeholder: '0 ~ 100' }, 'discount_percent'),
            ],
            [
                editColumnObjFormat('소개', 'editor', {}, 'introduce_note'),
            ],
            [
                editColumnObjFormat('혜택', 'editor', {}, 'benefit_note'),
            ],
            [
                editColumnObjFormat('리더', 'editor', {}, 'leader_note'),
            ],
            [
                editColumnObjFormat('커리큘럼', 'editor', {}, 'curriculum_note'),
            ],
        ],
    },
    academy: {
        schema: 'academy',
        breadcrumb: '강의 컨텐츠',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지', 'img', { field_name: 'content' }, 'main_img')
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
                editColumnObjFormat('해시태그', 'input', { placeholder: '' }, 'hash'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    request: {
        schema: 'request',
        breadcrumb: '문의',
        add_list: [],
        update_list: [{key:'status',value:'1'}],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('제목', 'input', {disabled:true }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'textarea', {disabled:true}, 'note'),
            ],
            [
                editColumnObjFormat('답변', 'textarea', {}, 'reply_note'),
            ],
        ],
    },
    master: {
        schema: 'user',
        breadcrumb: '전문가',
        add_list: [{ key: 'user_level', value: 30 }],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('아이디', 'input', {}, 'id'),
                editColumnObjFormat('비밀번호', 'input', { placeholder: '****', type: 'password' }, 'pw'),
            ],
            [
                editColumnObjFormat('이름', 'input', {}, 'name'),
                editColumnObjFormat('닉네임(채널명)', 'input', {}, 'nickname'),
            ],
            [
                editColumnObjFormat('프로필이미지', 'img', { field_name: 'master' }, 'profile_img')
            ],
            [
                editColumnObjFormat('서브프로필이미지', 'img', { field_name: 'master2' }, 'sub_profile_img')
            ],
            [
                editColumnObjFormat('이력', 'textarea', {}, 'record_note')
            ],
            [
                editColumnObjFormat('소개', 'editor', {}, 'introduce_note'),
            ],
        ],
    },
    common_setting: {
        schema: 'setting',
        breadcrumb: '공통 기본설정',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('탑 띠배너 전문가명', 'input', {}, 'top_banner_manager_name'),
                editColumnObjFormat('탑 띠배너 글', 'input', {}, 'top_banner_note'),
                editColumnObjFormat('탑 띠배너 링크', 'input', { placeholder: '/home' }, 'top_banner_link'),
            ],
        ],
    },
    home_setting: {
        schema: 'setting',
        breadcrumb: '홈 기본설정',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('슬라이드 이미지 1', 'img', { field_name: 'content1' }, 'home_banner_img_1')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 2', 'img', { field_name: 'content2' }, 'home_banner_img_2')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 3', 'img', { field_name: 'content3' }, 'home_banner_img_3')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 4', 'img', { field_name: 'content4' }, 'home_banner_img_4')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 5', 'img', { field_name: 'content5' }, 'home_banner_img_5')
            ],
            [
                editColumnObjFormat('메인콘텐츠 제목', 'input', {}, 'home_main_title'),
                editColumnObjFormat('메인콘텐츠 부제목', 'input', {}, 'home_main_sub_title'),
                editColumnObjFormat('메인콘텐츠 링크', 'input', { placeholder: '/home' }, 'home_main_link'),
            ],
            [
                editColumnObjFormat('메인콘텐츠 이미지', 'img', { field_name: 'content' }, 'home_main_img')
            ],
        ],
    },
    enrolment_setting: {
        schema: 'setting',
        breadcrumb: '수강신청 기본설정',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('슬라이드 이미지 1', 'img', { field_name: 'content1' }, 'enrolment_banner_img_1')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 2', 'img', { field_name: 'content2' }, 'enrolment_banner_img_2')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 3', 'img', { field_name: 'content3' }, 'enrolment_banner_img_3')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 4', 'img', { field_name: 'content4' }, 'enrolment_banner_img_4')
            ],
            [
                editColumnObjFormat('슬라이드 이미지 5', 'img', { field_name: 'content5' }, 'enrolment_banner_img_5')
            ],
            [
                editColumnObjFormat('하단 배너', 'img', { field_name: 'content' }, 'enrolment_bottom_banner')
            ],
        ],
    },
    event: {
        schema: 'event',
        breadcrumb: '이벤트',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('메인이미지', 'img', { field_name: 'content' }, 'main_img')
            ],
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('시작일', 'input', { type: 'date' }, 'start_date'),
                editColumnObjFormat('종료일', 'input', { type: 'date' }, 'end_date'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    faq: {
        schema: 'faq',
        breadcrumb: 'FAQ',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    notice: {
        schema: 'notice',
        breadcrumb: '공지사항',
        columns: [//img, select, input, 
            [
                editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
            ],
            [
                editColumnObjFormat('내용', 'editor', {}, 'note'),
            ],
        ],
    },
    app: {
        schema: 'app',
        breadcrumb: '퍼스트앱',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('앱이미지', 'img', { field_name: 'content' }, 'main_img')
            ],
            [
                editColumnObjFormat('앱이름', 'input', { placeholder: '' }, 'name'),
                editColumnObjFormat('링크', 'input', { placeholder: '' }, 'link'),
            ],
        ],
    },
    popup: {
        schema: 'popup',
        breadcrumb: '팝업',
        add_list: [],
        columns: [//img, select, input, 
            [
                editColumnObjFormat('이미지', 'img', { field_name: 'content' }, 'img_src')
            ],
            [
                editColumnObjFormat('링크', 'input', { placeholder: '/home' }, 'link'),
            ],
        ],
    },
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

export { backUrl };