
import {Box,Typography,styled} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {useParams,Link,useNavigate} from 'react-router-dom';
import { useEffect,useState,useContext} from 'react';
import {API} from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comment/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
    word-break:break-word;
`;

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const Description = styled(Typography)`
word-break:break-word;
`;


const DetailView = ()=>{
    const [post, setPost] = useState({});
    const {id} = useParams();

   
    const {account} = useContext(DataContext);

    const navigate = useNavigate();

    const url =post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    useEffect(()=>{

        const fetchData = async()=>{
            const response = await API.getPostById(id)
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const deleteBlog = async()=>{
        const response = await API.deletePost(post._id);
        if(response.isSuccess){
            navigate("/");
        }
    }
  
    return (
        <Container> 
            <Image src={url} alt='blogpost image' />
            <Box style={{ float: 'right' }}>
                {
                account.username === post.username &&
                <>
                <Link to={`/update/${post._id}`}><EditIcon color='primary'/></Link>
                <DeleteIcon color='error' onClick={()=>deleteBlog()} />
                </>
                
                }
            
            </Box>
            <Heading>{post.title}</Heading>
            <Author>
                <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                <Typography  style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
            <Description>{post.description}</Description>
                <Comments post={post}/>
        </Container>
    )
}

export default DetailView;