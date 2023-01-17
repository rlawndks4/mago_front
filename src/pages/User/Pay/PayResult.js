import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AcademySubCard from "../../../components/AcademySubCard";
import { ShadowContainer, TextButton, TextFillButton, Wrappers } from "../../../components/elements/UserContentTemplete"
import { commarNumber, makeDiscountPrice } from "../../../functions/utils";
import styled from "styled-components";
import { BsCheck2All } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md'
import theme from "../../../styles/theme";
const RowContent = styled.div`
display:flex;
width:100%;
margin:24px 0;
@media screen and (max-width:700px) { 
}
`
const PayResult = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [posts, setPosts] = useState({});
    useEffect(() => {
        changePage(1, true)
    }, [])

    const changePage = async (num, is_load) => {
        const { data: response } = await axios.get(`/api/item?table=academy_category&pk=${params?.class_pk}`);
        setPosts(response?.data);
    }
    return (
        <>
            <Wrappers>
                <AcademySubCard item={posts} not_price={true} />
                <RowContent>
                    <div style={{ marginLeft: 'auto', marginRight: '22px' }}>
                        {commarNumber(makeDiscountPrice(posts?.price, posts?.discount_percent))}원
                    </div>
                </RowContent>
                <ShadowContainer style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                    {params?.status == 1 ?
                        <>
                            <div style={{ margin: 'auto auto 8px auto' }}>결제가 완료되었습니다.</div>
                            <div style={{ margin: '8px auto 8px auto' }}>잠시후 카카오톡(위드싸인)으로 계약서가 발송됩니다.</div>
                            <div style={{ margin: '8px auto 8px auto' }}>결제내역은 마이페이지에서 확인하실 수 있습니다.</div>
                            <BsCheck2All style={{ margin: '8px auto auto auto', fontSize: theme.size.font1 }} />
                        </>
                        :
                        <>
                            <div style={{ margin: 'auto auto 8px auto' }}>결제에 실패하였습니다.</div>
                            <MdOutlineCancel style={{ margin: '8px auto auto auto', fontSize: theme.size.font1 }} />
                        </>}
                </ShadowContainer>
                <RowContent style={{ marginTop: '32px' }}>
                    <TextFillButton style={{ margin: '0 3% 0 0', width: '47%', height: '48px' }} onClick={() => navigate('/')}>메인 화면으로</TextFillButton>
                    <TextButton style={{ margin: '0 0 0 3%', width: '47%', height: '48px' }} onClick={() => navigate('/mypage')}>결제내역 확인</TextButton>
                </RowContent>
            </Wrappers>
        </>
    )
}
export default PayResult;