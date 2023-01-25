import React, { useRef } from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from '../../styles/theme';
import axios from 'axios';
import { backUrl, defaultImageSrc, slideSetting } from '../../data/Data';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, ShadowContainer, RowContent } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AcademyCard from '../../components/AcademyCard';
import { getIframeLinkByLink, onClickExternalLink, onClickWindowOpen } from '../../functions/utils';
import sec3TitIcon from '../../assets/images/icon/sec3_tit.png'
import youtubeRowIcon from '../../assets/images/icon/yotube-row.png'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
margin-top:10rem;
margin-left:auto;
margin-right:auto;
font-family:${props => props.theme.font.normal};
@media screen and (max-width:1050px) { 
    margin-top:6rem;
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
const Iframe = styled.iframe`
width:100%;
height:300px;
@media screen and (max-width:450px) { 
}
`
const RowVideoContent = styled.div`
display:flex;
width:100%;
position:relative;
@media screen and (max-width:700px) { 
    flex-direction:column;
}
`
const NoticeContainer = styled.div`
color: ${props=>props.theme.color.font2};
display: flex;
justify-content: space-between;
font-size: theme.size.font4;
margin-bottom: 8px;
cursor: pointer;
border: 1px solid ${theme.color.font5};
padding: 4px 8px;
@media screen and (max-width:450px) { 
    flex-direction:column;
}
`
const NoticeImg = styled.img`
height: 100px;
width: 150px;
@media screen and (max-width:450px) { 
    width:84vw;
    height:56vw;
    margin:0 auto 8px auto;
}
`
const NoticeContent = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin: 0 auto 0 8px;
width:306px;
@media screen and (max-width:1000px) {
width:80%;
}
@media screen and (max-width:450px) { 
    width:84vw;
    margin:0 auto;
}
`
const ReviewCard = (props) => {
    let { item, onClick } = props;
    const [note, setNote] = useState([]);
    useEffect(() => {

    }, [props])
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', border: `1px solid ${theme.color.font5}`, width: '95%', margin: '0 auto' }} onClick={onClick}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
                    <div style={{ backgroundImage: `url(${backUrl + item?.main_img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundBlendMode: 'multiply', width: '100px', height: '100px', borderRadius: '50%' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100px' }}>
                        <div style={{ margin: '8px 0 auto 6px', color: '#b48d4c' }}>REVIEW</div>
                        <div style={{ fontWeight: 'bold', margin: '14px 0 auto 6px' }}> {(item?.title ?? "").substring(0, 15)}{item?.title.length > 15 ? '...' : ''}</div>
                    </div>
                </div>
                <div style={{ padding: '16px', background: theme.color.font6, fontSize: theme.size.font5, height: '25px' }}>
                    {(item?.note.replace(/(<([^>]+)>)/ig, "") ?? "").substring(0, 30)}{item?.note.replace(/(<([^>]+)>)/ig, "").length > 30 ? '...' : ''}
                </div>
            </div>
        </>
    )
}
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
    const [mainVideos, setMainVideos] = useState([])
    const reviewRef = useRef();
    const videoRef = useRef();
    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const videoSettings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,

        dots: true
    };
    const reviewSettings = {
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2500,
        slidesToShow: (window.innerWidth >= 1000 ? 3 : (window.innerWidth >= 550 ? 2 : 1)),
        slidesToScroll: 1,
    };
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
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
            setBestReviews(response?.data?.best_review);
            setNotices(response?.data?.notice);
            setApps(response?.data?.app);
            let video_list = [...response?.data?.main_video];
            for (var i = 0; i < video_list.length; i++) {
                video_list[i]['video_link'] = await getIframeLinkByLink(video_list[i]?.video_link);
            }
            setMainVideos(video_list)
            setMainVideos(response?.data?.main_video);
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
    const onPrevious = () => {
        reviewRef.current.slickPrev();
    }
    const onNext = () => {
        reviewRef.current.slickNext();
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
                        <div style={{ marginTop: '36px' }} />
                        <Title className='pointer' link={'/academylist'} line={true} is_thumb={true}>BEST 강의</Title>
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {bestContents.map((item, idx) => (
                                <>
                                    <AcademyCard item={item} idx={idx} />
                                </>
                            ))}
                        </RowContent>
                        <div style={{ marginTop: '36px' }} />
                        <Title className='pointer' link={'/reviewlist'} line={true} is_thumb={true} onPrevious={onPrevious} onNext={onNext}>BEST 후기</Title>
                        <Slider {...reviewSettings} className='board-container pointer slider1' ref={reviewRef}>
                            {bestReviews.length > 0 && bestReviews.map((item, idx) => (
                                <>
                                    <ReviewCard item={item} onClick={() => { navigate(`/post/review/${item?.pk}`) }} />
                                </>
                            ))}
                        </Slider>
                        <div style={{ marginTop: '36px' }} />
                        <ShadowContainer onClick={() => { navigate(mainContent?.home_main_link ?? "/") }} style={{ padding: '32px', marginTop: '32px', cursor: 'pointer', position: 'relative' }}>
                            <div style={{ padding: '4px 5px 3px 4px', background: theme.color.font6, borderRadius: '50%', cursor: 'pointer', position: 'absolute', top: '47%', left: '4px' }}>
                                <GrFormPrevious onClick={() => { videoRef.current.slickPrev(); }} />
                            </div>
                            <div style={{ padding: '4px 4px 3px 5px', background: theme.color.font6, borderRadius: '50%', cursor: 'pointer', position: 'absolute', top: '47%', right: '4px' }}>
                                <GrFormNext onClick={() => { videoRef.current.slickNext(); }} />
                            </div>
                            <Slider {...videoSettings} className='board-container pointer slider1' ref={videoRef}>
                                {mainVideos.length > 0 && mainVideos.map((item, idx) => (
                                    <>
                                        <RowVideoContent>

                                            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 8px 0 auto', alignItems: 'center', width: '100%', minHeight: '200px' }}>
                                                <img src={sec3TitIcon} />
                                                <div style={{ fontSize: theme.size.font3, fontWeight: 'bold', marginTop: 'auto' }}>{item?.title}</div>
                                                <div style={{ fontSize: theme.size.font5, marginTop: 'auto' }}>{item?.sub_title}</div>
                                                <div style={{ fontSize: theme.size.font5, marginTop: 'auto', color: theme.color.blue, cursor: 'pointer', paddingBottom: '16px', borderBottom: `1px solid ${theme.color.font3}`, width: '80%', textAlign: 'center' }} onClick={() => onClickWindowOpen(item?.link)}>자세히보기{'>'}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0' }} onClick={() => { onClickWindowOpen(item?.more_link ?? "/") }}>
                                                    <img src={youtubeRowIcon} style={{ height: '24px' }} />
                                                    <div style={{ fontSize: theme.size.font4, marginLeft: '8px' }}>더 많은 영상보기 {'>'}</div>
                                                </div>
                                            </div>
                                            <Iframe src={`https://www.youtube.com/embed/${item.video_link}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></Iframe>
                                        </RowVideoContent>
                                    </>
                                ))}

                            </Slider>

                        </ShadowContainer>
                        <div style={{ marginTop: '36px' }} />
                        <RowLastColumnContent>
                            <HalfContent>
                                <Title className='pointer' text={'더보기'} text_link={'/servicecenter'}>공지사항</Title>
                                {notices.length > 0 && notices.map((item, idx) => (
                                    <>
                                        <NoticeContainer onClick={() => navigate(`/post/notice/${item?.pk}`)}>
                                            <NoticeImg  src={item?.main_img ? (backUrl + item?.main_img) : defaultImageSrc} />
                                            <NoticeContent>
                                                <div style={{ display: 'flex', fontWeight: 'bold', fontSize: theme.size.font3 }}>
                                                    <div style={{ marginRight: '8px', color: '#b48d4c' }}>NOTICE</div>
                                                    <div>{item?.title}</div>
                                                </div>
                                                <div style={{margin:`${window.innerWidth>=450?'':'8px 0 0 auto'}`}}>{item?.date.substring(0, 10)}</div>
                                            </NoticeContent>
                                        </NoticeContainer>
                                    </>
                                ))}
                            </HalfContent>
                            <HalfContent>
                                <Title className='pointer'>퍼스트앱</Title>
                                <RowContent style={{ flexWrap: 'wrap' }}>
                                    {apps.length > 0 && apps.map((item, idx) => (
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '24px', width: '124px', alignItems: 'center', cursor: 'pointer', marginBottom: '16px' }} onClick={() => onClickWindowOpen(item?.link)}>
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