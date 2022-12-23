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
import ZoomButton from "../../../components/ZoomButton";
const Logo = styled.img`
position: fixed;
bottom: 0;
height:18px;
`
const Progress = styled.progress`

appearance: none;
position: fixed;
bottom: 0;
width: 100%;
left: 0;
right: 0;
height:16px;

::-webkit-progress-bar {
background: #f0f0f0;
border-radius: 0;
}

::-webkit-progress-value {
background:transparent;
border-bottom: 16px solid #4CDAD8;
border-right: 10px solid transparent;
}
`
const Notice = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([]);
    const [percent, setPercent] = useState(0);
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            try {
                const { data: response } = await axiosInstance.get(`/api/item?table=notice&pk=${params.pk}&views=1`)
                if (response.result < 0) {
                    if (response.result == -150) {
                    } else {
                        alert(response.message);
                        navigate(-1);
                    }
                }
                let obj = response.data;
                if(obj?.note && (typeof obj?.note == 'string')){
                    obj.note = obj?.note.replaceAll('http://localhost:8001', backUrl);
                    obj.note = obj?.note.replaceAll('https://weare-first.com:8443', backUrl);
                }
                setPost(obj);
                await new Promise((r) => setTimeout(r, 100));
                setTimeout(() => setLoading(false), 1000);
                await new Promise((r) => setTimeout(r, 1200));
                if (localStorage.getItem('dark_mode')) {
                    $('body').addClass("dark-mode");
                    $('p').addClass("dark-mode");
                    $('.toastui-editor-contents p').attr("style", "color:#ffffff !important");
                    $('.toastui-editor-contents span').attr("style", "color:#ffffff !important");
                    $('.toastui-editor-contents h1').attr("style", "color:#ffffff !important");
                    $('.toastui-editor-contents h2').attr("style", "color:#ffffff !important");
                    $('.toastui-editor-contents h3').attr("style", "color:#ffffff !important");
                    $('.toastui-editor-contents h4').attr("style", "color:#ffffff !important");
                    $('.toastui-editor-contents h5').attr("style", "color:#ffffff !important");
                    $('.menu-container').addClass("dark-mode");
                    $('.header').addClass("dark-mode");
                    $('.select-type').addClass("dark-mode");
                    $('.wrappers > .viewer > p').addClass("dark-mode");
                    $('.footer').addClass("dark-mode");
                    $('.viewer > div > div > div > p').addClass("dark-mode");
                }
            } catch (err) {
                if (err?.message?.includes('timeout of')) {
                    if (window.confirm('요청시간이 초과되었습니다. (인터넷 환경을 확인해주시기 바랍니다.)')) {

                    }
                }
            }
        }
        fetchPost();
        fetchComments();
        window.addEventListener('scroll', function (el) {
            let per = Math.floor(($(window).scrollTop() / ($(document).height() - $(window).height())) * 100);
            setPercent(per);
        })
    }, [])
    const fetchComments = async () => {
        const { data: response } = await axios.get(`/api/getcommnets?pk=${params.pk}&category=${categoryToNumber('notice')}`);
        setComments(response.data);
    }
    const myAuth = async () => {
        const { data: response } = await axios('/api/auth')
        if (response.pk > 0 && response.user_level >= 0) {
            setAuth(response);
        } else {
            if (response.user_level < 0) {
                alert("접근 권한이 없습니다.");
                navigate(-1);
            }

        }
    }
    const addComment = async (parent_pk) => {
        if (!$(`.comment-${parent_pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
            return;

        }
        const { data: response } = await axios.post('/api/addcomment', {
            userPk: auth.pk,
            userNick: auth.nickname,
            pk: params.pk,
            parentPk: parent_pk ?? 0,
            title: post.title,
            note: $(`.comment-${parent_pk ?? 0}`).val(),
            category: categoryToNumber('notice')
        })

        if (response.result > 0) {
            $(`.comment-${parent_pk ?? 0}`).val("");
            fetchComments();
        } else {
            alert(response.message);
        }
    }
    const updateComment = async (pk) => {
        if (!$(`.update-comment-${pk ?? 0}`).val()) {
            alert('필수 값을 입력해 주세요.');
        }
        const { data: response } = await axios.post('/api/updatecomment', {
            pk: pk,
            note: $(`.update-comment-${pk ?? 0}`).val(),
        })

        if (response.result > 0) {
            $(`.update-comment-${pk ?? 0}`).val("")
            fetchComments();
        } else {
            alert(response.message)
        }
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

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'end', fontSize: `${theme.size.font4}` }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ margin: '0 4px' }}>{post.nickname}</div> /
                                <div style={{ margin: '0 4px' }}>{post?.date?.substring(0, 10)}</div> /
                                <div style={{ margin: '0 8px 0 4px' }}>조회수 {commarNumber(post?.views ?? 0)}</div>
                            </div>
                        </div>
                        <Title>{post.title}</Title>
                        <ViewerContainer className="viewer" style={{ margin: `${getViewerMarginByNumber(post?.note_align)}` }}>
                            <Viewer initialValue={post?.note ?? `<body></body>`} />
                        </ViewerContainer>
                        {/* <ZoomButton /> */}
                        <CommentComponent addComment={addComment} data={comments} fetchComments={fetchComments} updateComment={updateComment} auth={auth} />
                        <Progress value={`${percent}`} max="100"></Progress>
                    </>
                }

                {/* <Logo src={logo} style={{left:`${percent-1}.7%`}}/> */}
            </Wrappers>
        </>
    )
}
export default Notice;