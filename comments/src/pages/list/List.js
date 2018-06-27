import React, { Component } from 'react';
import { Link } from 'react-router'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lists: [],
            comments: []
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/repos/facebook/react/pulls?access_token=e4ed75825d2ad3ffbe2bc88e403b6ed9dcdc62e0")
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result)
                var list = result.map((results) =>
                    // <li key={results.number}>{list.title}
                    // <p align="right">{list.user.login} </p>
                    // </li>
                    fetch("https://api.github.com/repos/facebook/react/pulls/" + results.number + "?access_token=e4ed75825d2ad3ffbe2bc88e403b6ed9dcdc62e0")
                        .then(commentRes => commentRes.json())
                        .then(
                        (commentResult) => {
                            results.commentCounts = commentResult.comments + commentResult.review_comments;
                            this.forceUpdate();
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                        )
                )
                console.log(list);
                this.setState({
                    isLoaded: true,
                    lists: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            )
    }
    render() {
        var lists = [];
        var display;
        var comments = this.props.comments;
        if (this.state.list != []) {
            lists = this.state.lists
            lists = lists.sort(function (a, b) {
                return b.commentCounts - a.commentCounts;
            })
            lists = lists.map((list) =>
                <li key={list.number}>

                    <Link to={{ pathname: '/comments', state: { number: list.number } }}>
                        {list.title}
                    </ Link>
                    <br />{list.commentCounts} Comments
                    <div align="right">{list.user.login} </div>
                </li>
            )
        }
        if (comments != null) {
            display = comments;
        }
        else {
            display = lists;
        }
        return (
            <div>
                {display}
            </div>
        );
    }
}

export default List;