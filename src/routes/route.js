import Home from '../pages/User/Home';

import Search from '../pages/User/Search';
import SelectIssueCategory from '../pages/User/SelectIssueCategory';
import SelectFeatureCategory from '../pages/User/SelectFeatureCategory';
import MasterList from '../pages/User/MasterList';
import ThemeList from '../pages/User/ThemeList';
import VideoList from '../pages/User/VideoList';

import AppSetting from '../pages/User/AppSetting';

import Login from '../pages/User/Auth/Login';
import MyPage from '../pages/User/Auth/MyPage';
import EditMyInfo from '../pages/User/Auth/EditMyInfo';
import FindMyInfo from '../pages/User/Auth/FindMyInfo';
import SignUp from '../pages/User/Auth/SignUp';
import Resign from '../pages/User/Auth/Resign';
import KakaoRedirectHandler from '../pages/User/Auth/KakaoRedirectHandler';

import OneEventList from '../pages/User/OneEvent/OneEventList';
import OneWordList from '../pages/User/OneWord/OneWordList';
import NoticeList from '../pages/User/Notice/NoticeList';
import IssueList from '../pages/User/Issues/IssueList';
import FeatureList from '../pages/User/Feature/FeatureList';
import Master from '../pages/User/Master/Master';

import Post from '../pages/User/Posts/Post';
import Video from '../pages/User/Posts/Video';

import Policy from '../pages/User/Policy/Policy';

import MLogin from '../pages/Manager/MLogin';
import MUserEdit from '../pages/Manager/MUserEdit';
import MIssueCategoryEdit from '../pages/Manager/MIssueCategoryEdit';
import MFeatureCategoryEdit from '../pages/Manager/MFeatureCategoryEdit';
import MVideoEdit from '../pages/Manager/MVideoEdit';
import MSettingEdit from '../pages/Manager/MSettingEdit';

import MItemEdit from '../pages/Manager/MItemEdit';
import MItemList from '../pages/Manager/MItemList';
import Notice from '../pages/User/Notice/Notice';
import MAlarmEdit from '../pages/Manager/MAlarmEdit';
import MAcademyEdit from '../pages/Manager/MAcademyEdit';
import EnrolmentList from '../pages/User/EnrolmentList';

const zManagerRoute = [
    { link: '/manager', element: <MLogin />, title: "관리자로그인" },
    { link: '/manager/login', element: <MLogin />, title: "관리자로그인" },
    { link: '/manager/edit/user/:pk', element: <MUserEdit />, title: "회원관리" },
    { link: '/manager/edit/video/:pk', element: <MVideoEdit />, title: "핵심비디오관리" },
    { link: '/manager/edit/alarm/:pk', element: <MAlarmEdit />, title: "알람관리" },
    { link: '/manager/edit/academy/:pk', element: <MAcademyEdit />, title: "강의관리" },
    { link: '/manager/edit/issue_category/:pk', element: <MIssueCategoryEdit />, title: "핵심이슈카테고리관리" },
    { link: '/manager/edit/feature_category/:pk', element: <MFeatureCategoryEdit />, title: "특징주카테고리관리" },
    { link: '/manager/edit/setting', element: <MSettingEdit />, title: "환경설정" },

    { link: '/manager/edit/:table/:pk', element: <MItemEdit />, title: "" },
    { link: '/manager/list/:table/:pk', element: <MItemList />, title: "" },
    { link: '/manager/list/:table', element: <MItemList />, title: "" },
];
const zUserRoute = [
    { link: '/', element: <Home />, title: "홈" },
    { link: '/home', element: <Home />, title: "홈" },
    { link: '/search', element: <Search />, title: "검색" },
    { link: '/enrolmentlist', element: <EnrolmentList />, title: "검색" },
    
    { link: '/appsetting', element: <AppSetting />, title: "앱 세팅" },

    { link: '/selectissuecategory', element: <SelectIssueCategory />, title: "핵심이슈" },
    { link: '/selectfeaturecategory', element: <SelectFeatureCategory />, title: "특징주" },
    { link: '/masterlist', element: <MasterList />, title: "전문가칼럼" },
    { link: '/themelist', element: <ThemeList />, title: "핵심테마" },
    { link: '/videolist', element: <VideoList />, title: "핵심비디오" },
    { link: '/issuelist/:pk', element: <IssueList />, title: "핵심이슈" },
    { link: '/featurelist/:pk', element: <FeatureList />, title: "특징주" },
    { link: '/onewordlist', element: <OneWordList />, title: "하루1단어" },
    { link: '/oneeventlist', element: <OneEventList />, title: "하루1종목" },
    { link: '/noticelist', element: <NoticeList />, title: "공지사항" },
    { link: '/master/:pk', element: <Master />, title: "전문가칼럼" },

    { link: '/login', element: <Login />, title: "로그인" },
    { link: '/mypage', element: <MyPage />, title: "마이페이지" },
    { link: '/editmyinfo', element: <EditMyInfo />, title: "회원수정" },
    { link: '/findmyinfo', element: <FindMyInfo />, title: "아이디/비밀번호 찾기" },
    { link: '/signup', element: <SignUp />, title: "회원가입" },
    { link: '/resign', element: <Resign />, title: "회원탈퇴" },
    { link: '/oauth/callback/kakao', element: <KakaoRedirectHandler />, title: "" },

    { link: '/post/notice/:pk', element: <Notice />, title: "공지사항" },
    { link: '/post/:table/:pk', element: <Post />, title: "게시물" },
    { link: '/video/:pk', element: <Video />, title: "핵심비디오" },

    { link: '/policy/:pk', element: <Policy />, title: "" },
];

export { zUserRoute, zManagerRoute }