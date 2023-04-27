import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title, Wrappers, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import { axiosInstance, backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { categoryToNumber, commarNumber, getViewerMarginByNumber } from "../../../functions/utils";
import CommentComponent from "../../../components/CommentComponent";
import { Viewer } from '@toast-ui/react-editor';
import Loading from '../../../components/Loading'
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"


const BannerContainerPc = styled.div`
max-width:1200px;
margin:0 auto 1rem auto;
width:100%;
display:block;
border-radius:10px;
@media (max-width: 1350px) {
  display:none;
}
`
const BannerContainerMobile = styled.div`
max-width:1200px;
margin:0 auto 1rem auto;
width:100%;
display:none;
@media (max-width: 1350px) {
  display:block;
}
`
const MerchandiseContainer = styled.div`
width: 100%;
display: flex;
flex-wrap:wrap;
column-gap: 60px;
grid-row-gap: 10px;
row-gap: 30px;
margin:4rem auto;
@media (max-width: 1350px) {
  column-gap: 4.2vw;
}
@media (max-width: 850px) {
}
@media (max-width: 550px) {
  column-gap: 4.2vw;
}
`

const MerchandiseImg = styled.img`
width: 100%;
height: 50%;
margin:0 auto;
border-bottom-right-radius:10px;
border-bottom-left-radius:10px;
`
const MerchandiseExplain = styled.div`
width: 90%;
height: 45%;
margin: auto auto 0 auto;
@media (max-width: 1350px) {
  font-size:${theme.size.font4};
}
`
const MerchandiseName = styled.div`
font-size:${theme.size.font4};
width: 80%;
margin:0.5rem auto 0 auto;
`
const NewIcon = styled.img`
position: absolute;
top: -0.25rem;
left: 0.25rem;
`
const Merchandise = (props) => {

    const { item } = props;

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.01, boxShadow: `4px 12px 30px 6px rgba(0, 0, 0, 0.19)`, transform: `translateY(-0.5rem)` }}
                onHoverStart={e => { }}
                onHoverEnd={e => { }}
                style={{
                    background: '#fff'
                }}
                className='merchandise-content'
            >
                <MerchandiseExplain>{item?.name}</MerchandiseExplain>
                <MerchandiseImg src={backUrl + item?.img_src} />
            </motion.div>
        </>
    )
}
const ShopList = () => {
    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState([])

    useEffect(() => {
        getShops();
    }, [])

    const getShops = async () => {
        const { data: response } = await axios.post('/api/items', {
            table: 'shop'
        })
        console.log(response)
        setShops(response?.data)
    }

    return (
        <>
            <Wrappers className="post-container">
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <MerchandiseContainer>
                            {shops && shops.map((item, idx) => (
                                <>
                                    <Merchandise
                                        item={item}
                                    />
                                </>
                            ))}
                        </MerchandiseContainer>
                    </>
                }
            </Wrappers>
        </>
    )
}
export default ShopList;