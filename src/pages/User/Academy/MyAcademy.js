
import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType, ViewerContainer, Content, TextButton, TextFillButton, Title } from "../../../components/elements/UserContentTemplete";
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
import ItemCard from "../../../components/ItemCard";
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

const MyAcademy = () => {

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
    useEffect(() => {
        // async function fetchPosts() {
        //     setLoading(true);
        //     const { data: response } = await axios.post(`/api/myacademyclass`, {
        //         pk: params.pk
        //     });
        //     if (response?.result > 0) {
        //         setPosts(response?.data);
        //         setLoading(false);
        //     } else {
        //         alert(response?.message);
        //         navigate(-1);
        //     }
        // }
        // fetchPosts();
        // if(state?.type_num){
        // }
        selectTypeNum(1, 1);
    }, [])

    const selectTypeNum = async (num, page) => {
        setTypeNum(num);
        setPage(page);
        if (num == 1) {
            const { data: response } = await axios.post('/api/myacademylist', {
                pk: params?.pk,
                page: page
            })
            if (response?.result > 0) {
                setPageList(range(1, response?.data?.maxPage))
                setAcademyList(response?.data?.data);
            } else {
                alert(response?.message);
                navigate(-1);
            }
        }
    }
    const onChangePage = (num) => {
        selectTypeNum(1, num);
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
                        {/* <div style={{ padding: '8px 24px', borderBottom: `1px solid ${theme.color.font2}`, width: '150px', textAlign: 'center', margin: '0 auto', fontSize: theme.size.font4, fontWeight: 'bold' }}>{posts?.title}</div>
                        <AcademySubCard item={posts} is_detail={true} not_price={true} />
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={typeNum}
                            posts={[
                                { title: '소개' },
                                { title: '강의' },
                                { title: '이용후기' },
                            ]} /> */}
                        <Title line={true}>My 강의실</Title>
                        {typeNum == 0 ?
                            <>
                                <ViewerContainer className="viewer">
                                    <Viewer initialValue={posts?.introduce_note ?? `<body></body>`} />
                                </ViewerContainer>
                            </>
                            :
                            <></>}
                        {typeNum == 1 ?
                            <>
                                <Content>
                                    {academyList.map((item, idx) => (
                                        <>
                                            <ItemCard item={item} link={`/post/academy/${item?.pk}`} />
                                        </>
                                    ))}
                                    <TextButton style={{ margin: '16px 0 0 auto' }} onClick={() => navigate('/addreview', { state: { item_pk: params?.pk } })}>후기작성</TextButton>
                                </Content>
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
                            </>
                            :
                            <></>}
                        {typeNum == 2 ?
                            <>
                            </>
                            :
                            <></>}

                    </>}

            </Wrappers>
        </>
    )
}
export default MyAcademy;