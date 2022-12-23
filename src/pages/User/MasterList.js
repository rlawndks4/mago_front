import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import { backUrl } from "../../data/Data";
import theme from "../../styles/theme";

const Card = styled.div`
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
const MasterList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data: response } = await axios.get('/api/users?level=30&status=1');
            setPosts(response.data);
        }
        fetchPosts();
    }, [])
    return (
        <>
            <Wrappers>
                {posts.map((item, idx) => (
                    <>
                        <Card onClick={() => { navigate(`/master/${item.pk}`,{state:{name:item.name,nickname:item.nickname,img:item.profile_img}}) }}>
                            <div style={{ width: '50%', padding: '20px' }}>
                                <div>{item.nickname}</div>
                                <div style={{ fontSize: `${theme.size.font5}`, marginTop: '8px', color: `${theme.color.font2}` }}>{item.name} 전문가</div>
                            </div>
                            <img style={{ position: 'absolute', bottom: '0', right: '5%', height: '80%' }} alt="#" src={backUrl + item.profile_img} />
                        </Card>
                    </>
                ))}
            </Wrappers>
        </>
    )
}
export default MasterList;