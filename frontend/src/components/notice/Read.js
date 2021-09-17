import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


class Read extends Component {
    state ={
        id:'',
        board:[],
    };

    loadingData = async() => {
        try {
            const {id} = this.props.match.params;
            console.log(id)
            const response = await axios.get(`http://localhost:4000/posts/${id}`);
            this.setState({
                board:response.data,
            });
            console.log(response.data);
        } catch(e) {
            console.log(e);
        }
    };
    componentDidMount() { 
        const { loadingData } = this; 
        loadingData(); 
    }
    
    deleteRow(id, e){  
        axios.delete(`http://localhost:4000/posts/${id}`)  
          .then(res => {  
            console.log(res);  
            console.log(res.data);  
          })  
        
      }  

    render() {
        const {board} = this.state;
        return (
            <Wrap>
                <h2>{board.title}</h2>
                <p>{board.content}</p>
                <Button>
                    <Link to="/notice">목록</Link>
                    <Link to="/notice" onClick={(e) => {this.deleteRow(board.id, e); alert("삭제되었습니다.");} }>삭제</Link>
                    <Link to="/notice" onClick={(e) => {this.deleteRow(board.id, e); alert("수정되었습니다.")} }>수정</Link>
                </Button>
            </Wrap>
        );
    }
}


const Wrap = styled.div`
    padding:20px;
    h2 {
        padding-bottom:20px;
        border-bottom:1px solid #ccc;
    }
    p {
        min-height: 200px;
    }
`;

const Button = styled.div`
    border-top: 1px solid #eee;
    padding:20px;
    a{
        float:right;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration:none;
        border: 1px solid #ddd;
        font-size:16px,
        color:#424242;
    }
    a + a{
        margin-right: 5px;
    }
}`;

export default Read;