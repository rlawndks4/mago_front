import { useEffect } from "react";
import { Wrappers } from "../../../components/elements/UserContentTemplete";
import {
    Allat_Mobile_Approval,
    Allat_Mobile_ApprovalNewPlus,
    Allat_Mobile_Close,
    Allat_Mobile_Cancel,
    Allat_Mobile_Fix,
    Allat_Mobile_Hp_Fix
} from '../../../js/AllatPayM.js'
import $ from 'jquery';
const KeyRecieve = () => {
    function approval_submit(result_cd, result_msg, enc_data) {
        Allat_Mobile_Close();
        if (result_cd != '0000') {
            result_msg.CharsSet = "euc-kr";
            alert(result_cd + " : " + result_msg);
        }
        else {
            let sendFm = $('#sendFm')[0];
            sendFm.allat_enc_data.value = enc_data;
            sendFm.action = "allat_approval.php";
            sendFm.method = "post";
            sendFm.target = "_self";
            sendFm.submit();
            
        }
    }
    useEffect(() => {
        approval_submit();
    }, [])
    return (
        <>
            <Wrappers>
                test
            </Wrappers>
        </>
    )
}
export default KeyRecieve;