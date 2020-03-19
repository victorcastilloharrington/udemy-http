import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {
    state = {
        posts: [],
        single : null,
        error: false
    }

    componentDidMount(){
        axios.get('/posts')
        .then(res => {
                const posts = res.data.slice(0,4)
                const updatedPosts = posts.map(post => (
                    {
                        ...post,
                        author: 'Victor'
                    }
                ))
                this.setState({posts: updatedPosts})
                // this.setState({posts: res.data})
                // console.log(posts)
            }
        )
        .catch(err => {
            // console.log(err);
            this.setState({error: true});
        })
    }

    singlePostHandler = (id) => {
        // axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
        // .then(res => {
        //     console.log(res.data)
        //     this.setState({single: res.data})

        // })
        console.log(id)
        this.setState({single: id})
    }

    render () {
        
        let posts  =this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author} clicked={() => this.singlePostHandler(post.id)}>{post.body}</Post>
        })

        if(this.state.error){
            posts = <p>Something went wrong</p>;
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                <FullPost id={this.state.single}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;