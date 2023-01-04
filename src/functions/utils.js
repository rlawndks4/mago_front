import axios from 'axios';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { returnColumn } from '../common/manager/ColumnType';

// 웹뷰에서 RN으로 데이터를 보낼때 사용합니다.
export function sendToRN(num) {
    if (window.ReactNativeWebView) {
        // RN에서 데이터는 반드시 문자열로 받을 수 있기 때문에 
        // JSON.stringify를 사용합니다.
        window.ReactNativeWebView.postMessage(
            JSON.stringify({ data: num })
        );
    } else {
        // -- 
    }
};
export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
export function range(start, end) {
    let array = [];
    for (let i = start; i <= end; ++i) {
        array.push(i);
    }
    return array;
}
export const addItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/add${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const updateItem = async (type, obj) => {
    const { data: response } = await axios.post(`/api/update${type}`, obj)
    alert(response.message);
    if (response.result > 0) {
        window.history.back();
    }
}
export const deleteItem = async (type, obj) => {

}
export const commarNumber = (num) => {
    let str = "";
    if (typeof num == "number") {
        str = num.toString();
    } else {
        str = num;
    }
    let result = "";
    let count = 0;
    for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) result = "," + result;
        result = str[i] + result;
        count++;
    }
    return result;
}
export const formatPhoneNumber = (input) => {
    const cleanInput = String(input).replaceAll(/[^0-9]/g, "");
    let result = "";
    const length = cleanInput.length;
    if (length === 8) {
        result = cleanInput.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (cleanInput.startsWith("02") && (length === 9 || length === 10)) {
        result = cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
    } else if (!cleanInput.startsWith("02") && (length === 10 || length === 11)) {
        result = cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
    } else {
        result = undefined;
    }
    return result;
}
export const returnMoment = (num, type) => {//num 0: 오늘, num -1: 어제 ,  type=date 날짜만, type=moment 시간까지 다 나오게
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;
    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);
    var timeString = hours + ':' + minutes + ':' + seconds;
    let moment = dateString + ' ' + timeString;
    return moment;
}
export const getIframeLinkByLink = (str) => {
    let ans = "";
    for (var i = 0; i < str.length; i++) {
        if (str[i] == 'v' && str[i + 1] == '=') {
            for (var j = i + 2; j < str.length; j++) {
                if (str[j] == '&') break;
                ans += str[j];
            }
        }
    }

    return ans;
}
export const categoryToNumber = (str) => {
    if (str == 'event') {
        return 0;
    } else if (str == 'academy') {
        return 1;
    } else if (str == 'notice') {
        return 2;
    } else {
        return -1;
    }
}
export const numberToCategory = (num) => {
    if (num == 0) {
        return { schema: 'event', name: '이벤트' };
    } else if (num == 1) {
        return { schema: 'academy', name: '강의' };
    } else if (num == 2) {
        return { schema: 'notice', name: '공지사항' };
    } else {
        return { schema: '---', name: '---' };
    }
}

export const regExp = (type, str) => {//id,pw,nickname,name
    let reg = undefined;
    if (type == 'id') {
        reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,12}$/;
    } else if (type == 'pw') {
        reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`!@#$%^&*()_+-=,./;'<>?:"])[A-Za-z\d~`!@#$%^&*()_+-=,./;'<>?:"]{8,15}$/;
    } else if (type == 'name') {
        reg = /^[가-힣]{2,5}$/;
    } else if (type == 'nickname') {
        reg = /^[가-힣|a-z|A-Z|0-9|]{2,8}$/;
    } else {
        return false;
    }
    return reg.test(str)
}
export const getViewerMarginByNumber = (num) => {
    if (num == 0) {
        return " 0 auto ";
    } else if (num == 1) {
        return " 0 auto 0 0 ";
    } else if (num == 2) {
        return " 0 0 0 auto ";
    } else {
        return " 0 auto ";
    }
}
export const getViewerAlignByNumber = (num) => {
    if (num == 0) {
        return "center";
    } else if (num == 1) {
        return "left";

    } else if (num == 2) {
        return "end";
    } else {
        return "center";
    }
}
export const excelDownload = async (excelData, objManagerListContent, schema) => {
    const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const excelFileExtension = '.xlsx';
    const excelFileName = schema;
    let ignore_name_list = ['맨위로', '수정', '삭제', '관리'];
    let name_list = [];
    let column_list = [];
    for (var i = 0; i < objManagerListContent[schema].zColumn.length; i++) {
        if (!ignore_name_list.includes(objManagerListContent[schema].zColumn[i].name)) {
            name_list.push(objManagerListContent[schema].zColumn[i].name)
            column_list.push(objManagerListContent[schema].zColumn[i])
        }
    }
    const ws = XLSX.utils.aoa_to_sheet([
        ['daogo - 다오고']
        , []
        , name_list
    ]);

    let result = [...excelData];
    let excel_list = [];
    for (var i = 0; i < result.length; i++) {
        excel_list[i] = [];
        for (var j = 0; j < column_list.length; j++) {
            let data = await returnColumn(result[i], column_list[j]?.type, column_list[j]?.column, objManagerListContent[schema].schema);;
            await excel_list[i].push(data);
        }
    }
    await excel_list.map(async (data, idx) => {
        XLSX.utils.sheet_add_aoa(
            ws,
            [
                data
            ],
            { origin: -1 }
        );
        ws['!cols'] = [
            { wpx: 50 },
            { wpx: 50 }
        ]
        return false;
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelButter], { type: excelFileType });
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
}
export const dateFormat = (date, is_minus) => {//두날짜의 시간차
    if (!date) {
        return "---";
    }
    let f_d = new Date(returnMoment()).getTime();
    let s_d = new Date(date).getTime();
    let hour = (f_d - s_d) / (1000 * 3600);
    let minute = (f_d - s_d) / (1000 * 60);
    let day = (f_d - s_d) / (1000 * 3600 * 24);
    if (minute <= 1) {
        return "방금 전";
    } else if (hour < 1) {
        if (is_minus) {
            return `${parseInt(minute)}분`;
        } else {
            return `${parseInt(minute)}분 전`;
        }
    } else if (hour < 24) {
        if (is_minus) {
            return `${parseInt(hour)}시간`;
        } else {
            return `${parseInt(hour)}시간 전`;
        }
    } else if (day < 7) {
        if (is_minus) {
            return `${parseInt(day)} Days`;
        } else {
            return `${parseInt(day)}일 전`;
        }
    } else {
        if (is_minus) {
            return `${parseInt(day)} Days`;
        } else {
            return date.substring(0, 10);
        }
    }
}