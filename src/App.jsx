import { useQuery } from "@tanstack/react-query";
import {useState} from 'react';
import { getPosts } from "./service";
import styled from "styled-components";


const Container = styled.div
  `display:flex;
flext-direction:column;
align-items:center;
marigin-top:50px;`

const Title = styled.h1
  `
font-size:36px;
font-weight:bold;
margin-bottom:20px;
`
const List = styled.ul
  `
list-style:none;
padding:0;
marigin:0;
`
const ListItem = styled.ul
  `
background-color:#f5f5f5;
border-radius:5px;
box-shadow:0 2px 5px rgba(0,0,0,0.1);
padding:10px;
margin-bottom:10px;
`

function App() {

  const [selectedPost,setSelectedPost]=useState('')


  const { isLoading, error, data } = useQuery({
    queryKey: ["posts",selectedPost],
    queryFn: getPosts,
  })

  if (isLoading)
    return <p>...Loading data</p>

  if (error) {
    return <p>Error in Fetching data :{error.message}</p>
  }

  return (
    <Container>
      <Title>list of Post React Query</Title>
      <List>
        {
          data.map((item) => (
            <ListItem key={item.id} onClick={()=>setSelectedPost(item.id)}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </ListItem>
          ))
        }
      </List>
    </Container>
  )
}

export default App
