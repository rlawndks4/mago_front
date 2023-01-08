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

const ReviewList = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(0);
    const [subTypeNum, setSubTypeNum] = useState(0);
    const [master, setMaster] = useState({});
    const [academyList, setAcademyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [masterList, setMasterList] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get('/api/items?table=user&level=30');
            let master_list = [...response?.data];
            for(var i=0;i<master_list.length;i++){
                master_list[i]['title'] = master_list[i]['nickname'];
            }
            setMasterList([...[{title:'전체'}],...master_list]);
            $('span.lazy-load-image-background').addClass('width-100');
        }
        fetchPost();

    }, [])

    const selectTypeNum = async (num) => {
        setTypeNum(num);
    }
    return (
        <>
            <Wrappers className='wrappers'>
                {loading ?
                    <>
                    </>
                    :
                    <>
                        <Title className='pointer' link={'/academylist'} line={true}>수강후기</Title>
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={typeNum}
                            posts={masterList} />
                      
                    </>}


            </Wrappers>
        </>
    )
}
export default ReviewList;