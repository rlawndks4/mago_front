import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { makeQueryObj } from "../../../functions/utils";
import { Card, CardContent, Grid } from "@mui/material";
import { Icon } from "@iconify/react";

const Shop = () => {
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        getShops();
    }, [])

    const getShops = async () => {
        let obj = {};
        let search = location?.search;
        obj = makeQueryObj(search);
        const { data: response } = await axios.post('/api/shop', obj)
        setData(response?.data);
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Card>
                                    <CardContent style={{ textAlign: 'center' }}>
                                        <Icon icon='' />
                                        <div>{ }</div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Card>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Card>
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>


                    </>
                }
                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Shop;