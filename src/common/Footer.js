import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/images/test/f_logo.png';
import kakao from '../assets/images/icon/kakao.png'
import theme from "../styles/theme";
import { onClickWindowOpen } from "../functions/utils";
import kakaoFotterIcon from '../assets/images/test/kakao-footer.png'

const Button = styled.div`

background:${props => props.theme.color.background1};
padding:7px 8px 5px 8px;
color:#000;
border-radius:50%;
font-size:16px;
cursor:pointer;
animation: fadein 0.5s;
z-index:3;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

`
const KakaoImg = styled.img`
width: 100px;
cursor: pointer;
margin-right:8px;
animation: fadein 0.5s;
z-index:3;
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
`
const Wrappers = styled.footer`
    display:flex;
    flex-direction:column;
    background:${props => props.theme.color.background3};
    color:#fff;
    font-weight:500;
    padding:32px 120px;
    font-size:${props => props.theme.size.font3};
    @media screen and (max-width:1050px) {
        margin-bottom:80px;
    }
    @media screen and (max-width:650px) {
        padding:32px 5vw;
        font-size:${props => props.theme.size.font4};

    }
`
const Post = styled.div`
cursor:pointer;
border-right:1px solid ${props => props.theme.color.font1};
padding:4px;
transition: 0.3s;
&:hover{  
    color : ${props => props.theme.color.background1};
  }
  @media screen and (max-width:400px) {
    font-size:${props => props.theme.size.font5};
    padding:2px;
}
`
const Img = styled.img`
width: 120px;
@media screen and (max-width:400px) {
width:14vw;
}
`
const Flex = styled.div`
display:flex;
margin-top:8px;
@media screen and (max-width:650px) {
flex-direction:column;
}
`
const Footer = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            {pathname.includes('/manager') || pathname.substring(0, 6) == '/post/' || pathname.substring(0, 7) == '/video/' ?
                <>
                </>
                :
                <>
                    <div style={{ width: '100%', background: `#191828` }}>
                        <div style={{ display: 'flex', padding: '16px 0', fontSize: theme.size.font4, background: `#191828`, cursor: 'pointer', color: '#FFF', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
                            <div style={{ width: '25%', textAlign: 'center' }} onClick={() => onClickWindowOpen('http://first-partners.co.kr')}>회사소개</div>
                            <div style={{ width: '25%', textAlign: 'center' }} onClick={() => navigate('/policy/0')}>이용약관</div>
                            <div style={{ width: '25%', textAlign: 'center' }} onClick={() => navigate('/policy/1')}>개인정보처리방침</div>
                            <div style={{ width: '25%', textAlign: 'center' }} onClick={() => navigate('/policy/2')}>저작권정책</div>
                        </div>
                    </div>
                    <Wrappers className="footer" style={{ background: `#23242f`, fontSize: theme.size.font5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '800px' }}>
                            <Img src={logo} alt="footer" />
                            
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Post onClick={() => navigate('/policy/0')}>이용약관</Post>
                            <Post onClick={() => navigate('/policy/1')}>개인정보처리방침</Post>
                            <Post style={{ borderRight: 'none' }} onClick={() => navigate('/policy/2')}>저작권정책</Post>
                        </div> */}
                        <div style={{ marginTop: '8px' }}>서울시 마포구 양화로 127 7층(첨단빌딩)</div>
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Flex>

                                <div style={{ marginRight: '16px' }}>Email&nbsp;&nbsp;First_partner@naver.com</div>
                                <div>FAX&nbsp;&nbsp;02-332-3593</div>
                            </Flex>
                             <div style={{display:'flex',alignItems:'center'}}>
                             <KakaoImg src={kakaoFotterIcon} style={{ display: `flex` }} onClick={() => window.open('http://pf.kakao.com/_xgKMUb/chat')} />
                                <div></div>
                            </div> 
                        </Flex>
                    </Wrappers>
                </>
            }

        </>
    )
}
export default Footer;