import React, { Component } from 'react'
import {Link, Redirect, Route} from 'react-router-dom'
import 'antd/dist/antd.css';
import { Result, Select } from 'antd';
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import { Composition, Only ,Box } from 'atomic-layout'
import { Text, Image, Button, Card } from '../../src/components/Menu_components'
import { BsFillPersonFill,BsFillHouseFill,BsFillTrashFill,BsFillBagFill,BsFileText} from "react-icons/bs";
import { ButtonGroup } from 'react-bootstrap';
import Background from './images/ellieelien-04yMqTmUeHQ-unsplash.jpg'
import SubMenu from 'antd/lib/menu/SubMenu';
import { IconGroup } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
export default class Bill extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            total:this.get_total(),
            bill_status:false,
            user_money:0
            
        }
    }
    get_total = ()=>
    {
        let T_total  = 0;
        for(let i = 0;i<this.props.Cart.length;i++)
        {
            T_total += this.props.Cart[i].product_count*this.props.Cart[i].product_price
        }
        return T_total
    }
    show_cart_UI = ()=>
    {
        const templateMobile = `
        thumbnail
        heading
        actions
        `
        const templateTablet = `
        thumbnail heading
        thumbnail actions
        `
        let item = []
        for(let i = 0;i<this.props.Cart.length;i++)
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
                            <Image src={this.props.Cart[i].product_image} alt={this.props.Cart[i].product_name}/>
                            </Thumbnail>
                            <Heading>
                                <h1 style = {{fontSize:25}}>Name: { this.props.Cart[i].product_name}</h1>
                                <h2 style = {{fontSize:25}}>Count: {this.props.Cart[i].product_count}</h2>
                                <h3 style = {{fontSize:25}}>Price: {this.props.Cart[i].product_price}</h3>
                                <Text>
                                Total price: {this.props.Cart[i].product_price*this.props.Cart[i].product_count}
                                </Text>
                            </Heading>
                            </>
                        )}
                    </Composition>
                    </Card>
                )
        }
        return item
    }
    render() {
        let { Header, Content, Sider } = Layout
        return(
            <div style = {{backgroundImage:`url(${Background})`,width:"100%",height:"100%"}}>
                <Helmet>
                    <title>Bill</title>
                </Helmet>
                    <Layout>
                        <Header className = "web_theme" style ={{position:"fixed",height:"15vh",width:"100vw"}}>
                            <div>
                                <h1 className = "web_theme" style = {{fontSize:"40px"}}>Bill</h1>
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
                            <Content style = {{paddingTop:'5%',paddingBottom:"5%",paddingLeft:"20%",paddingRight:"20%",backgroundColor:"transparent",position :"absolute",width:"100vw",top:"15vh",height:"85vh",overflow:"auto",scrollbars:""}}>  
                                <div className = "web_theme" style={{padding:"2%",backgroundColor:"hsl(35, 100%, 80%)",width:"100%",height:"100%",fontSize:30,borderRadius:"20px"}}>
                                    <h1>Total : {this.state.total}</h1>
                                    <div className = "web_theme" style={{padding:"2%",backgroundColor:"hsl(35, 100%, 60%)",width:"100%",height:"80%",fontSize:30,overflow:"auto",borderRadius:"20px"}}>
                                    <Composition
                                        templateCols="repeat(auto-fit, 250px)"
                                        templateColsMd="repeat(2, 1fr)"
                                        templateColsLg="repeat(auto-fit, minmax(250px, 1fr))"
                                        justifyContent="center"
                                        gutter={15}
                                        gutterLg={20}
                                        >
                                            {this.show_cart_UI()}
                                        </Composition>
                                    </div>
                                    <Route>
                                        <Link to ="/home">
                                            <button className = "Button_confirm" style = {{width:"100%"}} onClick = {()=>this.props.save_order(this.state)}>confirm</button>
                                        </Link>
                                    </Route>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
            </div>
        )
    }
}
