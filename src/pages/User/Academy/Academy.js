
import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType, ViewerContainer, Content, Title, } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { commarNumber, getIframeLinkByLink, range } from "../../../functions/utils";
import { backUrl } from "../../../data/Data";
import masterCardIcon from '../../../assets/images/test/master-card.svg';
import { Viewer } from '@toast-ui/react-editor';
import Loading from "../../../components/Loading";
import AcademySubCard from "../../../components/AcademySubCard";
import SelectTypeComponent from "../../../components/SelectTypeComponent";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";
import SideSelectTypeComponent from "../../../components/SideSelectTypeComponent";
import $ from 'jquery';
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
const RowContent = styled.div`
display:flex;
width:100%;
margin-top:24px;
@media screen and (max-width:700px) { 
    flex-direction:column;
}
`
const Academy = () => {

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
        const { data: response } = await axios.get(`/api/getacademycategorycontent?pk=${params.pk}&page=${num}`);
        console.log(response)
        if (response?.data?.academy_content) {
            setPosts(response?.data?.academy_content);
        }
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
                        {/* <div style={{ padding: '8px 24px', borderBottom: `1px solid ${theme.color.font2}`, width: '150px', textAlign: 'center', margin: '0 auto', fontSize: theme.size.font4, fontWeight: 'bold' }}>{posts?.title}</div> */}
                        <AcademySubCard item={posts} is_detail={true} />
                        <RowContent>
                            <SideSelectTypeComponent
                                data={[
                                    { title: '소개' },
                                    { title: '혜택' },
                                    { title: '리더' },
                                    { title: '커리큘럼' },
                                    { title: '이용후기' },
                                ]}
                                schema={'academy'}
                                typeNum={typeNum}
                                onClickTypeNum={onClickTypeNum}
                                setTypeNum={setTypeNum}
                            />
                            <Content>
                                <Title id='div-0'>소개</Title>
                                <ViewerContainer className="viewer">
                                    <ReactQuill
                                        value={posts?.introduce_note ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                    />
                                </ViewerContainer>
                                <Title id='div-1'>혜택</Title>
                                <ViewerContainer className="viewer">
                                <ReactQuill
                                        value={posts?.benefit_note ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                    />
                                </ViewerContainer>
                                <Title id='div-2'>리더</Title>
                                <ViewerContainer className="viewer">
                                <ReactQuill
                                        value={posts?.leader_note ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                        bounds={'.app'}
                                    />
                                </ViewerContainer >
                                <Title id='div-3'>커리큘럼</Title>
                                <ViewerContainer className="viewer">
                                <ReactQuill
                                        value={posts?.curriculum_note ?? `<body></body>`}
                                        readOnly={true}
                                        theme={"bubble"}
                                        bounds={'.app'}
                                    />
                                </ViewerContainer>
                                <Title id='div-4'>이용후기</Title>
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
export default Academy;