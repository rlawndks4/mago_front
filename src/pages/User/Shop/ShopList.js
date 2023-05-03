import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Title, Wrappers, ViewerContainer } from "../../../components/elements/UserContentTemplete";
import { axiosInstance, backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { categoryToNumber, commarNumber, getLocation, getViewerMarginByNumber } from "../../../functions/utils";
import CommentComponent from "../../../components/CommentComponent";
import { Viewer } from '@toast-ui/react-editor';
import Loading from '../../../components/Loading'
import { Icon } from "@iconify/react"
import { motion } from "framer-motion"
import { Font2, Font3, Font4, Font5 } from "../../../components/elements/ManagerTemplete";

const MerchandiseContainer = styled.div`
width: 100%;
display: flex;
flex-wrap:wrap;
column-gap: 60px;
grid-row-gap: 10px;
row-gap: 30px;
margin:2rem auto;
@media (max-width: 1350px) {
  column-gap: 4.2vw;
}
@media (max-width: 650px) {
    
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
@media (max-width: 650px) {
    width:30vw;
    height:18vw;
    border-radius:10px;
    margin:auto auto auto 1rem;
}
`
const MerchandiseExplain = styled.div`
width: 90%;
height: 45%;
margin: auto auto 0 auto;
display:flex;
flex-direction:column;
@media (max-width: 1350px) {
  font-size:${theme.size.font4};
}
@media (max-width: 650px) {
    width:60vw;
    height: 80%;
    margin:auto auto auto 0.5rem;
    padding:2vw;
}
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
                <MerchandiseExplain>
                    <Font3 style={{ margin: '0 auto auto 0' }}>{item?.name}</Font3>

                    <Font4 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <Icon icon='mdi:theme-outline' />
                        <div style={{ marginLeft: '0.5rem' }}>{item?.theme_name}</div>
                    </Font4>
                    <Font4 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <Icon icon='mdi:home-city-outline' />
                        <div style={{ marginLeft: '0.5rem' }}>{item?.city_name}</div>
                    </Font4>
                    <Font4 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                        <Icon icon='material-symbols:location-on-outline' />
                        <div style={{ marginLeft: '0.5rem' }}>{item?.address}</div>
                    </Font4>
                    {item?.distance ?
                        <>
                            <Font5 style={{ display: 'flex', alignItems: 'center', margin: 'auto 0' }}>
                                <Font4>
                                    <Icon icon='material-symbols:distance-outline' />
                                </Font4>
                                <div style={{ marginLeft: '0.5rem' }}>{commarNumber(item?.distance)} KM</div>
                            </Font5>
                        </>
                        :
                        <>
                        </>}
                    <Font4 style={{ height: '10%', display: 'flex', alignItems: 'center', margin: 'auto 0 0.5rem auto' }}>
                        <img src={backUrl + item?.country_img} style={{ height: '100%' }} />
                        <div style={{ marginLeft: '0.5rem' }}>{item?.country_name}</div>
                    </Font4>
                </MerchandiseExplain>
                <MerchandiseImg src={backUrl + item?.img_src} />
            </motion.div>
        </>
    )
}
const ShopList = () => {

    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState([])

    useEffect(() => {
        getShops();
    }, [location])

    const getShops = async () => {
        setLoading(true);
        let obj = {

        }
        let add_obj = {};
        let query = location.search;
        query = query.split('?')[1];
        query = query.split('&');
        for (var i = 0; i < query.length; i++) {
            add_obj[query[i].split('=')[0]] = query[i].split('=')[1];
        }
        obj = Object.assign(obj, add_obj);
        const { data: response } = await axios.post('/api/shops', obj)
        let shops = response?.data;
        if (obj?.is_around) {
            let locate = await getLocation();
            console.log(locate)
            for (var i = 0; i < shops.length; i++) {
                let x = (Math.cos(locate?.latitude) * 6400 * 2 * 3.14 / 360) * Math.abs(locate?.longitude - shops[i].lng)
                let y = 111 * Math.abs(locate?.latitude - shops[i].lat)
                let d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                shops[i]['distance'] = d
            }
            shops = shops.sort(function (a, b) {
                return a.distance - b.distance;
            });
        }
        console.log(shops)
        setShops(shops)
        setLoading(false);
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