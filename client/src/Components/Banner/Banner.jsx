import {Box,styled} from '@mui/material'

const Image = styled(Box)(({theme})=>({
    background:"url(banner2.png) center/100% repeat-x",
    backgroundColor:"#ffffff",
    width:"100%",
    height:"50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('md')]:{
        backgroundSize:"cover",
    }
}));

const Banner = ()=>{
    return (
        <Image></Image>
    )
}

export default Banner;