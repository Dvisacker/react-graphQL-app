import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
//react-apollo is the glue between between the server data and the client
//component is rendered two times : 
// - one time without data
// - one time when the data comes back from the server
class SongList extends Component {

    onSongDelete(id) {
        event.preventDefault();

        this.props.mutate({
            variables: { id: id },
        }).then(() => this.props.data.refetch());

    }

    renderSongs() {
        return this.props.data.songs.map(song => {
            return (
                <li key = {song.id} className="collection-item">
                <Link to={`/songs/${song.id}`}>{song.title}</Link>
                <i className="material-icons" 
                   onClick={()=> this.onSongDelete(song.id)}>delete</i>
                </li>
            );
        });
    }

    render() {

        if (this.props.data.loading) { return <div>Loading...</div>}

        console.log(this.props);
        return (
            <div>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link to="/songs/new" className="btn-floating btn-large red right"><i className="material-icons">add</i></Link>
            </div>
            
        );
    }
}

const deleteMutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;


export default graphql(deleteMutation)(
    graphql(query)(SongList)
);
//make a helper graphql(deleteMutation) and immediately invoke it
//with graphql(query)(SongList)

//graphql creates a data object in the response
//so the response is going to be in the form data->songs