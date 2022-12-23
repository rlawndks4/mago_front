import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, his } from "react-router-dom";
import styled from "styled-components";
import { Title, Wrappers } from "../../components/elements/UserContentTemplete";
import ThemeCard from "../../components/ThemeCard";

const ThemeList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(posts.length==0){
            fetchPosts();
        }
    }, [])
    const fetchPosts = async () => {
        const { data: response } = await axios.get('/api/items?table=theme&status=1');
        setPosts(response.data)
    }
    return (
        <>
            <Wrappers>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {posts.map((item, idx) => (
                        <>
                            <ThemeCard item={item} category={'theme'} />
                        </>
                    ))}
                </div>

            </Wrappers>
        </>
    )
}
export default ThemeList;