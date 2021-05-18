import React, { Component } from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet';
export default class Register extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            email:"",
            password:"",
            surname:"",
            name:"",
            phone:"",
            address:"",
            passwordcheck:true,
            errpass:""
        }
    }
    render() {
        if(this.props.Login_check)
        {
            return(
                <Route>
                    <Redirect to = "/home"/>
                </Route>
            )
        }
        else
        {
            return (
                < div class="wrapperregis">
                    <Helmet>
                        <title>Register</title>
                    </Helmet>
                    <h1 className = "web_theme" style ={{top:"0%",position:"absolute",backgroundColor: 'transparent',color :"black",fontSize:50}}> Register</h1>
                    <div class="containerregis">
                    <div>
                        <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}}>Email : </label>
                        <input
                            className = "Input_home"
                            autoFocus
                            type = "text"
                            required
                            value = {this.state.email}
                            onChange = {(e)=>this.setState({email:e.target.value})}>
                        </input>
                    </div>
                    <div>
                        <lable className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}}>Password : </lable>
                        <input
                            className = "Input_home"
                            type = {this.state.passwordcheck?"password":"text"}
                            required
                            value = {this.state.password}
                            onChange = {(e)=>this.setState({password:e.target.value})}
                        >
                        </input>
                        <button className = "Button_nomal" style = {{width:"100%"}} onMouseOver = {()=>this.setState({passwordcheck:false})}
                            onMouseLeave = {()=>this.setState({passwordcheck:true})}>
                            Check
                        </button>
                    </div>
                    <div>
                        <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}}>First Name : </label>
                        <input type = "text"
                        className = "Input_home"
                        required
                        value ={this.state.name}
                        onChange ={(e)=>this.setState({name:e.target.value})}></input>
                    </div>
                    <div>
                        <lable className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}}>Surname : </lable>
                        <input type = "text"
                        className = "Input_home"
                        required
                        value ={this.state.surname}
                        onChange ={(e)=>this.setState({surname:e.target.value})}></input>
                    </div>
                    <div>
                        <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}}>Phone Number : </label>
                        <input type = "text"
                        className = "Input_home"
                        required
                        value ={this.state.phone}
                        onChange ={(e)=>this.setState({phone:e.target.value})}></input>
                    </div>
                    <div>
                        <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}}>Address : </label>
                        <input type = "text"
                        className = "Input_home"
                        required
                        value ={this.state.address}
                        onChange ={(e)=>this.setState({address:e.target.value})}></input>
                    </div>
                    <div style = {{textAlign:"center"}}>
                        <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"red",fontSize:20}}>
                            {this.props.inputerr+" "+this.props.emailerr+" "+this.props.passworderr}
                        </label>
                    </div>
                    <div>
                        <button className = "Button_confirm" onClick = {()=>this.props.signUp(this.state)} style = {{width:"100%"}}>Sign up</button>
                    </div>
                </div>
                </div>
            )
        }
    }
}