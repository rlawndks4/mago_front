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
import { Wrappers, Title, Content, Card, Img, WrapDiv, SliderDiv, ShadowContainer, RowContent, TextFillButton } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AcademyCard from '../../components/AcademyCard';
import SelectTypeComponent from '../../components/SelectTypeComponent';
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
const EnrolmentList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [bestContents, setBestContents] = useState([]);
    const [banners, setBanners] = useState([]);
    const [bottomBanners, setBottomBanners] = useState("");
    const [masterList, setMasterList] = useState([]);
    const difficulty_list = [
        { name: '왕초보', val: 1 },
        { name: '검색기', val: 2 },
        { name: '단타', val: 3 },
        { name: '종목발굴', val: 4 },
        { name: '기억분석', val: 5 },
    ]
    const [difficultyNum, setDifficultyNum] = useState(0);
    const [typeNum, setTypeNum] = useState(0);
    const [selectContents, setSelectContents] = useState([]);

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
            const { data: response } = await axios.get('/api/getenrolmentlist')
            console.log(response)
            let banner_list = [];
            for (var i = 1; i <= 5; i++) {
                if (response?.data?.banner[`enrolment_banner_img_${i}`]) {
                    await banner_list.push(`${backUrl + response?.data?.banner[`enrolment_banner_img_${i}`]}`);
                }
            }
            if (response?.data?.banner[`enrolment_bottom_banner`]) {
                setBottomBanners(`${backUrl + response?.data?.banner[`enrolment_bottom_banner`]}`)
            }
            setBanners(banner_list)
            setBestContents(response?.data?.best_academy);
            setMasterList([...[{title:'전체'}],...response?.data?.master]);
            setSelectContents(response?.data?.contents);
            setTimeout(() => setLoading(false), 1000);
            $('span.lazy-load-image-background').addClass('width-100');
        }
        fetchPost();
    }, [])

    const selectTypeNum = async (num) => {
        setTypeNum(num);
        setDifficultyNum(0);
        let str = `/api/items?table=academy_category`;
        if(num!=0){
            str += `&master_pk=${masterList[num]?.pk}`
        }
        const { data: response } = await axios.get(str);
        setSelectContents(response?.data);
    }
    const selectDifficulty = async (num) => {
        setDifficultyNum(num);
        let str = "";
        str = `/api/items?table=academy_category&master_pk=${masterList[typeNum]?.pk}&difficulty=${num}`;
        const { data: response } = await axios.get(str);
        setSelectContents(response?.data);
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
                        
                    </>}
            </WrappersStyle>
            <Wrappers className='wrappers' style={{ marginTop: '16px' }}>
                {loading ?
                    <>
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
                                        className="enrolment-banner-img"
                                    />

                                </>
                            ))}
                        </Slider>
                        <Title className='pointer' link={'/academylist'} line={true} is_thumb={true}>오늘의 BEST 강의</Title>
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {bestContents.map((item, idx) => (
                                <>
                                    <AcademyCard item={item} idx={idx} />
                                </>
                            ))}

                        </RowContent>
                        {/* <RowContent style={{justifyContent:'space-between',margin:'8px 0'}}>
                            {difficulty_list.map((item, idx)=>(
                                <>
                                <TextFillButton style={{color:`${difficultyNum==item?.val?theme.color.font1:theme.color.font2}`,background:theme.color.background1,border:`1px solid ${theme.color.background1}`,width:'18%',minWidth:'48px',height:'32px'}}
                                onClick={()=>selectDifficulty(item?.val)}>
                                    {item?.name}
                                </TextFillButton>
                                </>
                            ))}
                        </RowContent> */}
                        <div style={{marginTop:'104px'}} />
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={typeNum}
                            posts={masterList} />
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {selectContents.map((item, idx) => (
                                <>
                                    <AcademyCard item={item} idx={idx} />
                                </>
                            ))}

                        </RowContent>
                        <Content>
                            <img
                                alt={"#"}
                                effect="blur"
                                src={bottomBanners}
                                style={{ width: '100%', height: 'auto',maxWidth:'400px',margin:'16px auto' }}
                            />
                        </Content>
                    </>}


            </Wrappers>
        </>
    )
}
export default EnrolmentList;