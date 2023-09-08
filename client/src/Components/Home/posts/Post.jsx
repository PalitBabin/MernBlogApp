import { Box,Typography,styled } from "@mui/material";
import PropTypes from 'prop-types';
import { addElipses } from "../../utils/common-utils";
const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    text-align:center;
`;
const Post  = ({post})=>{
        const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    return (
        <Container>
            <Image src={url} alt='post image'/>
            <Text>{post.categories}</Text>
            <Heading>{addElipses(post.title,20)}</Heading>
            <Text>{post.username}</Text>
            <Details>{addElipses(post.description,100)}</Details>
        </Container>
    )
}

Post.propTypes = {
    post:PropTypes.object
}
export default Post;