import React, { Component } from 'react';
import gql from 'graphql-tag'; //what allows us to write queries directly into our code
import { graphql } from 'react-apollo'; //helper that sandwitches our component

class LyricCreate extends Component {


    constructor(props) {
        super(props);

        this.state = { content: '' }
        
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        }).then(() => this.setState({ content: ''})); 
    }
        
    

    onChange(event) {
        this.setState({ content: event.target.value})
     }
    
    
    render() {
        return (
            <div>
                <form onSubmit = {this.onSubmit.bind(this)} >
                    <label>Add a Lyric</label>
                    <input type="text"
                    value={this.state.content} onChange={this.onChange.bind(this)} />
                </form>
            </div>
        );
    }
}

const mutation = gql`
mutation AddLyricToSong($content: String, $songId: ID) {
  addLyricToSong(content: $content, songId: $songId) {
    id
    lyrics {
        id
        content
        likes
    }
  }
}`;

export default graphql(mutation)(LyricCreate);
//we get access to this.props.mutate