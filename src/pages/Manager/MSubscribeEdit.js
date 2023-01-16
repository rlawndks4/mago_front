import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import MItemEditComponent from "../../components/MItemEditComponent"
import { objManagerEditContent } from "../../data/Manager/ManagerContentData";
import $ from 'jquery';
import axios from "axios";
import { returnMoment } from "../../functions/utils";
import { GiUfo } from "react-icons/gi";
const MSubscribeEdit = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {

    }, [])
    const editItemByParent = async () => {
        if (params.pk == 0) {
            addItem();
        } else {
            editItem();
        }
    }
    const addItem = async () => {
        let edit_obj = {
            user_id: $('.user_id').val(),
            academy_category_pk: $('.academy_category_pk').val(),
            price: $('.price').val(),
            type: $('.type').val(),
        };
        const { data: response } = await axios.post('/api/checkexistidbymanager', {
            id: edit_obj['user_id']
        })
        if(response?.data){
            delete edit_obj['user_id'];
            edit_obj['user_pk'] = response?.data?.pk;
        }else{
            alert("존재하지 않는 유저입니다.");
            return;
        }
        const { data: response2 } = await axios.get(`/api/item?table=academy_category&pk=${$('.academy_category_pk').val()}`);
        if(response2?.data){
            edit_obj['master_pk'] = response2?.data?.master_pk;
            edit_obj['end_date'] = response2?.data?.end_date;
            edit_obj['status'] = 1;
            edit_obj['order_num'] = `${(new Date).getTime()}${edit_obj['user_pk']}${edit_obj['academy_category_pk']}`;
            edit_obj['approval_num'] = `${(new Date).getTime()}${edit_obj['user_pk']}`;
            edit_obj['trade_date'] = returnMoment();
        }else{
            alert("존재하지 않는 유저입니다.");
            return;
        }
        if(window.confirm('저장하시겠습니까?')){
            edit_obj['table'] = 'subscribe';
            const {data:res} = await axios.post('/api/additem',edit_obj);
            if(res?.result>0){
                alert('성공적으로 저장되었습니다');
                navigate(-1);
            }else{
                alert(res?.message);
            }
        }
    }
    const editItem = async () => {

    }
    return (
        <>
            <MItemEditComponent schema={'subscribe'} params_pk={params.pk} editItemByParent={editItemByParent} />
        </>
    )
}
export default MSubscribeEdit;