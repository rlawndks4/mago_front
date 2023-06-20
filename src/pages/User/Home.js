import React, { useRef } from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { backUrl, defaultImageSrc, slideSetting } from '../../data/Data';
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, ShadowContainer, RowContent } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getIframeLinkByLink, onClickExternalLink, onClickWindowOpen, overString } from '../../functions/utils';
import playStoreSrc from '../../assets/images/test/google-play.jpg'
import { Merchandise } from './Shop/ShopList';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import twoForurImg from '../../assets/images/banner/detail.jpg'
import detailImg from '../../assets/images/banner/24hour.jpg'
import homeTaiImg from '../../assets/images/banner/hometai.jpg'
import koreanImg from '../../assets/images/banner/korean.jpg'
import taiImg from '../../assets/images/banner/tai.jpg'
import shop1Img from '../../assets/images/banner/1shop.jpg'
import locationGoToImg from '../../assets/images/test/loacation_go_to.png'
import requestGif from '../../assets/images/banner/request.gif'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

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
const MerchandiseContainer = styled.div`
width: 100%;
display: flex;
flex-wrap:wrap;
column-gap: 60px;
grid-row-gap: 10px;
row-gap: 30px;
margin:2rem auto;
@media (max-width: 1350px) {
  column-gap: 4.2vw;
}
@media (max-width: 650px) {
    
}
@media (max-width: 550px) {
  column-gap: 4.2vw;
}
`
const CityCard = styled.img`
width: 23%;
height:66px;
margin:0.5rem 1%;
cursor:pointer;
@media screen and (max-width:1050px) { 
    width: 40vw;
    height: 10vw;
    margin:0.5rem 2.5%;
}
`
const HalfImg = styled.img`
width: 48.5%;
border-radius:32px;
box-shadow:${props => props.theme.boxShadow};
cursor:pointer;
`
const ThreeHalfImg = styled.img`
width: 30%;
border-radius:16px;
box-shadow:${props => props.theme.boxShadow};
`
const Mobile90PercentContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin: 0 auto;
@media screen and (max-width:1050px) { 
    width: 90%;
}
`
const NextArrow = ({ onClick }) => {
    return (
        <div className="nextArrow" onClick={onClick}>
            <MdNavigateNext style={{ color: '#fff' }} />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="prevArrow" onClick={onClick}>
            <MdNavigateBefore style={{ color: '#fff' }} />
        </div>
    );
};
const Home = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [banners, setBanners] = useState([]);
    const [bannerLinks, setBannerLinks] = useState({});
    const [cityList, setCityList] = useState([])
    const [shopList, setShopList] = useState([])

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        nextArrow: <NextArrow onClick />,
        prevArrow: <PrevArrow onClick />,
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
            setCityList(response?.data?.city ?? []);
            setBanners(banner_list);
            setShopList(response?.data?.shop ?? []);
            setLoading(false);
        }
        fetchPost();

    }, [])

    return (
        <>
            <WrappersStyle style={{ maxWidth: '1150px' }}>
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
                <Mobile90PercentContainer style={{ marginTop: '1rem' }}>
                    <HalfImg src={koreanImg} onClick={() => navigate('/shop-list?is_around=1&theme=6')} />
                    <HalfImg src={homeTaiImg} onClick={() => navigate('/shop-list?is_around=1&theme=4')} />
                </Mobile90PercentContainer>
                <Mobile90PercentContainer style={{ marginTop: '1rem' }}>
                    <HalfImg src={shop1Img} onClick={() => navigate('/shop-list?is_around=1&theme=9')} />
                    <HalfImg src={requestGif} onClick={() => navigate('/add-shop')} />
                </Mobile90PercentContainer>
            </WrappersStyle>
            <Wrappers className='wrappers' style={{ marginTop: '0.5rem' }}>
                {loading ?
                    <>
                    </>
                    :
                    <>


                        <img src={locationGoToImg} style={{ width: '90%', margin: '0 auto',maxWidth:'700px' }} />
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {cityList && cityList.map((item, idx) => (
                                <>
                                    <CityCard src={backUrl + item?.img_src} idx={idx} onClick={() => {
                                        navigate(`/shop-list?city=${item?.pk}`)
                                    }} />
                                </>
                            ))}
                        </RowContent>
                        <RowContent style={{ margin: '4rem 0 0 0', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                                <div style={{ margin: 'auto auto 0.5rem auto' }}>
                                    마고 어플 출시!!

                                </div>
                                <div style={{ margin: '0.5rem auto auto auto' }}>
                                    지금 바로 다운 받으세요!!
                                </div>
                            </div>
                            <img src={playStoreSrc} style={{ width: '50%', }} alt="#" />
                        </RowContent>
                    </>}
                <MerchandiseContainer>
                    {shopList && shopList.map((item, idx) => (
                        <>
                            <Merchandise
                                navigate={navigate}
                                item={item}
                            />
                        </>
                    ))}
                </MerchandiseContainer>
            </Wrappers>
        </>
    )
}
export default Home;