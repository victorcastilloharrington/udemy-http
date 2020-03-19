import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        single: null
    }

    componentDidUpdate(){
        if (this.props.id){
            if(!this.state.single || (this.state.single && this.state.single.id !== this.props.id)){
                axios.get('/posts/'+this.props.id)
                .then(res => {
                    console.log(res.data)
                    this.setState({single: res.data})

                })
            }
            
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/'+this.props.id)
        .then(res => {
            console.log(res);
        })
    }

    render () {
        
        let post = <p>Please select a Post!</p>;

        if (this.props.id){
            post = <p>Loading...</p>
        }
        if (this.state.single){
            post = (
                <div className="FullPost">
                    <h1>{this.state.single.title}</h1>
                    <p>{this.state.single.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;