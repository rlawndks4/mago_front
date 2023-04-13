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
import { getIframeLinkByLink, onClickExternalLink, onClickWindowOpen, overString } from '../../functions/utils';
import sec3TitIcon from '../../assets/images/icon/sec3_tit.png'
import youtubeRowIcon from '../../assets/images/icon/yotube-row.png'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
margin-top:6rem;
margin-left:auto;
margin-right:auto;
font-family:${props => props.theme.font.normal};
@media screen and (max-width:1050px) { 
    margin-top:4rem;
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
@media screen and (max-width:700px) { 
    height:55vw;
    margin-bottom:8px;
}
`
const RowVideoContent = styled.div`
display:flex;
width:100%;
position:relative;
@media screen and (max-width:700px) { 
    flex-direction:column-reverse;
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
`
const NoticeImg = styled.img`
height: 100px;
width: 150px;
@media screen and (max-width:700px) { 
    margin:0 auto 8px auto;
    width:30vw;
    height:20vw;
}
`
const NoticeContent = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
margin: 0 auto 0 8px;
width:306px;
@media screen and (max-width:1000px) {
width:100%;
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
            setBanners(banner_list);

            setLoading(false);
        }
        fetchPost();
        
    }, [])
    
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

                    </>}


            </Wrappers>
        </>
    )
}
export default Home;