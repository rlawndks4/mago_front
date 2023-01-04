
import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType, ViewerContainer, Content, TextButton, TextFillButton } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { commarNumber, getIframeLinkByLink } from "../../../functions/utils";
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

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const { data: response } = await axios.get(`/api/item?table=academy_category&pk=${params.pk}`);
            console.log(response)
            setPosts(response?.data);
            setLoading(false);
        }
        fetchPosts();
    }, [])

    const selectTypeNum = async (num) => {
        setLoading(true);
        setTypeNum(num);
        setLoading(false);
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
                        <div style={{padding:'8px 24px',borderBottom:`1px solid ${theme.color.font2}`,width:'150px',textAlign:'center',margin:'0 auto',fontSize:theme.size.font4,fontWeight:'bold'}}>{posts?.title}</div>
                        <AcademySubCard item={posts} is_detail={true} />
                        <SelectTypeComponent selectTypeNum={selectTypeNum} num={typeNum}
                            posts={[
                                { title: '소개' },
                                { title: '혜택' },
                                { title: '리더' },
                                { title: '커리큘럼' },
                                { title: '이용후기' },
                            ]} />
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
                                <ViewerContainer className="viewer">
                                    <Viewer initialValue={posts?.benefit_note ?? `<body></body>`} />
                                </ViewerContainer>
                            </>
                            :
                            <></>}
                        {typeNum == 2 ?
                            <>
                                <ViewerContainer className="viewer">
                                    <Viewer initialValue={posts?.leader_note ?? `<body></body>`} />
                                </ViewerContainer>
                            </>
                            :
                            <></>}
                        {typeNum == 3 ?
                            <>
                                <Viewer initialValue={posts?.curriculum_note ?? `<body></body>`} />
                            </>
                            :
                            <></>}
                        {typeNum == 4 ?
                            <>

                            </>
                            :
                            <></>}
                    </>}

            </Wrappers>
        </>
    )
}
export default Academy;