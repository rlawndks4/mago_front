import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { getIframeLinkByLink } from "../../../functions/utils";
import { backUrl } from "../../../data/Data";
import VideoCard from "../../../components/VideoCard";


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
background:${props => props.theme.color.background3};
text-align:left;
height:112px;
margin:6px 0;
color:${props => props.theme.color.font1};
font-weight:bold;
font-size:${props => props.theme.size.font3};
cursor:pointer;
position:relative;
`
const Master = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(1)
    const [subTypeNum, setSubTypeNum] = useState(0)
    const [master, setMaster] = useState({})
    useEffect(() => {
        async function fetchPosts() {
            const {data:master_response} = await axios.get(`/api/item?table=user&pk=${params.pk}`);
            setMaster(master_response?.data)
            const { data: response } = await axios.get(`/api/items?table=strategy&user_pk=${params.pk}`);
            setPosts(response.data)
        }
        fetchPosts();
    }, [])

    const changeType = async (num) => {
        setTypeNum(num);
        let str = "";
        if (num == 1) {
            str = `/api/items?table=strategy&user_pk=${params.pk}`
            const { data: response } = await axios.get(str);
            setPosts(response.data);
        } else {
            str = `/api/items?table=video&user_pk=${params.pk}`
            const { data: response } = await axios.get(str);
            let list = response.data;
            for (var i = 0; i < list.length; i++) {
                list[i].link = getIframeLinkByLink(list[i].link);
            }
            setPosts(list);
        }
    }
    return (
        <>
            <Wrappers>
                <Card2 onClick={() => { }}>
                    <div style={{ width: '50%', padding: '20px' }}>
                        <div>{master?.nickname}</div>
                        <div style={{ fontSize: `${theme.size.font5}`, marginTop: '8px', color: `${theme.color.font2}` }}>{master?.name} 전문가</div>
                    </div>
                    <img style={{ position: 'absolute', bottom: '0', right: '5%', height: '80%' }} alt="#" src={backUrl + master?.profile_img} />
                </Card2>
                <SelectType className="select-type">
                    <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1) }}>전문가칼럼</Type>
                    <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2) }}>핵심비디오</Type>
                </SelectType>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {posts.map((item, idx) => (
                        <>
                            {typeNum == 1 ?
                                <>

                                    <ThemeCard item={item} category={'strategy'} />

                                </>
                                :
                                <>
                                    <VideoCard item={item} />
                                </>
                            }
                        </>
                    ))}
                </div>
            </Wrappers>
        </>
    )
}
export default Master;