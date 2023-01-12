import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import MItemEditComponent from "../../components/MItemEditComponent"
import { objManagerEditContent } from "../../data/Manager/ManagerContentData";
import $ from 'jquery';
import axios from "axios";
import { commarNumber, returnMoment } from "../../functions/utils";
import { GiUfo } from "react-icons/gi";
import { Col, Explain, Input, Row, Title } from "../../components/elements/ManagerTemplete";
import theme from "../../styles/theme";
const MPayCancelEdit = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [classObj, setClassObj] = useState({})
    const [userObj, setUserObj] = useState({})
    useEffect(() => {
        async function fetchPost() {
            const { data: response } = await axios.get(`/api/item?table=subscribe&pk=${params?.pk}`);
            console.log(response)
            setClassObj(response?.data);
        }
        fetchPost();
    }, [])
    const editItemByParent = async () => {
        if (params.pk == 0) {
            addItem();
        } else {
            editItem();
        }
    }
    const addItem = async () => {

    }
    const editItem = async () => {
        if (window.confirm("저장하시겠습니까?")) {
            if (parseInt($('.price').val()) > classObj?.price) {
                alert("취소금액은 승인금액을 넘을 수 없습니다.");
            }
            let edit_obj = {
                user_pk: classObj?.user_pk,
                master_pk: classObj?.master_pk,
                status: 1,
                academy_category_pk: classObj?.academy_category_pk,
                price: (parseInt($('.price').val()) * (-1)),
                trade_date: returnMoment(),
                order_num: classObj?.order_num,
                approval_num: classObj?.approval_num,
                end_date: classObj?.end_date,
                transaction_status: -1

            };
            edit_obj['table'] = 'subscribe';
            const { data: res } = await axios.post('/api/additem', edit_obj);
            if (res?.result > 0) {
                alert('성공적으로 저장되었습니다');
                navigate(-1);
            } else {
                alert(res?.message);
            }
        }

    }
    return (
        <>
            <MItemEditComponent schema={'pay_cancel'} params_pk={params.pk} editItemByParent={editItemByParent}
                editContent={<>
                    <Row>
                        <Col style={{ width: '228px' }}>
                            <Title>{'승인금액'}</Title>
                            <Explain style={{ fontSize: theme.size.font3 }}>{commarNumber(classObj?.price)}</Explain>
                        </Col>
                        <Col style={{ width: '228px' }}>
                            <Title>{'신청번호'}</Title>
                            <Explain style={{ fontSize: theme.size.font3 }}>{classObj?.pk}</Explain>
                        </Col>
                        <Col style={{ width: '228px' }}>
                            <Title>{'주문번호'}</Title>
                            <Explain style={{ fontSize: theme.size.font3 }}>{classObj?.order_num}</Explain>
                        </Col>
                        <Col style={{ width: '228px' }}>
                            <Title>{'승인번호'}</Title>
                            <Explain style={{ fontSize: theme.size.font3 }}>{classObj?.approval_num}</Explain>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Title>취소할 금액</Title>
                            <Input type={'number'} className='price' />
                        </Col>
                    </Row>
                </>} />
        </>
    )
}
export default MPayCancelEdit;