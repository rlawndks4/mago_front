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
import SelectTypeComponent from '../../components/SelectTypeComponent';


const AcademyList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [bestContents, setBestContents] = useState([]);
    const [typeNum, setTypeNum] = useState(0);
    const [masterList, setMasterList] = useState([]);
    const [numList, setNumList] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            setLoading(true);
            const { data: response } = await axios.get('/api/getacademylist');
            if(response?.result<0){
                alert("회원전용 메뉴입니다.");
                navigate('/login');
            }
            setMasterList([...[{title:'전체'}],...response?.data?.master]);
            let academy_list = [];
            for(var i = 0;i<response?.data?.academy.length;i++){
                if(response?.data?.academy[i]?.use_status==1){
                    academy_list.push(response?.data?.academy[i]);
                }
            }
            setBestContents(academy_list);
            $('span.lazy-load-image-background').addClass('width-100');
            setLoading(false);
        }
        fetchPost();

    }, [])
    const selectTypeNum = async (num) => {
        setTypeNum(num);
        const {data:response} = await axios.post('/api/myacademyclasses',{
            master_pk:masterList[num]?.pk
        })
        setBestContents(response?.data);
    }
    return (
        <>
            <Wrappers className='wrappers'>
                {loading ?
                    <>
                    <Loading/>
                    </>
                    :
                    <>
                        <Title className='pointer' link={'/academylist'} line={true}>My 강의실</Title>
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={typeNum}
                            posts={masterList} subTypePadding={'16px 0'}/>
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {bestContents && bestContents.map((item, idx) => (
                                <>
                                    <AcademyCard item={item} idx={idx} inst_arr={true} link={`/myacademy/${item?.pk}`} />
                                </>
                            ))}
                        </RowContent>
                    </>}


            </Wrappers>
        </>
    )
}
export default AcademyList;