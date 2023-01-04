import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { backUrl } from "../data/Data";
import { commarNumber } from "../functions/utils";
import theme from "../styles/theme";
import { TextButton, TextFillButton } from "./elements/UserContentTemplete";

const Container = styled.div`
display: flex; 
padding: 32px 0;
width: 100%;
height: 120px;
border-bottom: 1px solid ${theme.color.font4};
@media screen and (max-width:550px) { 
    flex-direction:column;
    height:auto;
}
`
const ContentContainer = styled.div`
display:flex;
width:60%;
cursor:pointer;
border-right: 1px solid ${theme.color.font4};
@media screen and (max-width:550px) { 
    width:100%;
    border-right:none;
    border-bottom: 1px solid ${theme.color.font4};
    padding-bottom:16px;
}
`
const PriceContainer = styled.div`
display: flex;
flex-direction: column;
width:40%;
height:120px;
@media screen and (max-width:550px) { 
    width:60%;
    margin-left:auto;
}
`
const AcademySubCard = (props) => {
    let { item } = props;

    const navigate = useNavigate();

    return (
        <>
            <Container>
                <ContentContainer onClick={()=>{navigate(`/academy/`)}}>
                    <img src={backUrl + item?.sub_img} style={{ height: '120px', width: '90px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '12px', width: 'auto' }}>
                        <div style={{ fontSize: theme.size.font3, margin: '0 auto 16px 12px' }}>{item?.title}</div>
                        <div style={{ fontSize: theme.size.font5, margin: '0 auto 16px 12px' }}>수강기간: {item?.period}</div>
                        <div style={{ fontSize: theme.size.font5, margin: '0 auto auto 12px' }}>강의구성: {item?.composition}</div>
                        <div style={{ fontSize: theme.size.font5, margin: 'auto auto 0 12px' }}>{item?.sub_title}</div>
                    </div>
                </ContentContainer>
                <PriceContainer>
                    <div style={{ height: '17px', margin: '0 auto 16px 12px' }} />
                    <div style={{ fontSize: theme.size.font5, display: 'flex', margin: '0 auto 16px 12px' }}><div style={{width:'48px'}}>정가:</div> <div style={{ textDecoration: 'line-through', textDecorationColor: theme.color.font2 }}>{commarNumber(item?.price)}원</div></div>
                    <div style={{ fontSize: theme.size.font5, display: 'flex', margin: '0 auto auto 12px' }}><div style={{width:'48px'}}>판매가:</div><div style={{color:theme.color.red,margin:'0 2px 0 0'}}>[{item?.discount_percent}% 할인]</div> <div style={{fontWeight:'bold'}}>{commarNumber(item?.price * ((100 - item?.discount_percent) / 100))}원</div> </div>
                    <div style={{ display: "flex" }}>
                        <TextButton style={{ margin: '0 4px 0 12px' }}>장바구니</TextButton>
                        <TextFillButton style={{ margin: '0 auto 0 4px' }}>수강신청</TextFillButton>
                    </div>
                </PriceContainer>
            </Container>
        </>
    )
}
export default AcademySubCard;