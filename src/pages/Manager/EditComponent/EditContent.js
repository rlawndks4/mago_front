import { Col, Row, Title } from "../../../components/elements/ManagerTemplete";
import { objManagerEditContent } from "../../../data/Manager/ManagerContentData";
import EditInput from "./EditInput";

const EditContent = (props) => {
    const { schema } = props;
    return (
        <>
            {objManagerEditContent[`${schema}`].map((cols, index) => (
                <>
                    <Row>
                        {cols.map((item, idx) => (
                            <>
                                <Col>
                                    <Title>{item.title}</Title>
                                    {item.type == 'input' ?
                                        <>
                                        </>
                                        :
                                        <>
                                        </>}
                                    {item.type == 'select' ?
                                        <>
                                        </>
                                        :
                                        <>
                                        </>}
                                    {item.type == 'img' ?
                                        <>
                                        </>
                                        :
                                        <>
                                        </>}
                                    {item.type == 'editor' ?
                                        <>
                                        </>
                                        :
                                        <>
                                        </>}
                                    {item.type == 'textarea' ?
                                        <>
                                        </>
                                        :
                                        <>
                                        </>}
                                </Col>
                            </>
                        ))}
                    </Row>
                </>
            ))}
        </>
    )
}
export default EditContent;