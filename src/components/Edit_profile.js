import React, { Component } from 'react'
import {Link, Redirect, Route} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Result, Select } from 'antd';
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { Composition, Only ,Box } from 'atomic-layout'
import { Text, Image, Button, Card } from '../../src/components/Menu_components'
import { BsFillPersonFill,BsFillHouseFill,BsFillTrashFill,BsFillBagFill } from "react-icons/bs";
import { ButtonGroup } from 'react-bootstrap';
import Background from './images/ellieelien-04yMqTmUeHQ-unsplash.jpg'
import SubMenu from 'antd/lib/menu/SubMenu';
import { IconGroup } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
export default class Edit_profile extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            E_name:"",
            E_surname:"",
            E_phone:"",
            E_address:""
        }
    }
    render() {
        let { Header, Content, Sider } = Layout
        return (
            <div style = {{backgroundImage:`url(${Background})`,width:"100%",height:"100%"}}>
                    <Helmet>
                        <title>Edit Profile</title>
                    </Helmet>
                    <Layout>
                        <Header className = "web_theme" style ={{position:"fixed",height:"15vh",width:"100vw"}}>
                            <div>
                                <h1 className = "web_theme" style = {{fontSize:"40px"}}>Edit Profile</h1>
                            </div>
                            <div style = {{position:"absolute",right:"3%",top:"0%"}}>
                                <h1 className = "web_theme" style = {{fontSize:"30px"}}><BsFillPersonFill/> {this.props.name+" "+this.props.surname}</h1>
                            </div>
                            <Route>
                                <ButtonGroup style = {{position:"absolute",right:"3%",top:"35%"}}>
                                    <Link to = "/home">
                                        <button className = "Button_nomal"><BsFillHouseFill/>Home</button>
                                    </Link>
                                    <Link to ="/order">
                                        <button className = "Button_nomal">Order</button>
                                    </Link>
                                    <Link to = '/home'>
                                        <button className = "Button_nomal" onClick = {()=>this.props.logedOut()}>Log Out</button>
                                    </Link>  
                                </ButtonGroup>
                            </Route>
                        </Header>
                        <Layout>
                            <Content style = {{paddingTop:'5%',paddingLeft:"20%",paddingRight:"20%",backgroundColor:"transparent",position :"absolute",width:"100vw",top:"15vh",height:"85vh",overflow:"auto",scrollbars:""}}>  
                            <div className = "web_theme" style = {{backgroundColor:"transparent",textAlign:"left"}}>
                                <div>
                                    <label style = {{color:"black",fontSize:30}}>Name :</label>
                                    <input
                                            className = "Input_home"
                                            style = {{color:"black",fontSize:20}}
                                            placeholder={this.props.name}
                                            type = "text"
                                            autoFocus
                                            required
                                            value = {this.state.E_name}
                                            onChange = {(e)=>this.setState({E_name:e.target.value})}
                                    ></input>
                                </div>
                                <div>
                                    <label style = {{color:"black",fontSize:30}} >Surname :</label>
                                    <input
                                            className = "Input_home"
                                            placeholder={this.props.surname}
                                            style = {{color:"black",fontSize:20}}
                                            type = "text"
                                            required
                                            value = {this.state.E_surname}
                                            onChange = {(e)=>this.setState({E_surname:e.target.value})}
                                    ></input>
                                </div>
                                <div>
                                    <label style = {{color:"black",fontSize:30}}>Phone : </label>
                                    <input
                                            className = "Input_home"
                                            placeholder={this.props.phone}
                                            style = {{color:"black",fontSize:20}}
                                            type = "text"
                                            required
                                            value = {this.state.E_phone}
                                            onChange = {(e)=>this.setState({E_phone:e.target.value})}
                                    ></input>
                                </div>
                                <div>
                                    <label style = {{color:"black",fontSize:30}} >Address : </label>
                                    <input
                                            className = "Input_home"
                                            placeholder={this.props.address}
                                            style = {{color:"black",fontSize:20}}
                                            type = "text"
                                            required
                                            value = {this.state.E_address}
                                            onChange = {(e)=>this.setState({E_address:e.target.value})}
                                    ></input>
                                </div>
                                <div>
                                    <Route>
                                        <Link to = "/home">
                                        <button className = "Button_confirm" style = {{width:"100%"}} onClick = {()=>this.props.edit_profile(this.state)}>Save</button>
                                        </Link>
                                    </Route>
                                </div>  
                            </div>             
                            </Content>
                        </Layout>
                    </Layout>
            </div>
        )
        /*return (
            <div>
                <div>
                    <label>Name :</label>
                    <label>{this.props.name} = </label>
                    <input
                            type = "text"
                            autoFocus
                            required
                            value = {this.state.E_name}
                            onChange = {(e)=>this.setState({E_name:e.target.value})}
                    ></input>
                </div>
                <div>
                    <label>Surname :</label>
                    <label>{this.props.surname} = </label>
                    <input
                            type = "text"
                            required
                            value = {this.state.E_surname}
                            onChange = {(e)=>this.setState({E_surname:e.target.value})}
                    ></input>
                </div>
                <div>
                    <label>Phone : </label>
                    <lebel>{this.props.phone} = </lebel>
                    <input
                            type = "text"
                            required
                            value = {this.state.E_phone}
                            onChange = {(e)=>this.setState({E_phone:e.target.value})}
                    ></input>
                </div>
                <div>
                    <label>Address : </label>
                    <label>{this.props.address} = </label>
                    <input
                            type = "text"
                            required
                            value = {this.state.E_address}
                            onChange = {(e)=>this.setState({E_address:e.target.value})}
                    ></input>
                </div>
                <div>
                    <Route>
                        <Link to = "/home">
                        <button onClick = {()=>this.props.edit_profile(this.state)}>Save</button>
                        </Link>
                        <Link to = "/home">
                            <button>back</button>
                        </Link>
                    </Route>
                </div>
            </div>
        )*/
    }
}
