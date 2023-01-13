import { useEffect, useState } from "react";
import styled from "styled-components";
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo, RegularNotice } from './elements/AuthContentTemplete';
import { Title, SelectType, RowContent } from "./elements/UserContentTemplete";
import theme from "../styles/theme";
import $ from 'jquery';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumber, regExp } from "../functions/utils";
import defaultImg from '../assets/images/icon/default-profile.png';
import { backUrl } from "../data/Data";
import imageCompression from 'browser-image-compression';
import DaumPostcode from 'react-daum-postcode';
import AddButton from './elements/button/AddButton';
const Table = styled.table`
font-size:12px;
width:95%;
margin:0 auto;
text-align:center;
border-collapse: collapse;
color:${props => props.theme.color.font1};
background:#fff;
`
const Tr = styled.tr`
width:100%;
height:26px;
border-bottom:1px solid ${props => props.theme.color.font4};
`
const Td = styled.td`
border-bottom:1px solid ${props => props.theme.color.font4};
`
const Type = styled.div`
width:50%;
text-align:center;
padding: 0.75rem 0;
font-weight:bold;
cursor:pointer;
font-size:1rem;
@media screen and (max-width:700px) {
    font-size:0.8rem;
}
@media screen and (max-width:350px) {
    font-size:0.65rem;
}
`
const EditMyInfoCard = () => {
    const navigate = useNavigate();
    const [typeNum, setTypeNum] = useState(0);

    const [myPk, setMyPk] = useState(0);
    const [myId, setMyId] = useState("");
    const [phoneCheckIng, setPhoneCheckIng] = useState(false);
    const [isCheckId, setIsCheckId] = useState(false);
    const [isCheckNickname, setIsCheckNickname] = useState(false);
    const [isCheckPhoneNumber, setIsCheckPhoneNumber] = useState(false)
    const [isCheckIdAndPhone, setIsCheckIdAndPhone] = useState(false)
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [randNum, setRandNum] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [num, setNum] = useState("");
    const [isCoinside, setIsCoinside] = useState(false);
    const [isSendSms, setIsSendSms] = useState(false)
    const [fixPhoneNumber, setFixPhoneNumber] = useState("")
    const [zType, setZType] = useState([{ title: "닉네임 변경", type: 1 }, { title: "비밀번호 변경", type: 2 }, { title: "전화번호 변경", type: 3 }])
    const [addressList, setAddressList] = useState([])
    const [isSelectAddress, setIsSelectAddress] = useState(false);
    const [isSeePostCode, setIsSeePostCode] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('is_ios')) {
            onChangeTypeNum(1)
        } else {
            setZType([...[{ title: "프로필 변경", type: 0 }], ...zType])
            onChangeTypeNum(0);
        }
        let auth = JSON.parse(localStorage.getItem('auth'))
        if (auth.profile_img) {
            setUrl(auth.profile_img.substring(0, 4) == "http" ? auth.profile_img : backUrl + auth.profile_img)
        }
        setMyId(auth.id);
    }, [])
    const sendSms = async () => {
        if (typeNum == 2 && !$('.id').val()) {
            alert("아이디를 입력해 주세요.");
            return;
        }
        if (!$('.phone').val()) {
            alert("핸드폰 번호를 입력해주세요.");
            return;
        }
        setIsCheckPhoneNumber(false);
        let fix_phone = $('.phone').val().replace('-', '');
        setFixPhoneNumber(fix_phone);
        let content = "";
        for (var i = 0; i < 6; i++) {
            content += Math.floor(Math.random() * 10).toString();
        }

        let string = `\n인증번호를 입력해주세요 ${content}.\n\n-퍼스트아카데미-`;
        try {
            const { data: response } = await axios.post(`/api/sendsms`, {
                receiver: [fix_phone, formatPhoneNumber(fix_phone)],
                content: string
            })
            if (response?.result > 0) {
                alert('인증번호가 발송되었습니다.');

                setIsSendSms(true)
                setRandNum(content);
                $('phone-check').focus();
            } else {
                setIsSendSms(false)
            }
        } catch (e) {
        }
    }
    const refresh = () => {

    }
    const onChangeTypeNum = async (num) => {
        if (num != typeNum) {
            $('.id').val('');
            $('.phone').val('');
            $('.phone-check').val('');
            $('.nickname').val('');
            $('.new-pw').val('');
            $('.new-pw-check').val('');
            setTypeNum(num);
        }
        if (num == 0) {
            const { data: response } = await axios.get('/api/getmyinfo');
            $('.address').val(response?.data?.address);
            $('.address_detail').val(response?.data?.address_detail);
            $('.zip_code').val(response?.data?.zip_code);
            $('.account_holder').val(response?.data?.account_holder);
            $('.bank_name').val(response?.data?.bank_name);
            $('.account_number').val(response?.data?.account_number);
        }
    }
    const addFile = async (e) => {
        if (e.target.files[0]) {
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 64
            }
            try {
                const compressedFile = await imageCompression(e.target.files[0], options);
                const promise = imageCompression.getDataUrlFromFile(compressedFile);
                promise.then(result => {
                    setUrl(result);
                })
                setContent(compressedFile);
            } catch (err) {
                console.log(err);
            }

        }
    };
    const onSave = async (num) => {
        let formData = new FormData();
        if (num == 0) {
            formData.append('id', myId);
            formData.append('profile', content);
            const { data: response } = await axios.post('/api/uploadprofile', formData);
        }
        let str = '/api/editmyinfo';

        let obj = { id: myId, pw: $('.pw').val(), typeNum: num };
        if (num == 0) {
            obj.address = $('.address').val();
            obj.address_detail = $('.address_detail').val();
            obj.zip_code = $('.zip_code').val();
            obj.account_holder = $('.account_holder').val();
            obj.bank_name = $('.bank_name').val();
            obj.account_number = $('.account_number').val();
        } else {
            if (!$('.pw').val()) {
                alert("비밀번호를 입력해주세요.");
                return;
            }
        }
        if (num == 1) {
            if (!$('.nickname').val()) {
                alert("닉네임을 입력해주세요.");
                return;
            }
            if ($('.nickname').val().includes(' ')) {
                alert("닉네임의 공백을 제거해 주세요.");
                return;
            }
            if (!regExp('nickname', $('.nickname').val())) {
                alert("닉네임 정규식에 맞지 않습니다.");
                return;
            }
            obj.nickname = $('.nickname').val();
        } else if (num == 2) {
            if ($('.new-pw').val() != $('.new-pw-check').val()) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
            }
            if (!regExp('pw', $('.new-pw').val())) {
                alert("비밀번호 정규식에 맞지 않습니다.");
                return;
            }
            obj.newPw = $('.new-pw').val();
        } else if (num == 3) {
            if (!randNum) {
                alert("인증번호를 발송해 주세요.");
                return;
            }
            if ($('.phone-check').val() != randNum) {
                alert("인증번호가 일치하지 않습니다.");
                return;
            }
            obj.phone = $('.phone').val();
        }
        const { data: response } = await axios.post(str, obj);
        if (response.result > 0) {
            alert("성공적으로 저장되었습니다.");
        } else {
            alert(response.message);
        }
    }
    const onSelectAddress = (data) => {
        setIsSeePostCode(false);
        console.log(data);
        $('.address').val(data?.address);
        $('.zip_code').val(data?.zonecode);
        $('.address_detail').val("");
        $('.address_detail').focus();
    }
    const getAddressByText = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.address').val()
        })
        console.log(response)
        if (response?.result > 0) {
            setIsSelectAddress(false);
            setAddressList(response?.data);
        } else {
            alert(response?.message);
        }

    }
    return (
        <>
            <WrapperForm>
                <Title>마이페이지 수정</Title>
                <SelectType className="select-type">
                    {zType.map((item, idx) => (
                        <>
                            <Type style={{ borderBottom: `4px solid ${typeNum == item?.type ? theme.color.background1 : '#fff'}`, color: `${typeNum == item?.type ? theme.color.background1 : (localStorage.getItem('dark_mode') ? '#fff' : '#ccc')}` }} onClick={() => { onChangeTypeNum(item?.type) }}>{item.title}</Type>
                        </>
                    ))}

                </SelectType>
                {localStorage.getItem('is_ios') ?
                    <>
                    </>
                    :
                    <>
                        {typeNum == 0 ?
                            <>
                                <CategoryName>이미지 업로드</CategoryName>
                                <label for="file1" style={{ margin: '0 auto' }}>
                                    {url ?
                                        <>
                                            <img src={url} alt="#"
                                                style={{
                                                    width: '8rem', height: '8rem',
                                                    margin: '2rem auto', borderRadius: '50%'
                                                }} />
                                        </>
                                        :
                                        <>
                                            <img src={defaultImg} alt="#"
                                                style={{
                                                    width: '8rem', height: '8rem',
                                                    margin: '2rem auto', borderRadius: '50%'
                                                }} />
                                        </>}
                                </label>
                                <div>
                                    <input type="file" id="file1" onChange={addFile} style={{ display: 'none' }} />
                                </div>
                                <CategoryName style={{ maxWidth: '500px', width: '100%' }}>우편번호</CategoryName>
                                <RowContent style={{ maxWidth: '500px', width: '100%', alignItems: 'center', margin: '0 auto' }}>
                                    <Input onClick={() => { setIsSeePostCode(!isSeePostCode) }} disabled={true} style={{ width: '70%' }} className="zip_code" placeholder="예) 12345" onKeyPress={(e) => e.key == 'Enter' ? $('.address').focus() : null} />
                                    <AddButton style={{ width: '30%', margin: '16px 0 0 8px' }} onClick={() => { setIsSeePostCode(!isSeePostCode) }}>우편번호 검색</AddButton>
                                </RowContent>
                                <CategoryName style={{ maxWidth: '500px', width: '100%' }}>주소</CategoryName>
                                <Input onClick={() => { setIsSeePostCode(!isSeePostCode) }} disabled={true} style={{ maxWidth: '470px' }} className="address" placeholder="예) XX시 YY구 ZZ동 111-11" onKeyPress={(e) => e.key == 'Enter' ? $('.address-detail').focus() : null} />
                                <CategoryName style={{ maxWidth: '500px', width: '100%' }}>상세주소</CategoryName>
                                <Input style={{ maxWidth: '470px' }} className="address_detail" placeholder="예) XX동 YY호" onKeyPress={(e) => e.key == 'Enter' ? $('.account_holder').focus() : null} />
                                {isSeePostCode ?
                                    <>
                                        <div>
                                            <DaumPostcode style={postCodeStyle} onComplete={onSelectAddress} />
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>}
                                <CategoryName>예금주</CategoryName>
                                <Input className="account_holder" placeholder="" onKeyPress={(e) => e.key == 'Enter' ? $('.bank_name').focus() : null} />
                                <CategoryName>은행명</CategoryName>
                                <Input className="bank_name" placeholder="" onKeyPress={(e) => e.key == 'Enter' ? $('.account_number').focus() : null} />
                                <CategoryName>계좌번호</CategoryName>
                                <Input className="account_number" placeholder="" onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                            </>
                            :
                            <>
                            </>
                        }
                    </>
                }

                {typeNum == 1 ?
                    <>
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.nickname').focus() : null} />
                        <CategoryName>변경할 닉네임</CategoryName>
                        <Input className="nickname" placeholder="변경할 닉네임을 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>
                }
                {typeNum == 2 ?
                    <>
                        <CategoryName>현재 비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="현재 비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.new-pw').focus() : null} />
                        <CategoryName>새 비밀번호</CategoryName>
                        <Input className="new-pw" type={'password'} placeholder="새 비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.new-pw-check').focus() : null} />
                        <CategoryName>새 비밀번호 확인</CategoryName>
                        <Input className="new-pw-check" type={'password'} placeholder="비밀번호를 한번 더 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>
                }
                {typeNum == 3 ?
                    <>
                        <CategoryName>비밀번호</CategoryName>
                        <Input className="pw" type={'password'} placeholder="비밀번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? $('.phone').focus() : null} />
                        <CategoryName>전화번호</CategoryName>
                        <Input className="phone" placeholder="전화번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? sendSms() : null} />
                        <RegularNotice></RegularNotice>
                        <Button onClick={sendSms}>인증번호 발송</Button>
                        <CategoryName>인증번호</CategoryName>
                        <Input className="phone-check" placeholder="인증번호를 입력해 주세요." onKeyPress={(e) => e.key == 'Enter' ? onSave(typeNum) : null} />
                    </>
                    :
                    <>
                    </>
                }
                <Button style={{ marginTop: '36px' }} onClick={() => onSave(typeNum)}>저장</Button>
            </WrapperForm>
        </>
    )
}
const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    maxWidth: '500px',
    width: '100%',
    height: '400px',
    margin: '16px auto'
};

export default EditMyInfoCard;