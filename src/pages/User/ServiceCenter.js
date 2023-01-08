
import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import theme from '../../styles/theme';
import axios from 'axios';
import { backUrl, slideSetting } from '../../data/Data';
import { Wrappers, Title, Content, TextButton, ViewerContainer } from '../../components/elements/UserContentTemplete';
import Loading from '../../components/Loading';
import $ from 'jquery';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import AcademyCard from '../../components/AcademyCard';
import SelectTypeComponent from '../../components/SelectTypeComponent';
import MBottomContent from '../../components/elements/MBottomContent';
import PageContainer from '../../components/elements/pagination/PageContainer';
import PageButton from '../../components/elements/pagination/PageButton';
import { commarNumber, range } from '../../functions/utils';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { Viewer } from '@toast-ui/react-editor';
const ServiceCenter = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pageList, setPageList] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        async function fetchPost() {
            let num = 0;
            if (state) {
                num = state?.type_num ?? 0;
            }
            selectTypeNum(num);
        }
        fetchPost();

    }, [])

    const selectTypeNum = async (num) => {
        setTypeNum(num);
        setPage(1);
        let api_str = "";
        let obj = {};
        obj['page'] = 1;
        obj['page_cut'] = 10;
        if (num == 0) {
            obj['table'] = 'notice';
            api_str = '/api/items';
        } else if (num == 1) {
            obj['table'] = 'request';
            api_str = '/api/myitems';
        } else if (num == 2) {
            obj['table'] = 'faq';
            api_str = '/api/items';
        }
        const { data: response } = await axios.post(api_str, obj);
        console.log(response)
        setPosts(response?.data?.data);
        setPageList(range(1, response?.data?.maxPage));
    }
    const onChangePage = async (num) => {
        let api_str = "";
        let obj = {};
        setPage(num);
        obj['page'] = num;
        obj['page_cut'] = 10;
        if (typeNum == 0) {
            obj['table'] = 'notice';
            api_str = '/api/items';
        } else if (typeNum == 1) {
            obj['table'] = 'request';
            api_str = '/api/myitems';
        } else if (typeNum == 2) {
            obj['table'] = 'faq';
            api_str = '/api/items';
        }
        const { data: response } = await axios.post(api_str, obj);
        console.log(response)
        setPosts(response?.data?.data);
        setPageList(range(1, response?.data?.maxPage));
    }
    return (
        <>
            <Wrappers className='wrappers'>
                {loading ?
                    <>
                    </>
                    :
                    <>
                        <Title className='pointer' link={'/academylist'} line={true}>고객센터</Title>
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={typeNum} is_space_between={true}
                            posts={[
                                { title: '공지사항' },
                                { title: '문의하기' },
                                { title: '자주하는 질문' },
                            ]} />
                        {typeNum == 0 ?
                            <>
                                <Content style={{ marginTop: '16px' }}>
                                    {/* <div style={{ color: theme.color.font2, display: 'flex', justifyContent: 'space-between', fontSize: theme.size.font4, borderBottom: `1px solid ${theme.color.font4}`, padding: '6px 0' }}>
                                        <div style={{ width: '30%', textAlign: 'center' }}>작성자</div>
                                        <div style={{ width: '40%', textAlign: 'center' }}>제목</div>
                                        <div style={{ width: '30%', textAlign: 'center' }}>작성일</div>
                                    </div> */}
                                    <div style={{ borderBottom: `1px solid ${theme.color.font4}` }} />
                                    {posts && posts.length > 0 && posts.map((item, idx) => (
                                        <>
                                            <div style={{
                                                color: theme.color.font2, display: 'flex', flexDirection: 'column', fontSize: theme.size.font3,
                                                padding: '6px 0', cursor: 'pointer', borderBottom: `1px solid ${theme.color.font4}`
                                            }}
                                                onClick={() => navigate(`/post/notice/${item?.pk}`)}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextButton style={{ width: '48px', border: `1px solid ${theme.color.font5}`, marginRight: '8px' }}>공지</TextButton>
                                                    <div style={{ fontWeight: 'bold', color: theme.color.font1 }}>{item?.title}</div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', fontSize: theme.size.font5, marginTop: '8px' }}>
                                                    <div style={{ marginRight: '6px' }}>{item?.nickname}</div>
                                                    <div style={{ marginRight: '6px', color: theme.color.font3 }}>{item?.date.substring(0, 10)}</div>
                                                    <div style={{ marginRight: '6px' }}>조회수</div>
                                                    <div style={{ color: theme.color.font3 }}>{commarNumber(item?.views)}</div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </Content>
                            </>
                            :
                            <>
                            </>}
                        {typeNum == 1 ?
                            <>
                                <Content style={{ marginTop: '16px' }}>
                                    <div style={{ color: theme.color.font2, display: 'flex', justifyContent: 'space-between', fontSize: theme.size.font4, borderBottom: `1px solid ${theme.color.font4}`, padding: '6px 0' }}>
                                        <div style={{ width: '50%', textAlign: 'left' }}>제목</div>
                                        <div style={{ width: '25%', textAlign: 'end' }}>작성일</div>
                                        <div style={{ width: '25%', textAlign: 'end' }}>비고</div>
                                    </div>
                                    {posts && posts.length > 0 && posts.map((item, idx) => (
                                        <>
                                            <div style={{ color: theme.color.font2, display: 'flex', justifyContent: 'space-between', fontSize: theme.size.font4, padding: '6px 0', cursor: 'pointer' }}
                                                onClick={() => navigate(`/request/${item?.pk}`)}>
                                                <div style={{ width: '50%', textAlign: 'left' }}>{item?.title}</div>
                                                <div style={{ width: '25%', textAlign: 'end', }}>{item?.date.substring(0, 10)}</div>
                                                <div style={{ width: '25%', textAlign: 'end' }}>{item?.status == 1 ? '답변완료' : '확인대기'}</div>
                                            </div>
                                        </>
                                    ))}
                                    <div style={{ width: '100%', display: 'flex', margin: '16px 0' }}>
                                        <TextButton style={{ margin: '0 4px 0 auto' }} onClick={() => { navigate('/request') }}>글쓰기</TextButton>
                                    </div>
                                </Content>
                            </>
                            :
                            <>
                            </>}
                        {typeNum == 2 ?
                            <>
                                <div style={{ marginTop: '16px', borderBottom: `1px solid ${theme.color.font4}` }} />
                                {posts && posts.length > 0 && posts.map((item, idx) => (
                                    <>
                                        <div style={{ color: theme.color.font2, display: 'flex', flexDirection: 'column', fontSize: theme.size.font4, padding: '6px 0', cursor: 'pointer', borderBottom: `1px solid ${theme.color.font4}` }}
                                            onClick={() => {
                                                let list = [...posts];
                                                if (list[idx]?.is_see) {
                                                    list[idx]['is_see'] = false;
                                                } else {
                                                    list[idx]['is_see'] = true;
                                                }
                                                setPosts(list)
                                            }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ fontSize: theme.size.font3, fontWeight: 'bold', color: theme.color.font1 }}>Q. {item?.title}</div>
                                                {posts[idx]?.is_see ?
                                                    <>
                                                        <AiFillCaretUp />
                                                    </>
                                                    :
                                                    <>
                                                        <AiFillCaretDown />
                                                    </>}
                                            </div>
                                            {posts[idx]?.is_see ?
                                                <>
                                                    <div style={{ width: '100%', display: 'flex' }}>
                                                        <ViewerContainer className="viewer" style={{ margin: '0' }}>
                                                            <Viewer initialValue={item?.note ?? `<body></body>`} />
                                                        </ViewerContainer>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                </>}

                                        </div>
                                    </>
                                ))}
                            </>
                            :
                            <>
                            </>}
                        <MBottomContent>
                            <div />
                            <PageContainer>
                                <PageButton onClick={() => onChangePage(1)}>
                                    처음
                                </PageButton>
                                {pageList.map((item, index) => (
                                    <>
                                        <PageButton onClick={() => onChangePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                            {item}
                                        </PageButton>
                                    </>
                                ))}
                                <PageButton onClick={() => onChangePage(pageList.length ?? 1)}>
                                    마지막
                                </PageButton>
                            </PageContainer>
                            <div />
                        </MBottomContent>
                    </>}
            </Wrappers>
        </>
    )
}
export default ServiceCenter;