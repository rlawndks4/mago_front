
import { useEffect, useState } from "react";
import { Wrappers, Card, Img, SelectType, ViewerContainer, Title, TextFillButton, TextButton, } from "../../../components/elements/UserContentTemplete";
import styled from "styled-components";
import theme from "../../../styles/theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ThemeCard from "../../../components/ThemeCard";
import { commarNumber, getIframeLinkByLink, makeDiscountPrice, range } from "../../../functions/utils";
import { Viewer } from '@toast-ui/react-editor';
import Loading from "../../../components/Loading";
import AcademySubCard from "../../../components/AcademySubCard";
import SelectTypeComponent from "../../../components/SelectTypeComponent";
import $ from 'jquery';
import Policy from "../Policy/Policy";
import depositKakaoImg from '../../../assets/images/test/deposit-kakao.png'
import { RiKakaoTalkFill } from "react-icons/ri";
import { GrFormNext } from 'react-icons/gr'
const RowContent = styled.div`
display:flex;
width:100%;
margin-top:24px;
@media screen and (max-width:700px) { 
}
`
const Content = styled.div`
margin:0 auto 1rem 0;
width:100%;
font-size:${props => props.theme.size.font3};
display:flex;
flex-direction:column;
font-weight:normal;
@media screen and (max-width:700px) { 
    
}
`
const TitleStyle = styled.div`
font-size:${props => props.theme.size.font2};
font-weight:bold;
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
margin: 24px 0 16px 0;
`
const ShadowContainer = styled.div`
background:#FAFAFA;
border-radius:${props => props.theme.borderRadius};
padding:6px 30px;
box-shadow:${props => props.theme.boxShadow};
`
const PayReady = () => {

    const navigate = useNavigate();
    const params = useParams();
    const { state } = useLocation();

    const [posts, setPosts] = useState([]);
    const [typeNum, setTypeNum] = useState(0);
    const [subTypeNum, setSubTypeNum] = useState(0);
    const [master, setMaster] = useState({});
    const [academyList, setAcademyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageList, setPageList] = useState([]);
    const [reviewList, setReviewList] = useState([]);
    const [isSeeKakao, setIsSeeKakao] = useState(false);
    const [isSeeGoPay, setIsSeeGoPay] = useState(false);
    const [termOfUseDisplay, setTermOfUseDisplay] = useState(false);
    const [privacyPolicyDisplay, setPrivacyPolicyDisplay] = useState(false);
    useEffect(() => {
        changePage(1, true)
    }, [])

    const changePage = async (num, is_load) => {
        const { data: response } = await axios.get(`/api/item?table=academy_category&pk=${params.pk}`);
        setPosts(response?.data);
    }

    const onPayTypeClick = (type_num) => {
        if (!$('input[id=term-of-use-1]:checked').val()) {
            alert('이용약관을 동의해 주세요.');
            return;
        }
        if (!$('input[id=privacy-policy-1]:checked').val()) {
            alert('개인정보취급방침을 동의해 주세요.');
            return;
        }
        if (type_num == 0) {
            setIsSeeKakao(false);
            setIsSeeGoPay(true);

        }
        if (type_num == 1) {
            setIsSeeGoPay(false);
            setIsSeeKakao(true);
        }
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
                        {/* <div style={{ padding: '8px 24px', borderBottom: `1px solid ${theme.color.font2}`, width: '150px', textAlign: 'center', margin: '0 auto', fontSize: theme.size.font4, fontWeight: 'bold' }}>{posts?.title}</div> */}
                        <AcademySubCard item={posts} not_price={true} />
                        <RowContent>
                            <div style={{ marginLeft: 'auto', marginRight: '22px'}}>
                                {commarNumber(makeDiscountPrice(posts?.price, posts?.discount_percent))}원
                            </div>
                        </RowContent>
                        <ShadowContainer style={{ margin: '32px 0px' }}>
                            <Content style={{ fontSize: theme.size.font4, borderBottom: `1px solid ${theme.color.font4}` }}>
                                <RowContent style={{ justifyContent: 'space-between' }}>
                                    <div>상품명</div>
                                    <div>{posts?.title}</div>
                                </RowContent>
                                <RowContent style={{ justifyContent: 'space-between' }}>
                                    <div>상품가격</div>
                                    <div>{commarNumber(posts?.price)}</div>
                                </RowContent>
                                <RowContent style={{ justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <div>할인</div>
                                    <div>- {commarNumber(posts?.price * posts?.discount_percent / 100)}</div>
                                </RowContent>
                            </Content>
                            <RowContent style={{ fontSize: theme.size.font3, justifyContent: 'space-between', marginBottom: '24px' }}>
                                <div>최종 결제 금액</div>
                                <div>{commarNumber(makeDiscountPrice(posts?.price, posts?.discount_percent))}원</div>
                            </RowContent>
                        </ShadowContainer>
                        <TitleStyle>
                            <div>이용약관</div>
                            <GrFormNext style={{ cursor: 'pointer' }} onClick={() => { setTermOfUseDisplay(!termOfUseDisplay); }} />
                        </TitleStyle>
                        <div style={{ width: '94%', height: '300px', overflowY: 'scroll', border: `1px solid ${theme.color.font3}`, padding: '3%', display: `${termOfUseDisplay ? '' : 'none'}` }}>
                            <Policy pk={0} />
                        </div>
                        <RowContent style={{ alignItems: 'center', marginTop: '8px' }}>
                            <input type={'radio'} id="term-of-use-1" name="term-of-use" style={{ margin: '0 4px 0 auto' }}
                                onChange={(e) => {
                                    if ($('input[id=privacy-policy-1]:checked').val()) {
                                        $('#all-allow').prop('checked', true);
                                    }
                                }} />
                            <label for={'term-of-use-1'} style={{ margin: '0 4px 0 0' }}>동의함</label>
                            <input type={'radio'} id="term-of-use-2" name="term-of-use" style={{ margin: '0 4px 0 0' }}
                                onChange={(e) => {
                                    $('#all-allow').prop('checked', false);
                                }} />
                            <label for={'term-of-use-2'} style={{ margin: '0' }}>동의안함</label>
                        </RowContent>
                        <TitleStyle>
                            <div>개인정보취급방침</div>
                            <GrFormNext style={{ cursor: 'pointer' }} onClick={() => { setPrivacyPolicyDisplay(!privacyPolicyDisplay); }} />
                        </TitleStyle>
                        <div style={{ width: '94%', height: '300px', overflowY: 'scroll', border: `1px solid ${theme.color.font3}`, padding: '3%', display: `${privacyPolicyDisplay ? '' : 'none'}` }}>
                            <Policy pk={1} />
                        </div>
                        <RowContent style={{ alignItems: 'center', marginTop: '8px' }}>
                            <input type={'radio'} id="privacy-policy-1" name="privacy-policy" style={{ margin: '0 4px 0 auto' }}
                                onChange={(e) => {
                                    if ($('input[id=term-of-use-1]:checked').val()) {
                                        $('#all-allow').prop('checked', true);
                                    }
                                }} />
                            <label for={'privacy-policy-1'} style={{ margin: '0 4px 0 0' }}>동의함</label>
                            <input type={'radio'} id="privacy-policy-2" name="privacy-policy" style={{ margin: '0 4px 0 0' }}
                                onChange={(e) => {
                                    $('#all-allow').prop('checked', false);
                                }} />
                            <label for={'privacy-policy-2'} style={{ margin: '0' }}>동의안함</label>
                        </RowContent>
                        <RowContent style={{ alignItems: 'center', marginTop: '32px' }}>
                            <input type={'checkbox'} id='all-allow'
                                onChange={(e) => {
                                    if ($('#all-allow').is(':checked')) {
                                        $("input:radio[id='term-of-use-1']").prop("checked", true);
                                        $("input:radio[id='privacy-policy-1']").prop("checked", true);
                                    }
                                }} />
                            <label for='all-allow'>이용약관, 개인정보취급방침 이용에 모두 동의합니다.</label>
                        </RowContent>
                        <RowContent style={{ marginTop: '32px' }}>
                            <TextFillButton style={{ margin: '0 3% 0 0', width: '47%', height: '48px' }} onClick={() => onPayTypeClick(0)}>신용카드</TextFillButton>
                            <TextButton style={{ margin: '0 0 0 3%', width: '47%', height: '48px' }} onClick={() => onPayTypeClick(1)}>무통장입금</TextButton>
                        </RowContent>
                        {isSeeGoPay ?
                            <>
                                <TextFillButton style={{ width: '100%', maxWidth: '500px', margin: '16px auto', height: '60px', background: theme.color.background2, border: `1px solid ${theme.color.background2}`, borderRadius: '0' }}
                                    onClick={() => {
                                        if (window.confirm('결제하시겠습니까?')) {
                                            navigate(`/authpay/${params?.pk}`);
                                        }
                                    }}>
                                    {commarNumber(makeDiscountPrice(posts?.price, posts?.discount_percent))}원 결제하기
                                </TextFillButton>
                            </>
                            :
                            <>
                            </>}
                        {isSeeKakao ?
                            <>
                                <div style={{ width: '100%', maxWidth: '500px', display: 'flex', padding: '16px 0', margin: '16px auto', cursor: 'pointer', background: '#ffe812', alignItems: 'center' }}
                                    onClick={() => { window.open('http://pf.kakao.com/_xgKMUb/chat'); }}>
                                    <div style={{ margin: '0 4px 0 auto' }}>무통장 입금 방법 문의하기</div>
                                    <RiKakaoTalkFill style={{ margin: '0 auto 0 4px', fontSize: theme.size.font1 }} />
                                </div>
                            </>
                            :
                            <>
                            </>}

                    </>}

            </Wrappers>
        </>
    )
}
export default PayReady;