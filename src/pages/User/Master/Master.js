import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType, ViewerContainer, Content, TextButton, TextFillButton, Title } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { commarNumber, getIframeLinkByLink, range } from "../../../functions/utils";
import { backUrl } from "../../../data/Data";
import masterCardIcon from '../../../assets/images/test/master-card.svg'
import { Viewer } from '@toast-ui/react-editor';
import Loading from "../../../components/Loading";
import AcademySubCard from "../../../components/AcademySubCard";
import SelectTypeComponent from "../../../components/SelectTypeComponent";
import $ from 'jquery';
import SideSelectTypeComponent from "../../../components/SideSelectTypeComponent";
import ReviewCard from "../../../components/ReviewCard";
import MBottomContent from "../../../components/elements/MBottomContent";
import PageContainer from "../../../components/elements/pagination/PageContainer";
import PageButton from "../../../components/elements/pagination/PageButton";
const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
`


const Card2 = styled.div`
width:100%;
background:#FAFAFA;
text-align:left;
height:320px;
margin:6px 0;
color:${props => props.theme.color.font1};
font-weight:bold;
font-size:${props => props.theme.size.font3};
position:relative;
border-radius:${props => props.theme.borderRadius};
box-shadow:${props => props.theme.boxShadow};
@media screen and (max-width:650px) { 
    height:30vw;
    min-height:220px;
}
`
const SubMasterImg = styled.img`
position: absolute;
bottom: 0;
left: 5%;
height: 80%;
@media screen and (max-width:650px) { 
}
`
const RecordCard = styled.div`

`
const RowContent = styled.div`
display:flex;
width:100%;
@media screen and (max-width:700px) { 
    flex-direction:column;
}
`


const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(0);
    const [subTypeNum, setSubTypeNum] = useState(0);
    const [master, setMaster] = useState({});
    const [academyList, setAcademyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        changePage(1, true)
    }, [])
    const changePage = async (num, is_load) => {
        if (is_load) {
            setLoading(true);
        }
        setPage(num);
        const { data: response } = await axios.get(`/api/getmastercontent?pk=${params.pk}&page=${num}`);
        console.log(response)
        if (response?.data?.master_content) {
            setMaster(response?.data?.master_content);
        }
        setAcademyList(response?.data?.academy);
        setReviewList(response?.data?.review_list);
        setPageList(range(1, response?.data?.maxPage));
        setLoading(false);
    }
    const onClickTypeNum = (num) => {
        setTypeNum(num);
        let offset = $(`#div-${num}`).offset();
        $('html').animate({ scrollTop: offset.top - 160 }, 400);
    }
    return (
        <>
            <Wrappers>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <Card2>
                            <img src={masterCardIcon} style={{ height: '100%', borderRadius: theme.borderRadius }} />
                            <SubMasterImg alt="#" src={backUrl + master?.sub_profile_img} />
                            <div style={{ position: 'absolute', top: '10%', right: '0%', display: 'flex', flexDirection: 'column', width: '30%', minWidth: '120px' }}>
                                <div style={{ fontSize: theme.size[`${window.innerWidth >= 700 ? 'font4' : 'font5'}`], color: theme.color.background1 }}>{master?.nickname}</div>
                                <div style={{ fontSize: theme.size[`${window.innerWidth >= 700 ? 'font4' : 'font5'}`], margin: '4px 0 8px 0', color: `${theme.color.font2}` }}>{master?.name} 전문가</div>
                                <div style={{ fontSize: theme.size[`${window.innerWidth >= 700 ? 'font5' : 'font6'}`], maxWidth: '120px', whiteSpace: 'pre-line', color: theme.color.font2 }}>{master?.record_note}</div>
                            </div>
                        </Card2>
                        <RowContent>
                            <SideSelectTypeComponent
                                data={[
                                    { title: '소개' },
                                    { title: '강의' },
                                    { title: '이용후기' }
                                ]}
                                schema={'master'}
                                typeNum={typeNum}
                                onClickTypeNum={onClickTypeNum}
                            />
                            <Content>
                                <Title id='div-0'>소개</Title>
                                <ViewerContainer className="viewer">
                                    <Viewer initialValue={master?.introduce_note ?? `<body></body>`} />
                                </ViewerContainer>
                                <Title id='div-1'>강의</Title>
                                <Content>
                                    {academyList && academyList.map((item, idx) => (
                                        <>
                                            <AcademySubCard item={item} />
                                        </>
                                    ))}
                                </Content>
                                <Title id='div-2'>이용후기</Title>
                                {reviewList && reviewList.map((item, idx) => (
                                    <>
                                        <ReviewCard item={item} />
                                    </>
                                ))}
                                <MBottomContent>
                                    <div />
                                    <PageContainer>
                                        <PageButton onClick={() => changePage(1)}>
                                            처음
                                        </PageButton>
                                        {pageList.map((item, index) => (
                                            <>
                                                <PageButton onClick={() => changePage(item)} style={{ color: `${page == item ? '#fff' : ''}`, background: `${page == item ? theme.color.background1 : ''}`, display: `${Math.abs(index + 1 - page) > 4 ? 'none' : ''}` }}>
                                                    {item}
                                                </PageButton>
                                            </>
                                        ))}
                                        <PageButton onClick={() => changePage(pageList.length ?? 1)}>
                                            마지막
                                        </PageButton>
                                    </PageContainer>
                                    <div />
                                </MBottomContent>
                            </Content>
                        </RowContent>
                    </>}

            </Wrappers>
        </>
    )
}
export default Master;