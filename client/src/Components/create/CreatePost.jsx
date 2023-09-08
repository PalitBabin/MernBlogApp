import { Box,Button,FormControl,InputBase,TextareaAutosize,styled } from "@mui/material";
import {AddCircle as Add }from '@mui/icons-material';
import { useState,useEffect,useContext } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import {API} from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));
const Image = styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover',
    borderRadius:'10px'
});
const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;
const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const PublishButton = styled(Button)`
background-color:#64CCC5;
&:hover{
    background-color:teal;
}
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}
const CreatePost = ()=>{


    const [post,setPost] =useState(initialPost);
    const [file,setFile] =useState('');

    const location = useLocation();
    const {account} = useContext(DataContext);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }

    const setImage = (e)=>{
        setFile(e.target.files[0]);
    }

    const savePost =async()=>{
       const response = await API.createPost(post);
       if(response.isSuccess){
        navigate("/");
       }
    }
    const url = post.picture ? post.picture :'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                 data.append("name", file.name);
                 data.append("file", file);
                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    return (
        <Container>
            <Image src={url} alt="postbanner" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add />
                </label>
                <input
                 type="file"
                id="fileInput"
                style={{display:"none"}}
                onChange={(e)=>setImage(e)}
                />
                <InputTextField placeholder="Title" onChange={(e)=>handleChange(e)} name="title"/>
                <PublishButton variant="contained" onClick={()=>savePost()}>Publish</PublishButton>
            </StyledFormControl>
            <Textarea 
            minRows={5}
            placeholder="Tell Your Story....."
            onChange={(e)=>handleChange(e)}
             name="description"
            />
        </Container>
    )
}

export default CreatePost;