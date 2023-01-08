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
const WrappersStyle = styled.div`
position:relative;
display:flex;
flex-direction:column;
width:100%;
max-width:1000px;
margin-top:8rem;
margin-left:auto;
margin-right:auto;
@media screen and (max-width:1050px) { 
    margin-top:4rem;
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
                navigate(-1);
            }
            setMasterList(response?.data?.master);
            setBestContents(response?.data?.academy);
            $('span.lazy-load-image-background').addClass('width-100');
            setLoading(false);
        }
        fetchPost();

    }, [])

    const selectTypeNum = async (num) => {
        let num_list = [...numList];
        let is_add = true;
        for(var i = 0;i<num_list.length;i++){
            if(num==num_list[i]){
                num_list.splice(i,1);
                is_add = false;
                break;
            }
        }
        if(is_add){
            num_list.push(num);
        }
        const {data:response} = await axios.post('/api/myacademyclasses',{
            list:num_list.map((item)=>{
                return masterList[item]?.pk
            })
        })
        setBestContents(response?.data);
        setNumList([...num_list])
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
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={numList} is_list={true}
                            posts={masterList} />
                        <RowContent style={{ flexWrap: 'wrap' }}>
                            {bestContents && bestContents.map((item, idx) => (
                                <>
                                    <AcademyCard item={item} idx={idx} link={`/myacademy/${item?.pk}`} />
                                </>
                            ))}
                        </RowContent>
                    </>}


            </Wrappers>
        </>
    )
}
export default AcademyList;