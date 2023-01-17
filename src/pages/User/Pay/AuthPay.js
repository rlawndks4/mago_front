
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

const isPC = window.innerWidth >= 1000 ? true : false;
const AuthPay = (props) => {
    const {itemPk} = props;
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
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
            $(document.body).append("<script>" + (isPC ? "AllatPay_Approval(document.getElementById('sendFm')); AllatPay_Closechk_Start();" : "Allat_Mobile_Approval(document.getElementById('sendFm'), 0, 0);") + "</script>");
            $(document.body).append(`
            <script>
            function result_submit(result_cd, result_msg, enc_data)
            {
            ` + (isPC ? 'AllatPay_Closechk_End();' : 'Allat_Mobile_Close();') + `
                if( result_cd != '0000') 
                {
                    result_msg.CharsSet = "euc-kr";
                    window.setTimeout(async function() {
                        await alert(result_cd + " : " + result_msg);
                        window.setTimeout(function() { window.location.href = '/payresult/${itemPk}/0';}, 500);
                    }, 500);
                }
                else
                {
                    window.setTimeout(function() { window.location.href = '/payresult/${itemPk}/1';}, 500);
                }
            }
            </script>
            `);
        } else {
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
            if (response?.data?.user_level > 0) {
                if (response?.data?.user_level == 50) {
                    alert('개발자는 이용할 수 없습니다.');
                    navigate('/mypage');
                }
                if (response?.data?.user_level == 40) {
                    alert('관리자는 이용할 수 없습니다.');
                    navigate('/mypage');
                }
                if (response?.data?.user_level == 30) {
                    alert('전문가는 이용할 수 없습니다.');
                    navigate('/mypage');
                }
            } else {
                if (!response?.data?.address) {
                    alert('주소가 등록되어 있지 않습니다.');
                    navigate('/mypage');
                }
                if (!response?.data?.address_detail) {
                    alert('상세주소가 등록되어 있지 않습니다.');
                    navigate('/mypage');
                }
                setAuth(response?.data);
            }
        } else {
            alert("회원전용 메뉴입니다.");
            navigate('/login');
        }
    }
    const authSetting = async () => {
        await isAuth();
        await getItem();
        //await Allat_Mobile_Approval($('#sendFm')[0], 0, 0);
    }
    const getItem = async () => {
        const { data: response } = await axios.post(`/api/checkitemstatus`, {
            pk: params?.pk
        });
        if (response?.result < 0) {
            alert(response?.message);
            navigate(-1);
        } else {
            setItem(response?.data);
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
                    <input type='hidden' name='shop_receive_url' value={`${frontUrl + `/api/keyrecieve/${params?.pk}/${window.innerWidth >= 1000 ? 'pc' : 'mobile'}`}`} />
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