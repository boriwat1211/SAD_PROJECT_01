import React, { Component } from 'react'
import {Link, Redirect, Route} from 'react-router-dom'
import {Label, Input} from '@rebass/forms'
import {Box,Button} from 'rebass'
import {Header,} from 'semantic-ui-react'
import fire from './Firebase/Firebase';
import { Helmet } from 'react-helmet';
export default class Login extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            email :"",
            password : "",
            check_data :"",
            reset_pass :false,
            err_reset:""
        }
        this.props.clearError()
    }
    handle_reset_pass = ()=>
    {
        if(this.state.email == "")
        {
            this.setState({err_reset:"Please enter email"})
        }
        else
        {
            this.forgotPassword()
        }
    }
    forgotPassword = () =>
    {
        fire.auth().sendPasswordResetEmail(this.state.email).then(function (user) {
            alert('Please check your email...')
          }).catch((err)=>
        {
            this.setState({err_reset:err.message})
        })
    }
    render(){
        if(this.props.Login_check)
        {
            return(
                <Route>
                    <Redirect to = "/home" />
                </Route>
            )
        }
        return (
            <div class="wrapper" onKeyPress = {(e)=>{
                if(e.key === "Enter")
                {
                    if(this.state.reset_pass)
                    {
                        this.handle_reset_pass()
                    }
                    else
                    {
                        this.props.logedIn(this.state.email,this.state.password)
                    }
                }
            }}>
                <Helmet>
                    <title>Login</title>
                </Helmet>
                <h1 className = "web_theme" style ={{top:"25%",position:"absolute",backgroundColor: 'transparent',color :"black",fontSize:50}}> Login</h1>
                <div class="container"> 
                    {this.state.reset_pass?(
                        <div>
                            <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}} for="uname"><b>Email</b></label>
                            <input className = "Input_home" type = "text" autoFocus placeholder="Enter Email" name="uname" required value  = {this.state.email} onChange = {(e)=>this.setState({email:e.target.value})}></input>
                            <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20,color:"red"}}>{this.state.err_reset}</label>
                        </div>
                    ):(
                        <div>
                            <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}} for="uname"><b>Email</b></label>
                            <input className = "Input_home" type = "text" autoFocus placeholder="Enter Email" name="uname" required value  = {this.state.email} onChange = {(e)=>this.setState({email:e.target.value})}></input>
                            <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20,color:"red"}}>{this.props.emailerror}</label>
                            
                            <div>
                            <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20}} for="uname"><b>Password</b></label>
                            <input
                            className = "Input_home"
                            input type="password" placeholder="Enter Password" name="psw" required value = {this.state.password}
                            onChange ={(e)=>this.setState({password:e.target.value})}></input>
                            <label className = "web_theme" style ={{backgroundColor: 'transparent',color :"black",fontSize:20,color:"red"}}>{this.props.passworderror}</label>
                            </div>
                        </div>
                    )}
                    {this.state.reset_pass?(
                     <div style ={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                        <button className = "Button_resetpass" onClick = {()=>this.setState({reset_pass:!this.state.reset_pass},()=>this.props.clearError())}>
                            Login
                        </button>
                        </div>
                    ):(
                        <div style ={{alignItems:"center",justifyContent:"center",display:"flex"}}>
                        <button className = "Button_resetpass" onClick = {()=>this.setState({reset_pass:!this.state.reset_pass},()=>this.props.clearError())}>
                            Resetpassword
                        </button>
                        </div>
                    )}
                    {this.state.reset_pass?(
                        <div>
                            <button className = "Button_confirm" style = {{width:"100%"}} onClick = {()=>this.handle_reset_pass()}>
                                Submit
                            </button>
                        </div>
                    ):(
                        <div class="centered">
                            {this.props.Login_check ? (
                                <Link to = "/home">
                                    <button  className = "Button_confirm" Click= {()=>this.props.logedIn(this.state.email,this.state.password)} 
                                    >login</button>
                                </Link>
                            ):(
                                    <button className = "Button_confirm" onClick= {()=>this.props.logedIn(this.state.email,this.state.password)}
                                    >login</button>
                                    )} 
                            <div class="centered">
                                <Link to = "/register">
                                    <button className = "Button_nomal" onClick = {()=>this.props.clearError()} bg = "white" 
                                    >register</button>
                                </Link>
                            </div>   
                        </div>
                    )}
                </div> 
            </div>
            
            
        )   
    }
}
