import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import logo from '../assets/images/test/logo.svg'
import kakao from '../assets/images/icon/kakao.png'
import naver from '../assets/images/icon/naver.png'
import { RowContent, Title } from './elements/UserContentTemplete';
import { formatPhoneNumber, regExp } from '../functions/utils';
import { WrapperForm, CategoryName, Input, Button, FlexBox, SnsLogo, RegularNotice } from './elements/AuthContentTemplete';
import { regularExpression } from '../data/Data';
import Policy from '../pages/User/Policy/Policy';
import theme from '../styles/theme';

const SignUpCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [phoneCheckIng, setPhoneCheckIng] = useState(false);
    const [isCheckId, setIsCheckId] = useState(false);
    const [isCheckNickname, setIsCheckNickname] = useState(false);
    const [isCheckPhoneNumber, setIsCheckPhoneNumber] = useState(false)
    const [randNum, setRandNum] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [num, setNum] = useState("");
    const [isCoinside, setIsCoinside] = useState(false);
    const [isSendSms, setIsSendSms] = useState(false)
    const [fixPhoneNumber, setFixPhoneNumber] = useState("")
    const [typeNum, setTypeNum] = useState(0);
    const [state, setState] = useState(undefined)
    const [coinsidePW, setCoinsidePw] = useState(true);
    const [isRegPw, setIsRegPw] = useState(false)
    const [addressList, setAddressList] = useState([])
    const [isSelectAddress, setIsSelectAddress] = useState(false);
    useEffect(() => {
        if (location.state) {
            if (!location.state.id) {
                navigate(-1);
            }
            setState(location.state)
        }
    }, [])
    const onCheckId = async () => {
        if (!$('.id').val()) {
            alert('아이디를 입력해주세요.');
        } else if ($('.id').val().includes(' ')) {
            alert('아이디의 공백을 제거해 주세요.');
        } else if (!regExp('id', $('.id').val())) {
            alert('아이디 정규식에 맞지 않습니다.');
        } else {
            const { data: response } = await axios.post('/api/checkexistid', { id: $('.id').val() });
            alert(response.message);
            if (response.result > 0) {
                setIsCheckId(true);
                $('.pw').focus();
            } else {
                setIsCheckId(false);
            }
        }
    }
    const onCheckNickname = async () => {
        if (!$('.nickname').val()) {
            alert('아이디를 입력해주세요.');
        } else if ($('.nickname').val().includes(' ')) {
            alert('닉네임의 공백을 제거해 주세요.');
        } else if (!regExp('nickname', $('.nickname').val())) {
            alert('닉네임 정규식에 맞지 않습니다.');
        } else {
            const { data: response } = await axios.post('/api/checkexistnickname', { nickname: $('.nickname').val() });
            alert(response.message);
            if (response.result > 0) {
                setIsCheckNickname(true);
                $('.phone').focus();
            } else {
                setIsCheckNickname(false);
            }
        }
    }
    const sendSms = async () => {
        if (!$('.phone').val()) {
            alert("핸드폰 번호를 입력해주세요.")
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
            console.log(e)
        }
        //console.log(response)
    }
    const confirmCoincide = (e) => {
        if (randNum === $('.phone-check').val()) {
            setIsCheckPhoneNumber(true);
            alert("인증번호가 일치합니다.");
        } else {
            setIsCheckPhoneNumber(false);
            alert("인증번호가 일차하지 않습니다.");
        }
    }
    const onSignUp = async () => {
        if (!$('.id').val() && !location.state) {
            alert('필수값을 입력해주세요.');
        } else if (!isCheckId && !location.state) {
            alert('아이디 중복확인을 해주세요.');
        } else if (!regExp('pw', $('.pw').val()) && !location.state) {
            alert('비밀번호 정규식을 지켜주세요.');
        } else if ($('.pw').val() != $('.pw-check').val() && !location.state) {
            alert('비밀번호가 일치하지 않습니다.');
        } else if (!isCheckPhoneNumber) {
            alert('전화번호 인증을 완료해 주세요.');
        } else if (!isCheckNickname) {
            alert('닉네임 중복확인을 해주세요.');
        } else if (!$('.zip_code').val()) {
            alert('우편번호를 입력해 주세요.');
        } else if (!$('.address').val()) {
            alert('주소를 입력해 주세요.');
        } else if (!$('.address_detail').val()) {
            alert('상세주소를 입력해 주세요.');
        } else if (!regExp('nickname', $('.nickname').val())) {
            alert('닉네임 정규식을 지켜주세요.');
        } else if (!$('input[id=term-of-use-1]:checked').val()) {
            alert('이용약관을 동의해 주세요.');

        } else if (!$('input[id=privacy-policy-1]:checked').val()) {
            alert('개인정보취급방침을 동의해 주세요.');

        } else {
            if (window.confirm('회원가입 하시겠습니까?')) {
                const { data: response } = await axios.post('/api/adduser', {
                    id: location.state ? state.id : $('.id').val(),
                    pw: location.state ? "111" : $('.pw').val(),
                    name: location.state ? state.name : $('.name').val(),
                    nickname: $('.nickname').val(),
                    address: $('.address').val(),
                    address_detail: $('.address_detail').val(),
                    zip_code: $('.zip_code').val(),
                    phone: fixPhoneNumber,
                    user_level: 0,
                    type_num: location.state ? state.typeNum : typeNum,
                    profile_img: location.state ? state.profile_img : null
                })
                if (response.result > 0) {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                } else {
                    alert(response.message);
                }
            }
        }
    }
    const onKeyPressId = (e) => {
        if (e.key == 'Enter') {
            onCheckId();
        }
    }
    const onKeyPressPw = (e) => {
        if (e.key == 'Enter') {
            $('.pw-check').focus();
        }
    }
    const onKeyPressPwCheck = (e) => {
        if (e.key == 'Enter') {
            $('.name').focus();
        }
    }
    const onKeyPressName = (e) => {
        if (e.key == 'Enter') {
            $('.nickname').focus();
        }
    }
    const onKeyPressNickname = (e) => {
        if (e.key == 'Enter') {
            onCheckNickname();
        }
    }
    const onKeyPressPhone = (e) => {
        if (e.key == 'Enter') {
            sendSms();
        }
    }
    const onKeyPressPhoneCheck = (e) => {
        if (e.key == 'Enter') {
            confirmCoincide();
        }
    }
    const onChangePw = (e) => {
        setIsRegPw(regExp('pw', e.target.value))
    }
    const onChangePwCheck = (e) => {
        if (e.target.value != $('.pw').val()) {
            setCoinsidePw(false);
        } else {
            setCoinsidePw(true);
        }
    }
    const onSelectAddress = (idx) => {
        setIsSelectAddress(true);
        let address_obj = addressList[idx];
        $('.address').val(address_obj?.address);
        $('.zip_code').val(address_obj?.zip_code);
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
            <WrapperForm onSubmit={onSignUp} id='login_form'>
                <Title>회원가입</Title>
                {location.state ?
                    <>
                    </>
                    :
                    <>
                        <CategoryName>아이디</CategoryName>
                        <Input placeholder='아이디를 입력해주세요.' type={'text'} className='id' disabled={isCheckId} onKeyPress={onKeyPressId} />
                        <RegularNotice>5~20자 내의 영문, 숫자 조합만 가능합니다.</RegularNotice>
                        <Button onClick={onCheckId} disabled={isCheckId}>{isCheckId ? '사용가능' : '중복확인'}</Button>
                        <CategoryName>비밀번호</CategoryName>
                        <Input placeholder='비밀번호를 입력해주세요.' type={'password'} className='pw' onKeyPress={onKeyPressPw} onChange={onChangePw} />
                        <RegularNotice>{isRegPw ? '' : '8~15자 내의 영문, 숫자, 특수문자 조합만 가능합니다.'}</RegularNotice>
                        <CategoryName>비밀번호 확인</CategoryName>
                        <Input placeholder='비밀번호를 한번더 입력해주세요.' type={'password'} className='pw-check' onKeyPress={onKeyPressPwCheck} onChange={onChangePwCheck} />
                        <RegularNotice>{!coinsidePW ? '비밀번호가 일치하지 않습니다.' : ''}</RegularNotice>
                        <CategoryName>이름</CategoryName>
                        <Input placeholder='이름을 입력해주세요.' type={'text'} className='name' onKeyPress={onKeyPressName} />
                        <RegularNotice>실명으로 입력해주세요.</RegularNotice>
                    </>
                }



                <CategoryName>닉네임</CategoryName>
                <Input placeholder='닉네임을 입력해주세요.' type={'text'} disabled={isCheckNickname} className='nickname' onKeyPress={onKeyPressNickname} />
                <RegularNotice>2~8자 내의 한글, 영문, 숫자 조합만 가능합니다.</RegularNotice>
                <Button onClick={onCheckNickname} disabled={isCheckNickname}>{isCheckNickname ? '사용가능' : '중복확인'}</Button>
                <CategoryName>전화번호</CategoryName>
                <CategoryName style={{ marginTop: '8px', fontSize: '12px' }}>- 아이디 찾기 및 비밀번호 찾기에 이용됩니다.</CategoryName>
                <Input placeholder='전화번호를 입력해주세요.' type={'text'} className='phone' disabled={isCheckPhoneNumber} onKeyPress={onKeyPressPhone} />
                <RegularNotice></RegularNotice>
                <Button onClick={sendSms} disabled={isCheckPhoneNumber}>인증번호 발송</Button>
                <Input style={{ marginTop: '36px' }} placeholder='인증번호를 입력해주세요.' type={'text'} className='phone-check' disabled={isCheckPhoneNumber} onKeyPress={onKeyPressPhoneCheck} />
                <RegularNotice></RegularNotice>
                <Button onClick={confirmCoincide} disabled={isCheckPhoneNumber}>{isCheckPhoneNumber ? '확인완료' : '인증번호 확인'}</Button>
                <CategoryName>우편번호</CategoryName>
                <Input className="zip_code" placeholder="예) 12345" onKeyPress={(e) => e.key == 'Enter' ? $('.address').focus() : null} />
                <CategoryName>주소</CategoryName>
                <Input className="address" placeholder="예) XX시 YY구 ZZ동 111-11" onKeyPress={(e) => e.key == 'Enter' ? $('.address-detail').focus() : null} />
                <Button onClick={getAddressByText}>주소검색</Button>
                {addressList.length > 0 && !isSelectAddress ?
                    <>
                        <div style={{ width: '100%', background: theme.color.font5, display: 'flex', marginTop: '32px' }}>
                            <div style={{ maxWidth: '700px', padding: '8px', margin: '8px auto', background: '#fff', width: '95%', display: 'flex', flexDirection: 'column', maxHeight: '1000px', minHeight: '500px', overflowY: 'auto' }}>
                                {addressList.map((item, idx) => (
                                    <>
                                        <div style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', borderBottom: `1px solid ${theme.color.font3}`, padding: '8px 0' }} onClick={() => { onSelectAddress(idx) }}>
                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: theme.size.font5 }}>
                                                <div style={{ color: theme.color.red }}>{item.zip_code ?? "---"}</div>
                                                <div style={{ color: theme.color.font3, marginLeft: '8px' }}>({item.land_number ?? "---"})</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: theme.size.font4, marginTop: '8px' }}>
                                                <div style={{ border: `1px solid ${theme.color.font4}`, padding: '3px 4px', fontSize: theme.size.font5, marginRight: '8px', borderRadius: '4px', color: theme.color.blue }}>도로명</div>
                                                <div>{item.road_address ?? "---"}</div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', fontSize: theme.size.font4, marginTop: '8px' }}>
                                                <div style={{ border: `1px solid ${theme.color.font4}`, padding: '3px 10px', fontSize: theme.size.font5, marginRight: '8px', borderRadius: '4px', color: theme.color.blue }}>지번</div>
                                                <div>{item.address ?? "---"}</div>

                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>

                    </>
                    :
                    <>
                    </>
                }
                <CategoryName>상세주소</CategoryName>
                <Input className="address_detail" placeholder="예) XX동 YY호" onKeyPress={(e) => e.key == 'Enter' ? $('.account_holder').focus() : null} />
                {/* <CategoryName>SNS 간편 회원가입</CategoryName>
                <FlexBox>
                    <SnsLogo src={kakao} />
                    <SnsLogo src={naver} />
                </FlexBox> */}
                <Title>이용약관</Title>
                <div style={{ width: '94%', height: '300px', overflowY: 'scroll', border: `1px solid ${theme.color.font3}`, padding: '3%' }}>
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
                <Title>개인정보취급방침</Title>
                <div style={{ width: '94%', height: '300px', overflowY: 'scroll', border: `1px solid ${theme.color.font3}`, padding: '3%' }}>
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
                <Button style={{ marginTop: '36px' }} onClick={onSignUp}>회원가입</Button>
            </WrapperForm>
        </>
    );
};
export default SignUpCard;