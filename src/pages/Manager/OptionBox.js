import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import AddButton from "../../components/elements/button/AddButton";
import { Input, Row, Select } from "../../components/elements/ManagerTemplete";
import { objManagerListContent } from "../../data/Manager/ManagerContentData";
import $ from 'jquery';
import { excelDownload, returnMoment } from "../../functions/utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SiMicrosoftexcel } from "react-icons/si";
import { useEffect } from "react";
import { useState } from "react";

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
const ReturnOptionContentBySchema = (props) => {
    const { schema, onChangeType } = props;
    const [list, setList] = useState({});
    useEffect(() => {
        fetchPost();
    }, [schema])
    async function fetchPost() {
        let list_ = { ...list };
        if (schema == 'subscribe' || schema == 'bag') {
            list_ = {
                master: [],
                academy_category: []
            }
            const { data: response } = await axios.get(`/api/items?table=user&level=30`);
            list_['master'] = response?.data.map((item) => {
                return {
                    title: item?.nickname,
                    val: item?.pk
                }
            });
            const { data: response2 } = await axios.get(`/api/items?table=academy_category`);
            list_['academy_category'] = response2?.data.map((item) => {
                return {
                    title: item?.title.substring(0, 10),
                    val: item?.pk
                }
            });
            setList(list_);
        }
    }
    if (schema == 'user') {
        return (
            <>
            </>
        )
    }
    if (schema == 'subscribe' || schema == 'bag') {

        return (
            <>
                <Select className='master_pk' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                    <option value={'all'}>전체강사</option>
                    {list?.master && list?.master.map((item) => (
                        <>
                            <option value={item?.val}>{item?.title}</option>
                        </>
                    ))}
                </Select>
                <Select className='academy_category_pk' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                    <option value={'all'}>전체강의</option>
                    {list?.academy_category && list?.academy_category.map((item) => (
                        <>
                            <option value={item?.val}>{item?.title}</option>
                        </>
                    ))}
                </Select>
            </>
        )
    }
}
const ReturnSecondOptionContentBySchema = (props) => {
    const { schema, onChangeType } = props;
    const [list, setList] = useState({});
    const month_list = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const [statisticsType, setStatisticsType] = useState('month');
    const [yearList, setYearList] = useState([])
    useEffect(() => {
        settingOptionCard();
    }, [])
    const settingOptionCard = () => {
        let year = parseInt(returnMoment().substring(0, 4));
        let year_list = [];
        for (var i = 0; i < 10; i++) {
            if (year - i >= 2022) {
                year_list.push(year - i);
            }
        }
        setYearList(year_list)
    }
    if (schema == 'subscribe') {
        return (
            <>
                <OptionCardWrappers>
                    <Row>
                        <Select className='statistics_type' style={{ margin: '12px 24px 12px 24px' }} onChange={(e)=>{setStatisticsType(e.target.value);onChangeType();}}>
                            <option value={'month'}>월별 요약</option>
                            <option value={'day'}>일차별 요약</option>
                        </Select>
                        <Select className='year' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                            {yearList.map((item, index) => (
                                <>
                                    <option value={item}>{`${item}년`}</option>
                                </>
                            ))}
                        </Select>
                        {statisticsType == 'day' ?
                            <>
                                <Select className='month' style={{ margin: '12px 24px 12px 24px' }} onChange={onChangeType}>
                                    {month_list.map((item) => (
                                        <>
                                            {`${$('.year').val()}-${item < 10 ? '0' + item : item}` <= returnMoment().substring(0, 7) ?
                                                <>
                                                    <option value={item}>{`${item}월`}</option>
                                                </>
                                                :
                                                <>
                                                </>
                                            }
                                        </>
                                    ))}
                                </Select>
                            </>
                            :
                            <>
                            </>
                        }
                    </Row>
                </OptionCardWrappers>
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
                        <ReturnOptionContentBySchema schema={schema} onChangeType={onChangeType} />
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
                {/* <ReturnSecondOptionContentBySchema schema={schema} onChangeType={onChangeType} /> */}
            </div>
        </>
    )
}
export default OptionBox;