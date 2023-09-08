import { Button, Table, TableBody, TableCell, TableHead, TableRow,styled} from "@mui/material";
import { categories } from "../../constants/data";
import { Link,useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;
const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #64CCC5;
    color: #fff;
    text-decoration: none;
    &:hover{
        background-color:teal;
    }
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const HoveredRow = styled(TableRow)`
&:hover{
    background-color:teal;
    transition: width 0.3s ease;
}
`;


const Categories = ()=>{
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    return (
        <>
        <StyledLink to={`/create?category=${category || ''}`}>
        <StyledButton variant="contained">Create Blog</StyledButton>
        </StyledLink>
        <StyledTable>
            <TableHead>
                <HoveredRow>
                    <TableCell>
                        <StyledLink to="/">
                        All Categories
                        </StyledLink>
                    </TableCell>
                </HoveredRow> 
            </TableHead>
            <TableBody>
                
                    {categories.map(category=>
                    <HoveredRow  key={category.id}>
                        <TableCell>
                            <StyledLink to={`/?category=${category.type}`}>
                            {category.type}
                            </StyledLink>
                            </TableCell>
                        </HoveredRow>
                        )}
            </TableBody>
        </StyledTable>
        </>
    )
}

export default Categories;