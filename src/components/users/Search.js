import React, { Component } from 'react'

class Search extends Component {
    state ={
        text:''
    }
    onChangeText = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.text === ''){
           this.props.setAlert('Please Enter Something','light')
        } else {
            this.props.searchUsers(this.state.text)
            this.setState({
                text: ''
            })
        }
    }
    render() {
        const {text} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" 
                    placeholder="Search Users" value={text} onChange={this.onChangeText}/>
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {this.props.showClear &&(
                    <button className="btn btn-light btn-block" onClick={this.props.clearUser}>Clear</button>
                )}
                
            </div>
        )
    }
}

export default Search
