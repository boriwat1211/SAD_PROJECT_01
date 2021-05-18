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
export default class Check_order extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            current_order_view:"-1",
            total:0
        }
    }
    show_order_UI = () =>
    {
        let item = [];
        if(this.props.order == null)
        {
           
        }
        else
        {
            if(this.props.order[this.props.user.uid]==null)
            {
                item.push(
                    <Menu.Item style = {{fontSize:20,backgroundColor:"hsl(35, 100%, 80%)"}} key = "-1">
                        Empty
                    </Menu.Item>
                )
            }
            else
            {
                for(let i = 0;i<Object.keys(this.props.order[this.props.user.uid]).length;i++)
                {
                    item.push(
                        <Menu.Item className = "Button_nomal" style = {{fontSize:35,color :"black",backgroundColor:"hsl(35, 100%, 80%)",borderStyle:"solid",borderWidth:"2px",borderColor:"hsl(35, 100%, 40%)"}} key = {i.toString()}>
                            Order {i+1}
                        </Menu.Item>
                    )
                }
            }
        }
        return item
    }
    get_total = () =>
    {
        let total = 0
        if(this.props.order == null)
        {

        }
        else
        {
            if(this.state.current_order_view == "-1"||this.props.order[this.props.user.uid]==null)
            {

            }
            else
            {
                let uid = this.props.user.uid
                let data = Object.keys(this.props.order[this.props.user.uid])[parseInt(this.state.current_order_view)]
                console.log(this.props.order[uid][data]["product"])
                for(let i = 0;i<this.props.order[uid][data]["product"].length;i++)
                {
                    total+=this.props.order[uid][data]["product"][i].product_price*this.props.order[uid][data]["product"][i].product_count
                }
            }
        }
        this.setState({total:total})
    }
    show_order_UI_item  = () =>
    {
        let item = []
        const templateMobile = `
        thumbnail
        heading
        actions
        `
        const templateTablet = `
        thumbnail heading
        thumbnail actions
        `
        if(this.props.order == null)
        {

        }
        else
        {
            if(this.state.current_order_view == "-1"||this.props.order[this.props.user.uid]==null)
            {

            }
            else
            {
                let uid = this.props.user.uid
                let data = Object.keys(this.props.order[this.props.user.uid])[parseInt(this.state.current_order_view)]
                console.log(this.props.order[uid][data]["product"])
                for(let i = 0;i<this.props.order[uid][data]["product"].length;i++)
                {
                    item.push(
                        <Card>
                            <Composition
                                template={templateMobile}
                                templateMd={templateTablet}
                                templateLg={templateMobile}
                                templateColsMdOnly="minmax(100px, 1fr) 1fr"
                                padding={15}
                                gutter={15}
                                gutterLg={25}
                            >
                                {({ Thumbnail, Heading, Actions })=>(
                                    <>
                                    <Thumbnail>
                                        <Image src={this.props.order[uid][data]["product"][i].product_image} alt={this.props.order[uid][data]["product"][i].product_name}/>
                                    </Thumbnail>
                                    <Heading>
                                        <h1 className = "web_theme"  style ={{backgroundColor:"transparent",color:"black",fontSize:25}}>Name: { this.props.order[uid][data]["product"][i].product_name}</h1>
                                        <h2>
                                            Price: {this.props.order[uid][data]["product"][i].product_price}
                                        </h2>
                                        <Text>
                                            Count: {this.props.order[uid][data]["product"][i].product_count}
                                        </Text>
                                    </Heading>
                                    </>
                                )}
                            </Composition>
                        </Card>
                    )
                }
            }
        }
        return item
    }
    render() {
        let { Header, Content, Sider } = Layout
        return(
            <div style = {{backgroundImage:`url(${Background})`,width:"100%",height:"100%"}}>
                <Helmet>
                    <title>Order</title>
                </Helmet>
                    <Layout>
                        <Header className = "web_theme" style ={{position:"fixed",height:"15vh",width:"100vw"}}>
                            <div>
                                <h1 className = "web_theme" style = {{fontSize:"40px"}}><BsFillHouseFill/>Order</h1>
                            </div>
                            <div style = {{position:"absolute",right:"3%",top:"0%"}}>
                                <h1 className = "web_theme" style = {{fontSize:"30px"}}><BsFillPersonFill/> {this.props.name}</h1>
                            </div>
                            <Route>
                                <ButtonGroup style = {{position:"absolute",right:"3%",top:"35%"}}>
                                    <Link to = "/home">
                                        <button className = "Button_nomal"><BsFillHouseFill/>Home</button>
                                    </Link>
                                    <Link to ="/edit">
                                        <button className = "Button_nomal">Edit profile</button>
                                    </Link>
                                    <Link to = '/home'>
                                        <button className = "Button_nomal" onClick = {()=>this.props.logedOut()}>Log Out</button>
                                    </Link>  
                                </ButtonGroup>
                            </Route>
                        </Header>
                        <Layout>
                            <Content style = {{position :"absolute",top:"15vh",width:"100%",height:"85vh",overflow:"auto",scrollbars:""}}>
                            <dib className = "web_theme">
                                <Layout>
                                    <Content style = {{backgroundColor:"hsl(35, 100%, 70%)",position :"absolute",width:"20vw",height:"85vh",overflow:"auto",scrollbars:""}}>
                                        <Menu style = {{fontSize:20,backgroundColor:"hsl(35, 100%, 80%)"}} mode = 'inline' selectedKeys = {[this.state.current_order_view]} onClick = {(e)=>{this.setState({current_order_view:e.key},()=> this.get_total())}}>
                                            {this.show_order_UI()}
                                        </Menu>
                                    </Content>
                                </Layout>
                                <Layout>
                                    <Content style = {{position :"absolute",left:"20vw",width:"80vw",height:"85vh",overflow:"auto",scrollbars:""}}>
                                            <div>
                                                <Composition
                                                    templateCols="repeat(auto-fit, 250px)"
                                                    templateColsMd="repeat(2, 1fr)"
                                                    templateColsLg="repeat(auto-fit, minmax(250px, 1fr))"
                                                    justifyContent="center"
                                                    gutter={15}
                                                    gutterLg={20}
                                                >
                                                {this.show_order_UI_item()}
                                                </Composition>
                                            </div>
                                            <div className = "web_theme" style = {{position:"absolute",right:"0px",bottom:"0px",width:"600px",height:"100px"}}>
                                                <h1 style = {{color:"white",fontSize:30}}>total price : {this.state.total}</h1>
                                            </div>
                                    </Content>
                                </Layout>
                            </dib>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
        )
        /*return (
            <div>
                <Route>
                    <Link to = "/home">
                        <button>back</button>
                    </Link>
                </Route>
                <label>Order</label>
                <div>
                    {this.props.order!=null&&this.props.order[this.props.user.uid]!=null?(
                        <div>
                            {this.show_order()}
                        </div>
                    ):(
                        <div>
                            Empty
                        </div>
                    )}
                </div>
            </div>
        )*/
    }
}
