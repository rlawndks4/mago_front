import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import MItemEditComponent from "../../components/MItemEditComponent"

const MAcademyEdit = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(location.state){
        }else{
            if(params.pk==0){
                alert("잘못된 접근입니다.");
                navigate(-1);
            }else{
                
            }
           
        }
    },[])
    return (
        <>
            <MItemEditComponent schema={'academy'} params_pk={params.pk} 
            add_list={[
                {key:'category_pk',value:location.state?.category_pk},
                {key:'master_pk',value:location.state?.master_pk},
                ]} />
            
        </>
    )
}
export default MAcademyEdit;