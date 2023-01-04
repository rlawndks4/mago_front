import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'
import logo from '../../assets/images/test/logo.svg'
import { BsPerson, BsCameraVideo, BsAlarm, BsGraphUp } from 'react-icons/bs'
import { MdOutlineAccessTime, MdNotificationImportant, MdOutlineFeaturedPlayList, MdOutlineStickyNote2 } from 'react-icons/md'
import { IoStatsChartSharp, IoLogoReact } from 'react-icons/io5'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { AiOutlineQuestionCircle, AiOutlineRotateLeft, AiOutlineComment } from 'react-icons/ai'
import { WiDayHaze } from 'react-icons/wi'
import { SiMicrostrategy } from 'react-icons/si'
import { BiCommentDetail } from 'react-icons/bi'
import axios from 'axios';
import $ from 'jquery'
import { GoRepoPush } from 'react-icons/go'
import { zSidebar, zSidebarSubMenu } from '../../data/Manager/ManagerContentData';
import theme from '../../styles/theme';
const Wrappers = styled.div`
display:flex;
flex-direction:column;
width:250px;
min-height:100vh;
box-shadow:0 2px 4px rgb(15 34 58 / 12%);
z-index:5;
position:fixed;
background:#fff;
overflow-y:auto;
padding-bottom:16px;
@media screen and (max-width:1000px) {
    display:none;
    position:fixed;
}
`
const LogoWrappers = styled.div`
text-align:center;
font-size:32px;
font-weight:bold;
padding-top:24px;
padding-bottom:24px;
color:${(props) => props.theme.color.background1};
`
const SelectMenuContent = styled.div`
width:192px;
padding:16px 12px 16px 16px;
background:${(props) => props.theme.color.manager.background1}18;
margin:0.3rem auto;
border-radius:3px;
font-size:15px;
display:flex;
align-items:center;
color:${(props) => props.theme.color.manager.background1};
cursor:pointer;
`
const MenuContent = styled.div`
width:192px;
padding:16px 12px 16px 16px;
background:#fff;
margin:0.3rem auto;
border-radius:12px;
font-size:15px;
display:flex;
align-items:center;
color:${(props) => props.theme.color.manager.font3};
cursor:pointer;
transition: 0.4s;
&:hover{  
    color:${(props) => props.theme.color.manager.font1};
}
`
const MenuText = styled.p`
margin:0 0 0 8px;
`
const HambergurContainer = styled.div`
display:none;
position:fixed;
top:0;
left:0;
z-index:5;
padding:12px;
@media screen and (max-width:1000px) {
    display:flex;
}
`
const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [auth, setAuth] = useState({})
    const [zIssueCategory, setZIssueCategory] = useState([])
    const [issueCategoryDisplay, setIssueCategoryDisplay] = useState(false);
    const [zFeatureCategory, setZFeatureCategory] = useState([])
    const [featureCategoryDisplay, setFeatureCategoryDisplay] = useState(false);
    const [zInnerSideBar, setZInnerSideBar] = useState({});
    const [display, setDisplay] = useState('none');
    const [subMenuDisplayObj, setSubMenuDisplayObj] = useState({});
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            let obj = JSON.parse(localStorage.getItem('auth'))
            setAuth(obj);
        }
    }, [location]);
    useEffect(() => {
        let sub_menu_display_obj = {};
        for (var i = 0; i < Object.keys(zSidebarSubMenu).length; i++) {
            sub_menu_display_obj[Object.keys(zSidebarSubMenu)[i]] = false;
        }
        setSubMenuDisplayObj(sub_menu_display_obj);
    }, [])
    const onClickMenu = (item) => {
        if (zSidebarSubMenu[item?.schema]) {
            let sub_menu_display_obj = { ...subMenuDisplayObj };
            sub_menu_display_obj[item?.schema] = !sub_menu_display_obj[item?.schema];
            setSubMenuDisplayObj(sub_menu_display_obj);
        } else {
            navigate(item?.link);
        }
    }
    const onChangeMenuDisplay = async () => {
        if (display == 'flex') {
            $('.header-menu-list').animate({ left: '-500px', opacity: '0' }, 700);
            if (window.innerWidth <= 1050) {
                await new Promise((r) => setTimeout(r, 700));
                $('.header-menu-list').css("display", "none");

            }
        } else {
            $('.header-menu-list').animate({ left: '0', opacity: '1' }, 700);
            if (window.innerWidth <= 1050) {
                $('.header-menu-list').css("display", "flex");
            }
        }
        setDisplay(display == 'flex' ? 'none' : 'flex');
    }
    return (
        <>
            <HambergurContainer onClick={onChangeMenuDisplay}>
                <GiHamburgerMenu />
            </HambergurContainer>
            <Wrappers className='scroll-css header-menu-list'>
                <HambergurContainer onClick={onChangeMenuDisplay}>
                    <GiHamburgerMenu />
                </HambergurContainer>
                <LogoWrappers>
                    <img src={logo} alt="first-academy" style={{ height: '40px', width: 'auto' }} />
                </LogoWrappers>
                <div style={{ maxHeight: '80vh', paddingBottom: '32px' }}>
                    {zSidebar.map((item, index) => (
                        <>
                            {JSON.parse(localStorage.getItem('auth'))?.user_level >= item.level ?
                                <>
                                    {item.allow_list.includes(location.pathname) ?
                                        <>
                                            <SelectMenuContent key={index} onClick={() => { onClickMenu(item) }}>
                                                {item.icon}
                                                <MenuText>{item.name}</MenuText>
                                            </SelectMenuContent>
                                        </>
                                        :
                                        <>
                                            <MenuContent key={index} onClick={() => { onClickMenu(item) }}>
                                                {item.icon}
                                                <MenuText>{item.name}</MenuText>
                                            </MenuContent>
                                        </>}
                                </>
                                :
                                <>
                                </>
                            }
                            {zSidebarSubMenu[item.schema] && subMenuDisplayObj[item.schema] ?
                                <>
                                    {zSidebarSubMenu[item.schema].map((itm, idx) => (
                                        <>
                                            <MenuContent key={idx} style={{color:`${itm.link==location.pathname?theme.color.font1:''}`}} onClick={() => { navigate(`${itm.link}`) }}>
                                                <MenuText>{itm.name}</MenuText>
                                            </MenuContent>
                                        </>
                                    ))}
                                </>
                                :
                                <>
                                </>}

                        </>
                    ))}
                    <div style={{ paddingBottom: '36px' }} />
                </div>
            </Wrappers>
        </>
    )
}
export default SideBar