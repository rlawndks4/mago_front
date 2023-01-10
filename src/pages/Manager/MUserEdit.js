import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ManagerWrappers from '../../components/elements/ManagerWrappers';
import SideBar from '../../common/manager/SideBar';
import ManagerContentWrappers from '../../components/elements/ManagerContentWrappers';
import axios from 'axios';
import Breadcrumb from '../../common/manager/Breadcrumb';
import ButtonContainer from '../../components/elements/button/ButtonContainer';
import AddButton from '../../components/elements/button/AddButton';
import CancelButton from '../../components/elements/button/CancelButton';
import $ from 'jquery';
import { addItem, updateItem } from '../../functions/utils';
import { Card, Title, Input, Row, Col, ImageContainer, Select } from '../../components/elements/ManagerTemplete';

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
const MUserEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [myNick, setMyNick] = useState("")
    const [url, setUrl] = useState('')
    const [content, setContent] = useState(undefined)
    const [formData] = useState(new FormData())
    const [addressList, setAddressList] = useState([])
    const [isSelectAddress, setIsSelectAddress] = useState(false);
    useEffect(() => {

        async function fetchPost() {
            if (params.pk > 0) {
                const { data: response } = await axios.get(`/api/item?table=user&pk=${params.pk}`)
                $('.id').val(response.data.id)
                $('.pw').val("")
                $('.name').val(response.data.name)
                $('.nickname').val(response.data.nickname)
                $('.phone').val(response.data.phone)
                $('.level').val(response.data.user_level)
                $('.address').val(response.data.address)
                $('.address_detail').val(response.data.address_detail)
                $('.zip_code').val(response.data.zip_code)
            }
        }
        fetchPost();
    }, [])
    const editUser = () => {
        if (!$(`.id`).val() || !$(`.name`).val() || !$(`.nickname`).val() || !$(`.phone`).val() || (!$(`.pw`).val() && params.pk == 0)) {
            alert('필요값이 비어있습니다.');
        } else {
            let obj = {
                id: $(`.id`).val(),

            }
            if (window.confirm(`${params.pk == 0 ? '추가하시겠습니까?' : '수정하시겠습니까?'}`)) {
                params.pk == 0 ?
                    addItem('user', { id: $(`.id`).val(), pw: $(`.pw`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), phone: $(`.phone`).val(), user_level: $(`.level`).val(), address: $(`.address`).val(), address_detail: $(`.address_detail`).val(), zip_code: $(`.zip_code`).val() }) :
                    updateItem('user', {
                        id: $(`.id`).val(), pw: $(`.pw`).val(), name: $(`.name`).val(), nickname: $(`.nickname`).val(), phone: $(`.phone`).val(), user_level: $(`.level`).val(), address: $(`.address`).val(), address_detail: $(`.address_detail`).val(), zip_code: $(`.zip_code`).val(), pk: params.pk
                    })
            }
        }


    }
    const getAddressByText = async () => {
        const { data: response } = await axios.post('/api/getaddressbytext', {
            text: $('.address').val()
        })
        setIsSelectAddress(false);
        setAddressList(response?.data);
    }
    const onSelectAddress = (idx) => {
        setIsSelectAddress(true);
        let address_obj = addressList[idx];
        $('.address').val(address_obj?.address);
        $('.zip_code').val(address_obj?.zip_code);
        $('.address_detail').focus();
    }
    return (
        <>
            <Breadcrumb title={params.pk == 0 ? '회원 추가' : '회원 수정'} nickname={myNick} />
            <Card>
                <Row>
                    <Col>
                        <Title style={{ margintop: '32px' }}>아이디</Title>
                        <Input className='id' />
                    </Col>
                    <Col>
                        <Title style={{ margintop: '32px' }}>비밀번호</Title>
                        <Input className='pw' type={'password'} placeholder='****' autoComplete={'new-password'} />
                    </Col>
                    <Col>
                        <Title style={{ margintop: '32px' }}>이름</Title>
                        <Input className='name' />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Title style={{ margintop: '32px' }}>닉네임</Title>
                        <Input className='nickname' />
                    </Col>
                    <Col>
                        <Title style={{ margintop: '32px' }}>폰번호</Title>
                        <Input className='phone' />
                    </Col>
                    <Col>
                        <Title style={{ margintop: '32px' }}>유저레벨</Title>
                        <Select className='level'>
                            <option value={-10}>불량회원</option>
                            <option value={0}>일반유저</option>
                            <option value={40}>관리자</option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Title>주소</Title>
                        <div style={{ display: 'flex' }}>
                            <Input className='address' onKeyPress={(e) => { e.key == 'Enter' ? getAddressByText() : console.log(null) }} />
                            <AddButton style={{ margin: '12px auto 6px 12px' }} onClick={getAddressByText}>검색</AddButton>
                        </div>
                    </Col>
                </Row>
                {addressList.length > 0 && !isSelectAddress ?
                    <>
                        <Table style={{ maxWidth: '700px', margin: '12px auto 12px 24px', width: '90%' }}>
                            <Tr>
                                <Td style={{ width: '30%' }}>우편번호</Td>
                                <Td style={{ width: '70%' }}>주소</Td>
                            </Tr>
                            {addressList.map((item, idx) => (
                                <>
                                    <Tr style={{ cursor: 'pointer' }} onClick={() => { onSelectAddress(idx) }}>
                                        <Td style={{ width: '30%', padding: '8px 0' }}>{item.zip_code ?? "---"}</Td>
                                        <Td style={{ width: '70%', padding: '8px 0' }}>{item.address ?? "---"}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Table>
                    </>
                    :
                    <>
                    </>
                }
                <Row>
                    <Col>
                        <Title>상세주소</Title>
                        <Input className='address_detail' />
                    </Col>
                    <Col>
                        <Title>우편번호</Title>
                        <Input className='zip_code' />
                    </Col>
                </Row>
            </Card>
            <ButtonContainer>
                <CancelButton onClick={() => navigate(-1)}>x 취소</CancelButton>
                <AddButton onClick={editUser}>{params.pk == 0 ? '+ 추가' : '수정'}</AddButton>
            </ButtonContainer>
        </>
    )
}
export default MUserEdit;