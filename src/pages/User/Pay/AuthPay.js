
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

const AuthPay = () => {

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
            const { data: response } = await axios.get(`/api/auth`);
            console.log(response)
            if(response?.pk>0){

            }else{
                alert("회원전용 메뉴입니다.");
                navigate('/login')
            }
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

            </Wrappers>
        </>
    )
}
export default AuthPay;