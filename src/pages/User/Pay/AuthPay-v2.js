
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
const AuthPayV2 = (props) => {
    const { itemPk } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({});
    const [auth, setAuth] = useState({});
    const itemRef = useRef([]);
    useEffect(() => {
        function checkRef() {
            console.log(itemRef)
            if (itemRef.current.length > 0) {
                for (var i = 0; i < itemRef.current.length; i++) {
                    if (!itemRef.current[i]?.value) {
                        return false;
                    }
                }
                return true;

            } else {
                return false;
            }

        }
        if (checkRef()) {

            $(document.body).append(`
            <script>
                function fnSubmit() {
                    var fileName;
                    pf = $('form[name=frmConfirm]')[0];
                    var UserAgent = navigator.userAgent;     
                    if (UserAgent.match(/iPhone|iPod|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
                    fileName = "https://ssl.kiwoompay.co.kr/m/card/DaouCardMng.jsp";
                    KIWOOMPAY = window.open("", "KIWOOMPAY", "fullscreen");
                    KIWOOMPAY.focus();
                    pf.target = "KIWOOMPAY";
                    }else{
                    fileName = "https://ssl.kiwoompay.co.kr/card/DaouCardMng.jsp";
                    KIWOOMPAY = window.open("", "KIWOOMPAY", "width=579,height=527");
                    KIWOOMPAY.focus();
                    pf.target = "KIWOOMPAY";
                    }
                    pf.action = fileName;
                    pf.method = "post";
                    pf.submit();
                }
                fnSubmit();
            </script>
        `);
        } else {
        }

    }, [itemRef.current.map((itm) => { return itm.value })])
    useEffect(() => {
        authSetting();
        // window.onmessage = function (e) {
        //     if (e.origin === backUrl) {
        //         console.log(e);
        //     }
        // }

    }, [props]);

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
            pk: itemPk
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
            <Wrappers style={{ position: 'fixed', top: '0' }}>
                <form name="frmConfirm" action="">
                    <input type="hidden" name="CPID" value="CQM70325" />
                    <input type="hidden" name="ORDERNO" value={`${itemPk ?? 0}${(new Date()).getTime()}${auth?.pk ?? 0}`} />
                    <input type="hidden" name="PRODUCTTYPE" value="2" />
                    <input type="hidden" name="BILLTYPE" value="1" />
                    <input type="hidden" name="PRODUCTNAME" value={item?.title} ref={e => (itemRef.current[0] = e)} />
                    <input type="hidden" name="AMOUNT" value={(((item?.price ?? 0) * (100 - item?.discount_percent ?? 0) / 100)).toString()} ref={e => (itemRef.current[1] = e)} />
                    <input type="hidden" name="TAXFREECD" value="00" />
                    <input type="hidden" name="RETURNURL" value={`${frontUrl + `/api/keyrecieve/${itemPk}/pc`}`} />
                    <input type="hidden" name="RESERVEDSTRING" value={`{item_pk:${itemPk}, user_pk:${auth?.pk}}`} />
                </form>
            </Wrappers>
        </>

    )

}



export default AuthPayV2;