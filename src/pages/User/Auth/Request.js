import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Textarea } from "../../../components/elements/ManagerTemplete";
import { Content, TextButton, TextFillButton, Wrappers } from "../../../components/elements/UserContentTemplete"
import theme from "../../../styles/theme";
import $ from 'jquery';
import { useEffect, useState } from "react";
const Request = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.post('/api/myitem', {
                table: 'request',
                pk: params?.pk
            })
            setPost(response?.data);
            await new Promise((r) => setTimeout(r, 400));
            $('.title').val(response?.data?.title);
            $('.note').val(response?.data?.note);
            $('.reply').val(response?.data?.reply_note);
        }
        if (params?.pk > 0) {
            fetchPost();
        }
    }, [])
    const onRequest = async () => {
        if (window.confirm("저장 하시겠습니까?")) {
            const { data: response } = await axios.post('/api/additembyuser', {
                table: 'request',
                title: $('.title').val(),
                note: $('.note').val(),
            })
            if (response?.result > 0) {
                alert("성공적으로 저장되었습니다.");
                navigate('/servicecenter', { state: { type_num: 1 } })
            } else {
                alert(response?.message);
            }
        }
    }
    return (
        <Wrappers>
            <Content>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '48px', fontSize: theme.size.font4, fontWeight: 'bold' }}>제목</div>
                    <Input style={{ margin: '0 0 0 8px', width: '80%', maxWidth: '400px' }} className='title' disabled={params?.pk > 0 ? true : false} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px' }}>
                    <div style={{ width: '48px', fontSize: theme.size.font4, fontWeight: 'bold' }}>내용</div>
                    <Textarea style={{ margin: '0 0 0 8px', width: '80%', maxWidth: '400px', height: '360px' }} className='note' disabled={params?.pk > 0 ? true : false} />
                </div>
                {post?.status == 1 ?
                    <>
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '16px' }}>
                            <div style={{ width: '48px', fontSize: theme.size.font4, fontWeight: 'bold' }}>답변</div>
                            <Textarea style={{ margin: '0 0 0 8px', width: '80%', maxWidth: '400px', height: '360px' }} className='reply' disabled={params?.pk > 0 ? true : false} />
                        </div>
                        <div style={{ display: "flex", marginTop: '16px', marginLeft: 'auto' }}>
                            <TextButton style={{ margin: '0 4px 0 0' }} onClick={() => navigate(-1)}>뒤로가기</TextButton>
                        </div>
                    </>
                    :
                    <>
                        <div style={{ display: "flex", marginTop: '16px', marginLeft: 'auto' }}>
                            <TextButton style={{ margin: '0 4px 0 0' }} onClick={() => navigate(-1)}>취소</TextButton>
                            <TextFillButton style={{ margin: '0 0 0 4px' }} onClick={onRequest}>완료</TextFillButton>
                        </div>
                    </>}

            </Content>
        </Wrappers>
    )
}
export default Request;