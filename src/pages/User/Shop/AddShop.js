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

const AddShop = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <Wrappers className="post-container">
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>


                    </>
                }

                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default AddShop;