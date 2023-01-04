import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import '../styles/style.css'
import logo from '../assets/images/test/logo.svg'
import { AiOutlineBell, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai'
import Modal from '../components/Modal';
import axios from 'axios'
import { backUrl, zBottomMenu } from '../data/Data';
import { MdNavigateBefore } from 'react-icons/md';
import theme from '../styles/theme';
import { IoMdArrowBack } from 'react-icons/io';
import $ from 'jquery';
import reactReferer from 'react-referer';
import { returnMoment } from '../functions/utils';
import { Viewer } from '@toast-ui/react-editor';
import { IoMdClose } from 'react-icons/io'
import { IoCloseCircleOutline, IoCloseCircleSharp } from 'react-icons/io5'
const Header = styled.header`
position:fixed;
height:6rem;
width:100%;
top:0;
z-index:10;
background:#fff;
box-shadow: 5px 10px 10px rgb(0 0 0 / 3%);
@media screen and (max-width:1050px) { 
  box-shadow:none;
  height:3.5rem;
}
`
const HeaderContainer = styled.div`
width:90%;
position:relative;
max-width:1000px;
margin:0 auto;
display:none;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1050px) { 
  display:flex;
}
`
const HeaderMenuContainer = styled.div`
width:90%;
position:relative;
margin:0 auto;
display:flex;
align-items:center;
justify-content: space-between;
@media screen and (max-width:1050px) { 
  display:none;
}
`
const HeaderMenu = styled.div`
text-align:center;
font-size:${props => props.theme.size.font3};
padding:0.3rem;
margin-right:0.5rem;
font-weight:bold;
cursor:pointer;
&:hover{  
  color:${(props) => props.theme.color.background1};
}
@media screen and (max-width:1200px) { 
  font-size:${props => props.theme.size.font4};
}
`
const SearchInput = styled.input`
outline:none;
border:none;
border-bottom:1px solid #cccccc;
border-radius:0;
width:80%;
padding:10px 0;
margin:0 6px;
font-size:12px;
::placeholder {
  color:#dddddd;
  font-size:12px;
}
`
const ModalContainer = styled.div`

    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    height: 100%;
    display: ${props => props.modal};
    justify-content: center;
    align-items: center;
    z-index:10;
`
const ModalOverlay = styled.div`
    background-color: black;
    width:100%;
    height: 100%;
    position: absolute;
    opacity: 0.4;
`
const ModalContent = styled.div`
box-shadow: 0px 10px 40px #00000029;
background-color:white;
animation: fadein 0.3s;
  -moz-animation: fadein 0.3s;
  -webkit-animation: fadein 0.3s;
  -o-animation: fadein 0.3s; 
 
position: absolute;
width:50%;
bottom:0;
height:80vh;
align-items: flex-start;
display:flex;
flex-direction:column;
width:500px;
@media screen and (max-width:700px) {
  width:80%;
  bottom:0;
  right:0;
  @keyframes fadein {
    from {
        right:-500px;
    }
    to {
        right:0;
    }
  }
  
  
}

`
const PopupContainer = styled.div`
position:absolute;
top:16px;
left:0px;
display:flex;
flex-wrap:wrap;
`
const PopupContent = styled.div`
background:#fff;
margin-right:16px;
margin-bottom:16px;
padding:24px 24px 48px 24px;
box-shadow:${props => props.theme.boxShadow};
border-radius:8px;
width:300px;
min-height:200px;
position:relative;
opacity:0.95;
z-index:10;
@media screen and (max-width:400px) { 
width:78vw;
}
`
const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState(1)
  const [isModal, setIsModal] = useState(false);
  const [display, setDisplay] = useState('flex');
  const [isPost, setIsPost] = useState(false);
  const [searchDisplay, setSearchDisplay] = useState('none')
  const [isSearch, setIsSearch] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [lastNoticePk, setLastNoticePk] = useState(0);
  const [lastAlarmePk, setLastAlarmPk] = useState(0);
  const [popupList, setPopupList] = useState([])
  useEffect(() => {


    if (location.pathname.substring(0, 6) == '/post/' || location.pathname.substring(0, 7) == '/video/' || location.pathname == '/appsetting') {
      setIsPost(true);
    } else {
      setIsPost(false)
    }
    if (location.pathname.includes('/manager')) {
      setDisplay('none');
      $('html').addClass('show-scrollbar');
    } else {
      setDisplay('flex');
    }

    if (localStorage.getItem('dark_mode')) {
      $('body').addClass("dark-mode");
      $('p').addClass("dark-mode");
      $('.toastui-editor-contents p').addClass("dark-mode");
      $('.menu-container').addClass("dark-mode");
      $('.menu-container').css("border-top", "none");
      $('.header').addClass("dark-mode");
      $('.select-type').addClass("dark-mode");
      $('.footer').addClass("dark-mode");
    } else {

    }
    if (location.pathname == '/' || location.pathname == '/home') {
      fetchPopup();
    }
  }, [location])
  async function fetchPopup() {
    const { data: response } = await axios.get('/api/items?table=popup&status=1')
    setPopupList(response?.data ?? []);
  }

  useEffect(() => {
    async function getNoticeAndAlarmCount() {
      const { data: response } = await axios.get('/api/getnoticeandalarmlastpk');
      let response_obj = response?.data ?? { alarm_last_pk: 0, notice_last_pk: 0 };
      setLastAlarmPk(response_obj.alarm_last_pk);
      setLastNoticePk(response_obj.notice_last_pk);
      let my_last_count = {};
      if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('native_get_alarm_and_notice_last_count', {}).then(async function (result) {
          //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"\
          let obj = JSON.parse(result);
          if (obj?.data?.alarm_last_pk >= response_obj?.alarm_last_pk && obj?.data?.notice_last_pk >= response_obj?.notice_last_pk) {
            setIsAlarm(false);
          } else {
            setIsAlarm(true);
          }

        });
      } else {
        my_last_count = JSON.parse(localStorage.getItem('alarm_and_notice_count') ?? '{}');
        if (my_last_count?.notice_last_pk >= response_obj?.notice_last_pk) {
          setIsAlarm(false);
        } else {
          setIsAlarm(true);
        }
      }
    }
    getNoticeAndAlarmCount();

  }, [])
  const onClosePopup = async (pk, is_not_see) => {
    if (is_not_see) {
      await localStorage.setItem(`not_see_popup_${pk}_${returnMoment().substring(0, 10).replaceAll('-', '_')}`, '1');
    }
    let popup_list = [];
    for (var i = 0; i < popupList.length; i++) {
      if (pk == popupList[i]?.pk) {
      } else {
        popup_list.push(popupList[i]);
      }
    }
    setPopupList(popup_list);
  }
  // setInterval(() => {
  //   if (window.flutter_inappwebview) {
  //     window.flutter_inappwebview.callHandler('native_get_alarm_count', {}).then(async function (result) {
  //       //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
  //       let ans = JSON.parse(result)
  //       if (ans['data']['alarm_cnt'] == 0 && ans['data']['notice_cnt'] == 0) {
  //         localStorage.setItem('is_alarm', 'false');
  //         setIsAlarm(false);
  //       } else {
  //         localStorage.setItem('is_alarm', 'true');
  //         setIsAlarm(true);
  //       }
  //     });
  //   }
  // }, 2000);
  const onClickBell = () => {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('native_alarm_count_zero', { alarm_last_pk: lastAlarmePk, notice_last_pk: lastNoticePk }).then(async function (result) {
        setIsAlarm(false);
      });
    } else {
      localStorage.setItem('alarm_and_notice_count', JSON.stringify({ notice_last_pk: lastNoticePk }));
      setIsAlarm(false);
    }
    navigate('/noticelist', { state: 'alarm' });
  }

  const myAuth = async () => {
    const { data: response } = await axios('/api/auth')
    if (response.pk > 0) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  }
  const changeSearchModal = async () => {
    if (window.innerWidth <= 1050) {//모바일
      setIsSearch(true)
      await new Promise((r) => setTimeout(r, 100));
      $('.search').focus();
    } else {//pc
      setIsSearch(!isSearch)
      await new Promise((r) => setTimeout(r, 100));
      $('.search-pc').focus();
    }
  }
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      if ($('.search').val().length < 2) {
        alert('두 글자 이상 입력해주세요.');
      } else {
        setIsSearch(false);
        navigate('/search', { state: $('.search').val() });
      }
    }
  }
  const onKeyPressPc = (e) => {
    if (e.key == 'Enter') {
      if ($('.search-pc').val().length < 2) {
        alert('두 글자 이상 입력해주세요.');
      } else {
        setIsSearch(false);
        navigate('/search', { state: $('.search-pc').val() });
      }
    }
  }
  const onClickNavigateBefore = () => {
    if (document.referrer) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  }
  return (
    <>

      <Header style={{ display: `${display}` }} className='header'>
        {popupList.length > 0 ?
          <>
            <PopupContainer>

              {popupList && popupList.map((item, idx) => (
                <>
                  {localStorage.getItem(`not_see_popup_${item?.pk}_${returnMoment().substring(0, 10).replaceAll('-', '_')}`) ?
                    <>

                    </>
                    :
                    <>
                      <PopupContent>
                        <IoMdClose style={{ color: theme.color.background1, position: 'absolute', right: '8px', top: '8px', fontSize: theme.size.font3, cursor: 'pointer' }} onClick={() => { onClosePopup(item?.pk) }} />
                        <img src={backUrl + item?.img_src} style={{ width: '100%', height: 'auto' }} onClick={() => { navigate(item?.link) }} />
                        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '8px', bottom: '8px' }}>
                          <IoCloseCircleOutline style={{ color: theme.color.background1, fontSize: theme.size.font3, marginRight: '4px', cursor: 'pointer' }} onClick={() => { onClosePopup(item?.pk, true) }} />
                          <div style={{ fontSize: theme.size.font5, cursor: 'pointer' }} onClick={() => { onClosePopup(item?.pk, true) }}>오늘 하루 보지않기</div>
                        </div>
                      </PopupContent>
                    </>
                  }
                </>
              ))}
            </PopupContainer>

          </>
          :
          <>
          </>}
        <HeaderContainer>{/*모바일 */}
          {isSearch ?
            <>
              <IoMdArrowBack style={{ fontSize: '24px' }} onClick={() => setIsSearch(false)} />
              <SearchInput type={'text'} placeholder='두 글자 이상 입력해주세요.' className='search' onKeyPress={onKeyPress} />
              <AiOutlineSearch style={{ fontSize: '24px' }} onClick={() => {
                if ($('.search').val().length < 2) {
                  alert('두 글자 이상 입력해주세요.');
                } else {
                  setIsSearch(false);
                  navigate('/search', { state: $('.search').val() });
                }
              }} />
            </>
            :
            <>
              <div>
                {isPost ?
                  <>
                    <MdNavigateBefore style={{ fontSize: '30px', marginLeft: '-7px' }} onClick={onClickNavigateBefore} />
                  </>
                  :
                  <>
                    <img src={logo} alt="홈으로" style={{ height: '2.5rem', marginTop: '0.25rem' }} onClick={() => { navigate('/') }} />
                  </>}
              </div>
              <div style={{ display: 'flex', fontSize: '1.2rem', width: '100px', justifyContent: 'space-between', position: 'relative' }}>
                <AiOutlineBell onClick={onClickBell} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
                <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
                <AiOutlineSetting onClick={myAuth} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
                {isAlarm ?
                  <>
                    <div style={{ width: '10px', height: '10px', background: 'red', position: 'absolute', top: '2px', left: '17px', borderRadius: '50%' }} />
                  </>
                  :
                  <>
                  </>}
              </div>
            </>
          }

        </HeaderContainer>
        <HeaderMenuContainer>{/* pc */}
          <div style={{ display: 'flex', margin: '2rem 0', height: '2rem' }}>
            {zBottomMenu.map((item, idx) => (
              <>
                <HeaderMenu key={idx} onClick={() => { navigate(item.link) }} style={{ color: `${item.allowList.includes(location.pathname) ? theme.color.background1 : ''}` }}>{item.name}</HeaderMenu>
              </>
            ))}
          </div>
          <div style={{ position: 'absolute', right: '42%', top: '0.5rem' }}>
            <img src={logo} alt="홈으로" style={{ height: '5rem' }} onClick={() => { navigate('/') }} />
          </div>
          <div style={{ display: 'flex', fontSize: '1.2rem', width: '7rem', justifyContent: 'space-between', position: 'relative' }}>
            <AiOutlineBell onClick={onClickBell} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSearch onClick={changeSearchModal} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            <AiOutlineSetting onClick={myAuth} style={{ width: '2rem', height: '1.5rem', cursor: 'pointer' }} />
            {isAlarm ?
              <>
                <div style={{ width: '10px', height: '10px', background: 'red', position: 'absolute', top: '2px', left: '17px', borderRadius: '50%' }} />
              </>
              :
              <>
              </>}
            {isSearch ?
              <>
                <div style={{ position: 'absolute', top: '72px', right: '48px', background: '#fff', padding: '16px', boxShadow: '0px 2px 8px #00000029', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                  <SearchInput type={'text'} placeholder='두 글자 이상 입력해주세요.' className='search-pc' style={{ width: '300px' }} onKeyPress={onKeyPressPc} />
                  <AiOutlineSearch style={{ fontSize: '24px', cursor: 'pointer' }} onClick={() => {
                    if ($('.search-pc').val().length < 2) {
                      alert('두 글자 이상 입력해주세요.');
                    } else {
                      setIsSearch(false);
                      navigate('/search', { state: $('.search-pc').val() });
                    }
                  }} />
                </div>
              </>
              :
              <>
              </>
            }

          </div>

        </HeaderMenuContainer>

      </Header>

      {/* <ModalContainer modal={modal}>
          <ModalOverlay onClick={handleModal} />
          <ModalContent>
            <div style={{ margin: '1rem 0 0 1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>2022.07.15</div>
            <div style={{ margin: '1rem 0 0 1rem', paddingLeft: '1rem', fontSize: '0.9rem' }}>7월 15일 뉴스레터</div>
            <div style={{ margin: '1rem 0 0 1rem', fontSize: '0.9rem', fontWeight: 'bold' }}>2022.07.13</div>
            <div style={{ margin: '1rem 0 0 1rem', paddingLeft: '1rem', fontSize: '0.9rem' }}>7월 13일 뉴스레터</div>
            <button style={{ position: 'absolute', bottom: '2rem', left: '3rem', right: '3rem', border: 'none', padding: '0.7rem 0', background: '#000', color: '#fff', fontSize: '1rem' }} onClick={() => {  }}>앱 설정</button>
          </ModalContent>
        </ModalContainer>
        {isModal ?
          <>
            <Modal comment={'준비중입니다.'} modal={isModal} />
          </>
          :
          <>
          </>
        } */}
    </>
  )
}
export default Headers;