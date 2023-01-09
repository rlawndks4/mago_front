
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
import {
    Allat_Mobile_Approval,
    Allat_Mobile_ApprovalNewPlus,
    Allat_Mobile_Close,
    Allat_Mobile_Cancel,
    Allat_Mobile_Fix,
    Allat_Mobile_Hp_Fix
} from '../../../js/AllatPayM.js'

const AuthPay = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [itemPk, setItemPk] = useState(0);
    useEffect(() => {
        if(!location?.state){
            alert("잘못된 접근 입니다.");
            navigate(-1);
        }else{
            setItemPk(location?.state?.item_pk)
        }
        isAuth();
        onPay();
    }, []);
    async function isAuth() {
        setLoading(true);
        const { data: response } = await axios.get(`/api/auth`);
        console.log(response)
        if (response?.pk > 0) {
        } else {
            alert("회원전용 메뉴입니다.");
            navigate('/login')
        }
        setLoading(false);
    }
    const onPay = async () => {

    }
    return (
        <>
            <Wrappers>
                {loading ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <form className="login-form" method='post' id="sendFm" accept-charset="EUC-KR">
                            <object type="image/svg+xml" data="../images/icon/logo-icon.svg" id="logo-img">
                            </object>
                            <div className='auth-font tm-clr intro-small-text'>환영합니다!</div>
                            <div className='auth-font tm-clr intro-small-text'>입금 정보를 입력해주세요.</div>
                            <input type='hidden' name='mkey' value='$m_key' />
                            <input type='hidden' name='allat_pmember_id' value='TMN054815' />
                            <input type='hidden' name='allat_shop_id' value='anipg5' />
                            <input type='hidden' name='allat_order_no' value={itemPk} />
                            <input type='hidden' name='allat_recp_nm' value='test' />
                            <input type='hidden' name='allat_recp_addr' value='test' />
                            <input type='hidden' name='allat_product_cd' value='TMN054815' />
                            <input type='hidden' name='allat_enc_data' />
                            <input type='hidden' name='shop_receive_url' value={`${frontUrl+'/keyrecieve'}`} />
                            <input type='hidden' name='allat_autoscreen_yn' value='y' />
                            <table className="table tc ofax" >
                                <tbody>
                                    <tr>
                                        <th className='tm-clr'>
                                            <span>상품선택</span>
                                        </th>
                                        <td id='item-nm-wrap'>
                                            <input type='text' name='allat_product_nm' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='tm-clr'>
                                            <span>상품가격</span>
                                        </th>
                                        <td>
                                            <input type='number' name='allat_amt' placeholder='금액입력' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='tm-clr'>
                                            <span>구매자명</span>
                                        </th>
                                        <td>
                                            <input type='text' name='allat_buyer_nm' placeholder='구매자명 입력' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div onClick={() => Allat_Mobile_Approval($('#sendFm')[0], 0, 0)}>결제</div>
                        </form>
                        <div id="ALLAT_MOBILE_PAY" >
                            <iframe id="ALLAT_MOBILE_FRAME" name="ALLAT_MOBILE_FRAME" src="https://tx.allatpay.com/common/iframe_blank.jsp" frameborder="0" width="100%px" height="100%px" scrolling="no" />
                        </div>
                    </>}
            </Wrappers>
        </>
    )
}
export default AuthPay;