import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import AddButton from "../../components/elements/button/AddButton";
import { Input, Row, Select } from "../../components/elements/ManagerTemplete";
import { objManagerListContent } from "../../data/Manager/ManagerContentData";
import $ from 'jquery';
import { excelDownload } from "../../functions/utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SiMicrosoftexcel } from "react-icons/si";

const OptionCardWrappers = styled.div`
width:95%;
margin:0.5rem auto;
border-spacing: 0 10px;
min-width:700px;
box-shadow:1px 1px 1px #00000029;
font-size:14px;
background:#fff;
color:${props => props.theme.color.manager.font2};
`
const SearchContainer = styled.div`
display: flex; 
align-items: center;
margin-left: auto;
@media screen and (max-width:700px) {
    margin-left: 0;
}
`
const returnOptionContentBySchema = (schema, onChangeType) => {
    if (schema == 'user') {
        return (
            <>
                <div style={{ margin: '20px 0px 12px 24px' }}>프라이더 여부</div>
                <Select className='prider' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                    <option value={'all'}>전체</option>
                    <option value={0}>없음</option>
                    <option value={1}>그린리더</option>
                    <option value={2}>프라이더</option>
                    <option value={3}>로얄프라이더</option>
                </Select>
                <div style={{ margin: '20px 0px 12px 24px' }}>티어별</div>
                <Select className='tier' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                    <option value={'all'}>전체</option>
                    <option value={0}>일반회원</option>
                    <option value={5}>화이트</option>
                    <option value={10}>그린</option>
                    <option value={15}>실버</option>
                    <option value={20}>골드</option>
                    <option value={25}>플레티넘</option>
                </Select>
            </>
        )
    }
}
const OptionBox = (props) => {
    const params = useParams();
    const { onChangeType, schema, changePage, onchangeSelectPageCut, apiStr } = props;

    const exportExcel = async () => {
        let obj = {};
        obj['table'] = objManagerListContent[schema].schema;
        obj['keyword'] = $('.search').val();
        if (objManagerListContent[schema].is_move) {
            obj['order'] = 'sort';
        }
        for (var i = 0; i < objManagerListContent[schema].queries.length; i++) {
            if (objManagerListContent[schema].queries[i].split("=")[1]) {
                obj[objManagerListContent[schema].queries[i].split("=")[0]] = objManagerListContent[schema].queries[i].split("=")[1];
            } else {
                if ($(`.${objManagerListContent[schema].queries[i].split("=")[0]}`).val() != 'all') {
                    obj[objManagerListContent[schema].queries[i].split("=")[0]] = $(`.${objManagerListContent[schema].queries[i].split("=")[0]}`).val();
                }
            }
        }
        const { data: response } = await axios.post(apiStr, obj);
        //setPosts(response?.data);
        await excelDownload(response.data ?? [], objManagerListContent, schema);
    }

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <OptionCardWrappers>
                    <Row>
                        {returnOptionContentBySchema(schema, onChangeType)}
                        <SearchContainer>
                            <Input style={{ margin: '12px 0 12px 24px', border: 'none' }} className='search' placeholder='두 글자 이상 입력해주세요.' onKeyPress={(e) => { e.key == 'Enter' ? changePage(1) : console.log("") }} />
                            <AiOutlineSearch className='search-button' style={{ padding: '14px', cursor: 'pointer' }} onClick={() => changePage(1)} />
                        </SearchContainer>
                        <Select className='page-cut' style={{ margin: '12px 24px 12px 24px' }} onChange={onchangeSelectPageCut}>
                            <option value={10}>10개</option>
                            <option value={20}>20개</option>
                            <option value={50}>50개</option>
                            <option value={100}>100개</option>
                        </Select>

                        <AddButton style={{ margin: '12px 24px 12px 24px', width: '96px', alignItems: 'center', display: 'flex', justifyContent: 'space-around' }} onClick={exportExcel}><SiMicrosoftexcel /> 액셀추출</AddButton>

                    </Row>

                </OptionCardWrappers>
            </div>
        </>
    )
}
export default OptionBox;