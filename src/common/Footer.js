import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import kakao from '../assets/images/icon/kakao.png'
import theme from "../styles/theme";
import { onClickWindowOpen } from "../functions/utils";
import { logoSrc } from "../data/Data";

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
@media screen and (max-width:650px) {
    margin: 0 0 0 auto;
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
width:24vw;
}
`
const Flex = styled.div`
display:flex;
margin-top:8px;
flex-direction:column;
@media screen and (max-width:650px) {
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
                    <Wrappers className="footer" style={{ background: `#23242f`, fontSize: theme.size.font5 }}>
                        <div style={{ marginTop: '8px' }}>마사지GO</div>
                        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Flex style={{ margin: '0 auto 0 0'}}>
                                <div>주소&nbsp;&nbsp;경기도 오산시 법원로 15번길 9, 408호</div>
                                <div>사업자등록번호&nbsp;&nbsp;235-29-01265</div>
                                <div style={{marginTop:'1rem',maxWidth:'700px'}}>
                                마사지GO는 정보제공자로서 제휴회원의 컨텐츠 및 이와 관련된 거래에 대하여 어떠한 책임도 지지 않습니다.
                                본 사이트의 컨텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.
                                </div>
                            </Flex>
                        </Flex>
                    </Wrappers>
                </>
            }

        </>
    )
}
export default Footer;