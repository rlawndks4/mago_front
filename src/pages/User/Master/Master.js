import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType, ViewerContainer, Content, TextButton, TextFillButton } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { commarNumber, getIframeLinkByLink } from "../../../functions/utils";
import { backUrl } from "../../../data/Data";
import masterCardIcon from '../../../assets/images/test/master-card.svg'
import { Viewer } from '@toast-ui/react-editor';
import Loading from "../../../components/Loading";
import AcademySubCard from "../../../components/AcademySubCard";

const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
`


const ReviewCard = (props) => {
    let { item } = props;
    return (
        <>
        </>
    )
}
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
const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(1);
    const [subTypeNum, setSubTypeNum] = useState(0);
    const [master, setMaster] = useState({});
    const [academyList, setAcademyList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true);
            const { data: master_response } = await axios.get(`/api/item?table=user&pk=${params.pk}`);
            console.log(master_response)
            setMaster(master_response?.data);
            setLoading(false);
        }
        fetchPosts();
    }, [])

    const changeType = async (num) => {
        setTypeNum(num);
        let str = "";
        if (num == 2) {
            str = `/api/items?table=academy_category&master_pk=${params.pk}`
            const { data: response } = await axios.get(str);
            console.log(response)
            setAcademyList(response?.data);
        } else if (num == 3) {

        }
    }
    return (
        <>
            <Wrappers>
                <Card2>
                    <img src={masterCardIcon} style={{ height: '100%', borderRadius: theme.borderRadius }} />
                    <SubMasterImg alt="#" src={backUrl + master?.sub_profile_img} />
                    <div style={{ position: 'absolute', top: '10%', right: '0%', display: 'flex', flexDirection: 'column', width: '30%',minWidth:'120px' }}>
                        <div style={{ fontSize: theme.size[`${window.innerWidth>=700?'font4':'font5'}`],color:theme.color.background1 }}>{master?.nickname}</div>
                        <div style={{ fontSize: theme.size[`${window.innerWidth>=700?'font4':'font5'}`], margin: '4px 0 8px 0', color: `${theme.color.font2}` }}>{master?.name} 전문가</div>
                        <div style={{ fontSize: theme.size[`${window.innerWidth>=700?'font5':'font6'}`], maxWidth: '120px', whiteSpace: 'pre-line',color:theme.color.font2 }}>{master?.record_note}</div>
                    </div>
                </Card2>
                <RecordCard>

                </RecordCard>
                <SelectType className="select-type">
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1) }}>소개</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2) }}>강의</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 3 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 3 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(3) }}>이용후기</Type>
                </SelectType>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        {typeNum == 1 ?
                            <>
                                <ViewerContainer className="viewer">
                                    <Viewer initialValue={master?.introduce_note ?? `<body></body>`} />
                                </ViewerContainer>
                            </>
                            :
                            <></>}
                        {typeNum == 2 ?
                            <>
                                <Content>
                                    {academyList.map((item, idx) => (
                                        <>
                                            <AcademySubCard item={item} />
                                        </>
                                    ))}
                                </Content>
                            </>
                            :
                            <></>}
                        {typeNum == 3 ?
                            <>
                            </>
                            :
                            <></>}
                    </>}

            </Wrappers>
        </>
    )
}
export default Master;