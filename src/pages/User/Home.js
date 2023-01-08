import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from '../../styles/theme';
import axios from 'axios';
import { backUrl, slideSetting } from '../../data/Data';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, ShadowContainer, RowContent } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AcademyCard from '../../components/AcademyCard';
import { onClickExternalLink } from '../../functions/utils';
const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
margin-top:10rem;
margin-left:auto;
margin-right:auto;
@media screen and (max-width:1050px) { 
    margin-top:6rem;
}
`
const BestContentImg = styled.img`
margin: 0 auto 0 8px;
border-radius:${props => props.theme.borderRadius};
@media screen and (max-width:450px) { 
    width:45vw;
    height:auto;
}
`
const RowLastColumnContent = styled.div`
display:flex;
justify-content:space-between;
@media screen and (max-width:1000px) { 
flex-direction:column;
    
}
`
const HalfContent = styled.div`
width:48%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
@media screen and (max-width:1000px) { 
    width:100%;
}
`
const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [bestContents, setBestContents] = useState([]);
    const [bestReviews, setBestReviews] = useState([]);
    const [notices, setNotices] = useState([]);
    const [apps, setApps] = useState({});
    const [banners, setBanners] = useState([]);
    const [bannerLinks, setBannerLinks] = useState({});
    const [mainContent, setMainContent] = useState([]);

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        async function fetchPost() {
            //setLoading(true)
            const { data: response } = await axios.get('/api/gethomecontent')
            let banner_list = [];
            let banner_link_obj = {};
            for (var i = 1; i <= 5; i++) {
                if (response?.data?.banner[`home_banner_img_${i}`]) {
                    await banner_list.push(`${backUrl + response?.data?.banner[`home_banner_img_${i}`]}`);
                }
            }
            for (var i = 1; i <= 5; i++) {
                if (response?.data?.banner[`home_banner_link_${i}`]) {
                    banner_link_obj[`home_banner_link_${i}`] = response?.data?.banner[`home_banner_link_${i}`];
                }
            }
            setMainContent(response?.data?.main_content);
            setBanners(banner_list);
            setBannerLinks(banner_link_obj);
            setBestContents(response?.data?.best_academy);
            setBestReviews(response?.data?.best_comment);
            setNotices(response?.data?.notice);
            setApps(response?.data?.app);
            setTimeout(() => setLoading(false), 1000);
            $('span.lazy-load-image-background').addClass('width-100');
        }
        fetchPost();
        async function isLogined() {
            await window.flutter_inappwebview.callHandler('native_app_logined', {}).then(async function (result) {
                //result = "{'code':100, 'message':'success', 'data':{'login_type':1, 'id': 1000000}}"
                // JSON.parse(result)
                let obj = JSON.parse(result);
                if (obj['is_ios']) {
                    await localStorage.setItem('is_ios', '1');
                }
                await onLoginBySns(obj.data);
            });
        }
        if (window && window.flutter_inappwebview) {
            isLogined();
        }
    }, [])
    const onLoginBySns = async (obj) => {
        let nick = "";
        if (obj.login_type == 1) {
            nick = "카카오" + new Date().getTime();
        } else if (obj.login_type == 2) {
            nick = "네이버" + new Date().getTime();
        }
        let objs = {
            id: obj.id,
            name: obj.legal_name,
            nickname: nick,
            phone: obj.phone_number,
            user_level: 0,
            typeNum: obj.login_type,
            profile_img: obj.profile_image_url
        }
        const { data: response } = await axios.post('/api/loginbysns', objs);
        if (response.result > 0) {
            await localStorage.setItem('auth', JSON.stringify(response.data));
        } else {
            //alert(response.message);
        }
    }
    return (
        <>
            <WrappersStyle>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <Slider {...settings} className='board-container pointer slider1'>
                            {banners.length > 0 && banners.map((item, idx) => (
                                <>
                                    <LazyLoadImage
                                        alt={"#"}
                                        effect="blur"
                                        src={item}
                                        className="banner-img"
                                        onClick={() => { onClickExternalLink(bannerLinks[`home_banner_link_${idx + 1}`]) }}
                                    />
                                </>
                            ))}
                        </Slider>
                    </>}
            </WrappersStyle>
            <Wrappers className='wrappers' style={{ marginTop: '16px' }}>
                {loading ?
                    <>
                    </>
                    :
                    <>
                        <Title className='pointer' link={'/academylist'} line={true} is_thumb={true}>BEST 강의</Title>
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {bestContents.map((item, idx) => (
                                <>
                                    <AcademyCard item={item} idx={idx} />
                                </>
                            ))}
                        </RowContent>
                        <Title className='pointer' link={'/reviewlist'} line={true} is_thumb={true}>BEST 후기</Title>
                        <ShadowContainer>

                        </ShadowContainer>
                        <ShadowContainer onClick={() => { navigate(mainContent?.home_main_link ?? "/") }} style={{ padding: '16px', marginTop: '32px', cursor: 'pointer' }}>
                            <RowContent>
                                <div style={{ display: 'flex', flexDirection: 'column', margin: '0 8px 0 auto', alignItems: 'center' }}>
                                    <div style={{ fontSize: theme.size.font4, fontWeight: 'bold' }}>{mainContent?.home_main_title}</div>
                                    <div style={{ fontSize: theme.size.font5, marginTop: '16px' }}>{mainContent?.home_main_sub_title}</div>
                                    <div style={{ fontSize: theme.size.font6, marginTop: 'auto', color: theme.color.blue }}>자세히보기{'>'}</div>
                                </div>
                                <BestContentImg src={backUrl + mainContent?.home_main_img} />
                            </RowContent>
                        </ShadowContainer>
                        <RowLastColumnContent>
                            <HalfContent>
                                <Title className='pointer' text={'더보기'} text_link={'/servicecenter'}>공지사항</Title>
                                {notices.length > 0 && notices.map((item, idx) => (
                                    <>
                                        <div style={{ color: theme.color.font2, display: 'flex', justifyContent: 'space-between', fontSize: theme.size.font4, marginBottom: '8px', cursor: 'pointer', border: `1px solid ${theme.color.font5}`, padding: '4px 8px' }} onClick={() => navigate(`/post/notice/${item?.pk}`)}>
                                            <img style={{ height: '100px', width: '150px' }} src={backUrl + item?.main_img} />
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0 auto 0 8px' }}>
                                                <div style={{ display: 'flex', fontWeight: 'bold',fontSize:theme.size.font3 }}>
                                                    <div style={{ marginRight: '8px', color: '#b48d4c' }}>NOTICE</div>
                                                    <div>{item?.title}</div>
                                                </div>
                                                <div>{item?.date.substring(0, 10)}</div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </HalfContent>
                            <HalfContent>
                                <Title className='pointer'>퍼스트앱</Title>
                                <RowContent style={{ flexWrap: 'wrap' }}>
                                    {apps.length > 0 && apps.map((item, idx) => (
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '24px', width: '124px', alignItems: 'center', cursor: 'pointer', marginBottom: '16px' }} onClick={() => onClickExternalLink(item?.link)}>
                                                <img src={backUrl + item?.main_img} style={{ width: '104px', height: '104px', marginBottom: '6px', borderRadius: theme.borderRadius, border: `1px solid ${theme.color.font2}` }} />
                                                <div>{item?.name}</div>
                                            </div>
                                        </>
                                    ))}
                                </RowContent>
                            </HalfContent>
                        </RowLastColumnContent>

                    </>}


            </Wrappers>
        </>
    )
}
export default Home;