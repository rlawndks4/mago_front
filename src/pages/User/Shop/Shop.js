import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Wrappers, ViewerContainer, SelectType } from "../../../components/elements/UserContentTemplete";
import { axiosInstance, backUrl } from "../../../data/Data";
import theme from "../../../styles/theme";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import $ from 'jquery'
import styled from "styled-components";
import { commarNumber, getLocation } from "../../../functions/utils";
import { Viewer } from '@toast-ui/react-editor';
import Loading from '../../../components/Loading'
import { makeQueryObj } from "../../../functions/utils";
import { Card, CardContent, Grid } from "@mui/material";
import { Icon } from "@iconify/react";

const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
position:relative;
`
const MenuHeader = styled.div`
border-bottom: 1px solid #000;
background:${theme.color.font5};
padding:0.5rem;
font-size:${theme.size.font3};
text-align:center;
`
const MenuContent = styled.div`
display:flex;
justify-content:space-between;
padding:0.5rem;
border-bottom: 1px solid #000;
font-size:${theme.size.font4};
`
const Title = styled.div`
margin:0 0 0.5rem 0;

`
const Shop = () => {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [myAddress, setMyAddress] = useState("");
    const [typeNum, setTypeNum] = useState(0);
    const [shop, setShop] = useState({});

    useEffect(() => {
        getShops();
    }, [])

    const getShops = async () => {
        let locate = await getLocation();
        const { data: res_locate } = await axios.post('/api/getaddressbylocation', locate);
        setMyAddress(res_locate?.data);
        setLoading(true);
        let obj = {};
        let search = location?.search;
        obj = makeQueryObj(search);
        const { data: response } = await axios.post('/api/shop', obj)
        setData(response?.data);
        setLoading(false);
    }
    const changeType = (num) => {
        setTypeNum(num)
    }
    return (
        <>
            <Wrappers className="post-container">

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                            <Icon icon='material-symbols:location-on' style={{ color: theme.color.red, margin: 'auto 0.5rem auto auto' }} />
                            <div style={{ margin: 'auto auto auto 0.5rem' }}>내위치: {myAddress}</div>
                        </CardContent>
                    </Card>
                </Grid>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <SelectType style={{ width: '100%', maxWidth: '1150px', margin: '1rem auto' }}>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 0 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 0 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(0) }}>업체소개</Type>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 1 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 1 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(1) }}>이벤트</Type>
                            <Type style={{ borderBottom: `4px solid ${typeNum == 2 ? theme.color.background1 : '#fff'}`, color: `${typeNum == 2 ? theme.color.background1 : '#ccc'}` }} onClick={() => { changeType(2) }}>후기({commarNumber(data?.review?.length)})</Type>
                        </SelectType>
                        {typeNum == 0 ?
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Card>
                                            <CardContent>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Card>
                                            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Title>코스소개</Title>
                                                {data?.shop?.price_list && data?.shop?.price_list.map((item, idx) => {
                                                    if (!item?.price && !item?.sale_price) {
                                                        return <MenuHeader>{item?.course}</MenuHeader>
                                                    } else {
                                                        return <MenuContent>
                                                            <div>{item?.course}</div>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{
                                                                    textDecoration: `${item?.sale_price && (item?.sale_price != item?.price) ? 'line-through' : ''}`,
                                                                    textDecorationColor: theme.color.red,
                                                                    color: `${item?.sale_price && (item?.sale_price != item?.price) ? theme.color.red : ''}`,
                                                                }}>{commarNumber(item?.price)}</div>
                                                                <div style={{ marginLeft: '0.5rem' }}>{item?.sale_price && (item?.sale_price != item?.price) ? commarNumber(item?.sale_price) : ''}</div>
                                                                <div>원</div>
                                                            </div>
                                                        </MenuContent>
                                                    }
                                                })}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </>
                            :
                            <>
                            </>}
                        {typeNum == 1 ?
                            <>
                            </>
                            :
                            <>
                            </>}
                        {typeNum == 2 ?
                            <>
                            </>
                            :
                            <>
                            </>}
                    </>
                }
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Shop;