import {Box,styled} from '@mui/material'

const Image = styled(Box)`
background:url(banner2.png) center/100% repeat-x;
background-color:#ffffff;
width:100%;
height:50vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const Banner = ()=>{
    return (
        <Image></Image>
    )
}

export default Banner;