import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import theme from '../styles/theme';
import styled from 'styled-components';

const SelectSubType = styled.div`
overflow-x: auto;
padding:8px;
width:984px;
display: -webkit-box;
display: -ms-flexbox;
background:#FAFAFA;
flex-wrap:wrap;
border-radius:${props => props.theme.borderRadius};
box-shadow:${props => props.theme.boxShadow};
margin:8px auto;
@media screen and (max-width:1000px) {
    width: 87.5vw;
    padding: 1.25vw;
}
@media screen and (max-width:500px) {
    padding: 0 1.25vw;
}
`
const SubType = styled.div`
padding:8px 0;
cursor:pointer;
text-align:center;
font-size:${props => props.theme.size.font3};
width:20%;
@media screen and (max-width:500px) {
    font-size:${props => props.theme.size.font5};
}
@media screen and (max-width:320px) {
    font-size:${props => props.theme.size.font6};
}
`
const SelectTypeComponent = (props) => {
    const { posts, num, selectTypeNum, is_list, is_space_between } = props;
    const getBorderBottomByLength = (length, idx)=>{
        for(var i=5;i>=0;i--){
            if(length>i*5){
                break;
            }
        }
        if((i*5)>=(idx+1)){
            return `1px solid ${theme.color.font3}`;
        }else{
            return "";
        }
    }
    const getFontWeight = (is_list, idx) =>{
        if(is_list){
            if(num.includes(idx)){
                console.log(1)
                return "bold";
            }else{
                return "";
            }
        }else{
            if(num==idx){
                return "bold";
            }else{
                return "";
            }
        }
    }
    const getFontColor = (is_list, idx) =>{
        if(is_list){
            if(num.includes(idx)){
                return theme.color.font1;
            }else{
                return theme.color.font3;
            }
        }else{
            if(num==idx){
                return theme.color.font1;
            }else{
                return theme.color.font3;
            }
        }
    }
    useEffect(()=>{
    },[])
    return (
        <>
            <SelectSubType className='subtype-container' style={{justifyContent:`${is_space_between?'space-between':''}`,display:`${is_space_between?'flex':''}`}}>
                {posts.map((item, index) => (
                    <>
                        <SubType style={{ color:getFontColor(is_list, index), fontWeight: getFontWeight(is_list, index),borderBottom:getBorderBottomByLength(posts.length, index),width:`${is_space_between?'30%':''}`}} onClick={() => { selectTypeNum(index) }}>
                            {item.title}
                        </SubType>
                    </>
                ))} 
            </SelectSubType>
        </>
    )
}
export default SelectTypeComponent;