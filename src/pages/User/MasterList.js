import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RowContent, Title, Wrappers } from "../../components/elements/UserContentTemplete";
import { backUrl } from "../../data/Data";
import theme from "../../styles/theme";
import nextButtonIcon from '../../assets/images/icon/next-button.svg'
import clipIcon from '../../assets/images/icon/clip.svg'
const Card = styled.div`
text-align:left;
margin:6px 0;
color:#fff;
background:${props => props.theme.color.font3};
font-weight:bold;
font-size:${props => props.theme.size.font4};
cursor:pointer;
position:relative;
border-top-left-radius:20px;
border-bottom-right-radius:20px;
width:21%;
height:280px;
box-shadow:${props => props.theme.boxShadow};
@media screen and (max-width:1000px) { 
    width:45%;
    height:54vw;
}
@media screen and (max-width:550px) { 
    width:100%;
    height:120vw;
}
`
const getReturnMargin = (innerWidth, idx) => {
    let margin_str = "";
    if (innerWidth >= 1000) {
        if (idx % 4 == 0) {
            margin_str = "0 auto 16px 0";
        } else if (idx % 4 == 1) {
            margin_str = "0 auto 16px auto";
        } else if (idx % 4 == 2) {
            margin_str = "0 auto 16px auto";
        } else if (idx % 4 == 3) {
            margin_str = "0 0 16px auto";
        }
    } else if (innerWidth >= 550) {
        if (idx % 2 == 0) {
            margin_str = "0 auto 16px 0";
        } else if (idx % 2 == 1) {
            margin_str = "0 0 16px auto";
        }
    } else {
        margin_str = "0 0 16px 0";
    }
    return margin_str;
}
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
                <Title line={true}>최고의 전문가를 소개합니다.</Title>
                <RowContent style={{flexWrap:'wrap',marginTop:'32px'}}>
                    <Card style={{ background: theme.color.background1, color: theme.color.font1, margin: getReturnMargin(window.innerWidth, 0),display:'flex',flexDirection:'column',textAlign:'left' }}>
                        <img src={clipIcon} style={{width:'auto',height:'32px',position:'absolute',right:'10%',top:'-16px'}} />
                        <div style={{margin:'auto auto 4px auto',width:'80%'}}>최고의</div>
                        <div style={{margin:'0 auto 4px auto',width:'80%'}}>전문가를</div>
                        <div style={{margin:'32px auto auto auto',width:'80%'}}>소개하겠습니다.</div>
                    </Card>
                    {posts.map((item, idx) => (
                        <>
                            <Card style={{ margin: getReturnMargin(window.innerWidth, idx + 1) }} onClick={()=>{navigate(`/master/${item?.pk}`)}}>
                                <div style={{ position: 'absolute', display: 'flex',right:'12px',top:'12px',alignItems:'center' }}>
                                    <div style={{marginRight:'6px'}}>{item.nickname}</div>
                                    <img src={nextButtonIcon} style={{width:'15px'}} />
                                </div>
                                <img style={{ position: 'absolute', bottom: '0',width:'90%',left:'5%' }} alt="#" src={backUrl + item.profile_img} />
                            </Card>
                        </>
                    ))}
                </RowContent>

            </Wrappers>
        </>
    )
}
export default MasterList;