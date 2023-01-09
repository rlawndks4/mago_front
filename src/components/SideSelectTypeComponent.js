import { useEffect, useState } from "react";
import styled from "styled-components";
import vArrIcon from '../assets/images/icon/v_arr.png'
import theme from "../styles/theme";
import $ from 'jquery';
const Container = styled.div`
width:300px;
margin-right:16px;
z-index:3;
@media screen and (max-width:700px) {
    display:flex;
    width:90vw;
    border-bottom:1px solid ${props => props.theme.color.font3};
    margin:0;
}
`
const Content = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:12px 8px;
font-size:${props => props.theme.size.font3};
border-bottom:1px solid ${props => props.theme.color.font3};
cursor:pointer;
&:hover{  
    font-weight:bold;
    border-bottom:2px solid ${props => props.theme.color.font1};
}
@media screen and (max-width:700px) {
    border-bottom:none;
}
`
const ArrowImg = styled.img`
height: 7px;
width: 24px;
@media screen and (max-width:700px) {
    display:none;
}
`
const makeGuideHeightByWidth = (schema) => {
    if (schema == 'academy') {
        return {
            1000: 250,
            700: 240,
            550: 240,
            0: 500,
            marginTop: 220,
        }
    } else if (schema == 'master') {
        return {
            1000: 400,
            700: 400,
            550: 300,
            0: 300,
            marginTop: 370,
        }
    }
}
const SideSelectTypeComponent = (props) => {
    const { data, typeNum, guide_height, onClickTypeNum, schema, setTypeNum } = props;
    const [containerStyle, setContainerStyle] = useState({});
    useEffect(() => {
        window.addEventListener('scroll', function (el) {
            for (var i = data.length - 1; i >= 0; i--) {
                let offset = $(`#div-${i}`).offset();
                if(offset.top-160<=$(window).scrollTop()+50 && $(window).scrollTop()>100){
                    setTypeNum(i);
                    break;
                }
            }
            //let offset = $(`#div-${3}`).offset()
            //console.log(offset.top)
            let flag = false;
            if (window.innerWidth >= 1000) {
                if ($(window).scrollTop() >= makeGuideHeightByWidth(schema)[1000]) {
                    flag = true;
                }
            } else if (window.innerWidth >= 700) {
                if ($(window).scrollTop() >= makeGuideHeightByWidth(schema)[700]) {
                    flag = true;
                }
            } else if (window.innerWidth >= 550) {
                if ($(window).scrollTop() >= makeGuideHeightByWidth(schema)[550]) {
                    flag = true;
                }
            } else if (window.innerWidth >= 0) {
                if ($(window).scrollTop() >= makeGuideHeightByWidth(schema)[0]) {
                    flag = true;
                }
            }
            if (flag) {
                if (window.innerWidth >= 700) {
                    setContainerStyle({ marginTop: `${$(window).scrollTop() - makeGuideHeightByWidth(schema)['marginTop']}px` })
                } else {
                    setContainerStyle({ position: 'fixed', top: '5.5rem', background: '#fff', borderBottom: '' })
                }
            } else {
                setContainerStyle({});
            }
        })
    }, [])
    return (
        <>
            <Container style={containerStyle}>
                {data && data.map((item, idx) => (
                    <>
                        <Content onClick={() => { onClickTypeNum(idx) }} style={{ fontWeight: `${typeNum == idx ? 'bold' : ''}`, borderBottom: `${typeNum == idx ? `2px solid ${theme.color.font1}` : ''}` }}>
                            <div>{item?.title}</div>
                            { }
                            <ArrowImg src={vArrIcon} />
                        </Content>
                    </>
                ))}
            </Container>
        </>
    )
}
export default SideSelectTypeComponent;