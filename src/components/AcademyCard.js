import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { backUrl } from "../data/Data";
import { commarNumber } from "../functions/utils";
import theme from "../styles/theme";
import instArrIcon from '../assets/images/icon/inst_arr.png'
const AcademyContainer = styled.div`
box-shadow: ${props => props.theme.boxShadow};
border-radius: ${props => props.theme.borderRadius};
width: 24%;
height:300px;
cursor:pointer;
@media screen and (max-width:1000px) { 
    width: 48%;
    height:57.6vw;
}
@media screen and (max-width:550px) { 
    width: 100%;
    height:120vw;
}
`
const AcademyImg = styled.img`
width: 100%;
height:150px;
border-top-right-radius:${props => props.theme.borderRadius};
border-top-left-radius:${props => props.theme.borderRadius};
border-bottom-right-radius:0;
border-bottom-left-radius:0;
@media screen and (max-width:1000px) { 
    height:28.8vw;
}
@media screen and (max-width:550px) { 
    height:60vw;
}
`
const AcademyTextContainer = styled.div`
padding:0px 16px;
display:flex;
flex-direction:column;
align-items:flex-start;
height:45%;
@media screen and (max-width:800px) { 
    height:42%;
}
@media screen and (max-width:550px) { 
    padding:3vw 4vw;
}
`
const AcademyCard = (props) => {
    let { item, idx, link, inst_arr } = props;
    const navigate = useNavigate();
    const getMarginByIndex = (idx) => {
        let margin = "";
        if (window.innerWidth >= 1000) {
            if (idx % 4 == 0) {
                margin = "0 0.66% 16px 0";
            } else if (idx % 4 == 3) {
                margin = "0 0 16px 0.66%";
            } else {
                margin = "0 0.66% 16px 0.66%";
            }
        } else if (window.innerWidth >= 550) {
            if (idx % 2 == 0) {
                margin = "0 2% 16px 0";
            } else {
                margin = "0 0 16px 2%";
            }
        } else {
            margin = "0 0 16px 0";
        }
        return margin;
    }
    return (
        <>
            <AcademyContainer style={{ margin: getMarginByIndex(idx) }} onClick={() => { navigate(link ? link : `/academy/${item?.pk}`) }}>
                <AcademyImg src={backUrl + item?.main_img} />
                <AcademyTextContainer>
                    <div style={{ margin: '0 0 auto 0', color: theme.color.blue, fontSize: theme.size.font4, fontWeight: 'bold' }}>{item.user_nickname}</div>
                    <div style={{ margin: '4px 0 auto 0', color: theme.color.font1, fontSize: theme.size.font4 }}>{item.title}</div>
                    <div style={{ margin: 'auto 0 auto 0', color: theme.color.font1, fontSize: theme.size.font5, fontWeight: 'bold' }}>{item.sub_title}</div>
                    <div style={{ margin: 'auto 0 auto 0', color: theme.color.font4, fontSize: theme.size.font5 }}>{item.hash}</div>
                    {/* <div style={{ margin: 'auto 0 0 0', color: theme.color.blue, fontSize: theme.size.font5, fontWeight: 'bold' }}>{commarNumber(item.price * ((100 - item?.discount_percent ?? 0) / 100))}원 (VAT 별도)</div> */}
                    {inst_arr?
                    <>
                    <img src={instArrIcon}  style={{margin: 'auto 4px 0 auto',width:'28px',height:'auto'}} />
                    </>
                    :
                    <>
                    </>}
                </AcademyTextContainer>
            </AcademyContainer>
        </>
    )
}
export default AcademyCard;