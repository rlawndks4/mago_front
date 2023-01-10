
import { useEffect, useState } from "react"
import { Wrappers, Card, Img, SelectType, ViewerContainer, Content, TextButton, TextFillButton } from "../../../components/elements/UserContentTemplete"
import styled from "styled-components"
import theme from "../../../styles/theme"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import ThemeCard from "../../../components/ThemeCard"
import { commarNumber, getIframeLinkByLink } from "../../../functions/utils"
import { backUrl, frontUrl } from "../../../data/Data"
import masterCardIcon from '../../../assets/images/test/master-card.svg';
import { Viewer } from '@toast-ui/react-editor';
import Loading from "../../../components/Loading"
import AcademySubCard from "../../../components/AcademySubCard"
import SelectTypeComponent from "../../../components/SelectTypeComponent"
import ReactQuill, { Quill } from "react-quill"
import ImageResize from "quill-image-resize-module-react"
import "react-quill/dist/quill.snow.css"
import quillEmoji from "react-quill-emoji"
import "react-quill-emoji/dist/quill-emoji.css"
import useScript from "../../../functions/useScript"
import $ from 'jquery'
import { Suspense } from "react"
import { useRef } from "react"

const AuthPay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [itemPk, setItemPk] = useState(0);
    const [item, setItem] = useState({});
    const [auth, setAuth] = useState({});
    const itemRef = useRef([]);
    useEffect(() => {
        function checkRef() {
            for (var i = 0; i < itemRef.current.length; i++) {
                if (!itemRef.current[i].value) {
                    return false;
                }
            }
            return true;
        }
        if (checkRef()) {
            if(window.innerWidth>=1000){
                $(document.body).append("<script>AllatPay_Approval(document.getElementById('sendFm')); AllatPay_Closechk_Start();</script>");
            }else{
                $(document.body).append("<script>Allat_Mobile_Approval(document.getElementById('sendFm'), 0, 0);</script>");
            }
        }
    }, [itemRef.current.map((itm) => { return itm.value })])
    useEffect(() => {
        authSetting();
        window.onmessage = function (e) {
            if (e.origin === backUrl) {
                console.log(e);
            }
        }

    }, []);

    async function isAuth() {
        const { data: response } = await axios.get(`/api/getmyinfo`);
        if (response?.data?.pk > 0) {
            setAuth(response?.data)
        } else {
            alert("회원전용 메뉴입니다.");
            navigate('/login');
        }
    }
    const authSetting = async () => {
        if (!location?.state) {
            alert("잘못된 접근 입니다.");
            navigate(-1);
        } else {
        }
        await isAuth();
        await getItem();
        //await Allat_Mobile_Approval($('#sendFm')[0], 0, 0);
    }
    const getItem = async () => {
        const { data: response } = await axios.get(`/api/item?table=academy_category&pk=${location?.state?.item_pk}`);
        setItem(response?.data);
        if ($('.allat_product_nm').val() && $('.allat_amt').val() && $('.allat_buyer_nm').val()) {

        }
    }

    return (
        <>
            <Wrappers>
                <form method='post' id="sendFm" accept-charset="utf-8" style={{ display: 'none' }}>
                    {/* <object type="image/svg+xml" data="../images/icon/logo-icon.svg" id="logo-img">
                            </object> */}
                    {/* <div className='auth-font tm-clr intro-small-text'>환영합니다!</div>
                            <div className='auth-font tm-clr intro-small-text'>입금 정보를 입력해주세요.</div> */}
                    <input type='hidden' name='mkey' value='26345016f7802e8de59e5e7328a184c7' />
                    <input type='hidden' name='allat_pmember_id' value='TMN054815' />
                    <input type='hidden' name='allat_shop_id' value='anipg5' />
                    <input type='hidden' name='allat_order_no' value={`${params?.pk ?? 0}${(new Date()).getTime()}${auth?.pk ?? 0}`} />
                    <input type='hidden' name='allat_recp_nm' value={auth?.name} />
                    <input type='hidden' name='allat_recp_addr' value={auth?.address + ' ' + auth?.address_detail} />
                    <input type='hidden' name='allat_product_cd' value='TMN054815' />
                    <input type='hidden' name='allat_enc_data' value='' />
                    <input type='hidden' name='shop_receive_url' value={`${frontUrl + `/api/keyrecieve/${params?.pk}`}`} />
                    <input type='hidden' name='allat_autoscreen_yn' value='y' />
                    <input type='text' className="title" name='allat_product_nm' value={item?.title} ref={e => (itemRef.current[0] = e)} />
                    <input type='number' className="price" name='allat_amt' value={((item?.price ?? 0) * (100 - item?.discount_percent ?? 0) / 100)} ref={e => (itemRef.current[1] = e)} />
                    <input type='text' className="buyer" name='allat_buyer_nm' placeholder='구매자명 입력' value={auth?.name} ref={e => (itemRef.current[2] = e)} />
                </form>
            </Wrappers>
        </>

    )
}

export default AuthPay;