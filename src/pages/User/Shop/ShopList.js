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
import { Font2, Font3, Font4, Font5, Row } from "../../../components/elements/ManagerTemplete";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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
const OptionContainer = styled.div`
box-shadow: 4px 12px 30px 6px rgba(0, 0, 0, 0.09);
padding:1rem;
display:flex;
flex-direction:column;
`
export const Merchandise = (props) => {

    const { item, navigate } = props;

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
                onClick={() => { navigate(`/shop?name=${item?.name}`) }}
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
                        {item?.country_list && item?.country_list.map((item, idx) => (
                            <>
                                <img src={backUrl + item?.img_src} style={{ height: '100%', marginLeft: '0.5rem' }} />

                            </>
                        ))}
                    </Font4>
                </MerchandiseExplain>
                <MerchandiseImg src={backUrl + item?.img_src} />
            </motion.div>
        </>
    )
}
const getObjByQuery = (query) => {
    let obj = {};
    query = query.split('?')[1];
    if(!query){
        return {};
    }
    query = query.split('&');
    for (var i = 0; i < query.length; i++) {
        obj[query[i].split('=')[0]] = query[i].split('=')[1];
    }
    return obj;
}
const getQueryByObj = (obj) => {
    let keys = Object.keys(obj);
    let query = ""
    for (var i = 0; i < keys.length; i++) {
        if (i == 0) {
            query += '?'
        } else {
            query += '&'
        }
        query += `${keys[i]}=${obj[keys[i]]}`
    }
    return query;
}
const ShopList = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [shops, setShops] = useState([])
    const [themeList, setThemeList] = useState([]);
    const [theme, setTheme] = useState(0)
    const [cityList, setCityList] = useState([]);
    const [city, setCity] = useState(0);
    const [subCityList, setSubCityList] = useState([]);
    const [subCity, setSubCity] = useState(0);
    useEffect(() => {
        setLoading(true);
        getThemeList();
        getCityList();
    }, []);
    useEffect(() => {
        getShops();
    }, [location])
    const getThemeList = async () => {
        const { data: response } = await axios.get(`/api/items?table=shop_theme&order=sort`);
        setThemeList(response?.data);
    }
    const getCityList = async () => {
        const { data: response } = await axios.get(`/api/items?table=city&order=sort`);
        setCityList(response?.data);
    }
    const getSubCityList = async (city_pk) => {
        const { data: response } = await axios.get(`/api/items?table=sub_city&order=sort&city_pk=${city_pk}`);
        setSubCityList(response?.data);
    }
    useEffect(() => {
        let obj = getObjByQuery(location.search);
        if (city == 0 || !city) {
            delete obj['city'];
            delete obj['sub_city'];
            setSubCity(0);
            setSubCityList([])
        } else {
            obj['city'] = city;
            getSubCityList(city)
        }
        let query = getQueryByObj(obj);
        navigate(`/shop-list${query}`)

    }, [city])
    useEffect(() => {
        let obj = getObjByQuery(location.search);
        if (theme == 0 || !theme) {
            delete obj['theme'];
        } else {
            obj['theme'] = theme;
        }
        let query = getQueryByObj(obj);
        navigate(`/shop-list${query}`)

    }, [theme])
    useEffect(() => {
        let obj = getObjByQuery(location.search);
        if (subCity == 0 || !subCity) {
            delete obj['sub_city'];
        } else {
            obj['sub_city'] = subCity;
        }
        let query = getQueryByObj(obj);
        navigate(`/shop-list${query}`)
    }, [subCity])
    const getShops = async () => {
        setLoading(true);
        let obj = {}
        let add_obj = {};
        let query = location.search ?? "?";
        query = query.split('?')[1];
        if(query){
            query = query.split('&');
            for (var i = 0; i < query.length; i++) {
                add_obj[query[i].split('=')[0]] = query[i].split('=')[1];
            }
        }
        obj = Object.assign(obj, add_obj);
        if (obj?.city > 0) {
            setCity(obj?.city);
        }
        if (obj?.theme > 0) {
            setTheme(obj?.theme);
        }
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
                        <OptionContainer>
                            <FormControl>
                                <InputLabel>테마선택</InputLabel>
                                <Select
                                    label='테마선택'
                                    value={theme}
                                    onChange={e => setTheme(e.target.value)}
                                >
                                    <MenuItem value={0}>전체</MenuItem>
                                    {themeList.map((item, idx) => {
                                        return <MenuItem value={item.pk}>{item.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <div style={{ display: 'flex', width: '100%', marginTop: '1rem', justifyContent: 'space-between' }}>
                                <FormControl sx={{ width: '48%', maxWidth: '600px' }}>
                                    <InputLabel>도시선택</InputLabel>
                                    <Select
                                        label='도시선택'
                                        value={city}
                                        onChange={e => {
                                            setCity(e.target.value)
                                        }}
                                    >
                                        <MenuItem value={0}>전체</MenuItem>
                                        {cityList.map((item, idx) => {
                                            return <MenuItem value={item.pk}>{item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ width: '48%', maxWidth: '600px' }}>
                                    <InputLabel>구선택</InputLabel>
                                    <Select
                                        label='구선택'
                                        value={subCity}
                                        onChange={e => setSubCity(e.target.value)}
                                    >
                                        <MenuItem value={0}>전체</MenuItem>
                                        {subCityList.map((item, idx) => {
                                            return <MenuItem value={item.pk}>{item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>

                        </OptionContainer>
                        <MerchandiseContainer>
                            {shops && shops.map((item, idx) => (
                                <>
                                    <Merchandise
                                        navigate={navigate}
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