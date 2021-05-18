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
import { Helmet } from 'react-helmet';
export default class Home extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            product_name:"",
            product_id:"",
            product_price:"",
            product_point:0,
            product_type:"",
            product_image:null,
            product_image_name:"",
            is_edit:false,
            temp_type:"",
            current:"-1",
            current_user_view:"-1",
            current_user_view_order:0,
            not_login_cart:false
        }
        this.props.load_all_user()
        this.props.load_order()
    }
    reset_input = ()=>
    {
        this.setState({
            product_name:"",
            product_id:"",
            product_price:"",
            product_point:0,
            product_type:"",
            product_image:null,
            product_image_name:"",
            edit_cart : false,
            temp_type:"",
            current_user_view:"-1",
            not_login_cart:false
        })
    }
    edit_edit =()=>
    {
        this.setState({is_edit:!this.state.is_edit})
        this.props.load_product()
    }
    show_user =()=>
    {
        let user =[]
        for(let i =0;i<Object.keys(this.props.All_user).length;i++)
        {
            if(this.props.user.uid!=Object.keys(this.props.All_user)[i])
            {user.push(
                <div>
                    <label style = {{fontSize:25,color:"black"}}>{this.props.All_user[Object.keys(this.props.All_user)[i]]['name']+" "+this.props.All_user[Object.keys(this.props.All_user)[i]]['surname']+" is "}</label>
                    {this.props.All_user[Object.keys(this.props.All_user)[i]]['is_AdMin']?(
                        <label style = {{fontSize:25,color:"green"}}>Admin </label>
                    ):(
                        <label style = {{fontSize:25,color:"red"}}>Not Admin </label>
                    )}
                    <button className = "Button_nomal" onClick = {()=>this.props.change_addmin(i)}>chage</button>
                </div>
            )}
        }
        return user
    }
    show_order_product=(user)=>
    {
        let item = []
        for(let i =0;i<user["product"].length;i++)
        {
            item.push(
                <div>
                    <div>
                        <label>Product name : </label>
                        {user["product"][i]["product_name"]}
                        <div>
                            <img src = {user["product"][i]["product_image"]} alt = {user["product"][i]["product_name"]} style = {{height:"50px"}}></img>
                        </div>
                    </div>
                </div>
            )
        }
        return item
    }
    show_order =(user)=>
    {
        let orderdata = []
        for(let i = 0;i<Object.keys(this.props.All_order[user]).length;i++)
        {
            orderdata.push(
                <div>
                    
                    <label>money : {this.props.All_order[user][Object.keys(this.props.All_order[user])[i]]["user_money"]}</label>
                    <div>
                        <label>Total price : {this.props.All_order[user][Object.keys(this.props.All_order[user])[i]]["product_price"]}</label>
                    </div>
                    <div>
                        <label>Order status : {this.props.All_order[user][Object.keys(this.props.All_order[user])[i]]["product_statuc"]?(
                            <label>จัดส่งสำเร็จ</label>
                        ):(
                            <label>กำลังจัดส่ง</label>
                        )}</label>
                    </div>
                    {this.show_order_product(this.props.All_order[user][Object.keys(this.props.All_order[user])[i]])}
                </div>
            )
        }
        return orderdata
    }
    handle_edit = ()=>
    {
        if(!this.props.Login_check||this.props.Cart.product_name ==="empty")
        {
            this.setState({edit_cart:!this.state.edit_cart})
        }
        else
        {
            this.setState({edit_cart:!this.state.edit_cart},()=>this.props.edit_cart_mode())
        }
    }
    handle_confirm = ()=>
    {
        if(!this.props.Login_check||this.props.Cart.product_name ==="empty")
        {
            
        }
        else
        {
            this.setState({edit_cart:!this.state.edit_cart},()=>this.props.edit_cart_confirm())
        }
    }
    total_price = () =>
    {
        let result = 0
        for(let i = 0;i<this.props.Cart.length;i++)
        {
            result+=this.props.Cart[i].product_price*this.props.Cart[i].product_count;
        }
        return result;
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
        if(!this.props.Login_check||this.props.Cart.product_name ==="empty")
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
                        <Heading>
                            <h3 style ={{fontSize:25}}>ไม่มีของในตะกร้า</h3>
                        </Heading>
                        </>
                    )}
                </Composition>
                </Card>
            )
        }
        else
        {
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
                                <h3 style = {{fontSize:25}}>Name: { this.props.Cart[i].product_name}</h3>
                                <Text>
                                Total price: {this.props.Cart[i].product_price*this.props.Cart[i].product_count}
                                </Text>
                            </Heading>
                            {!this.state.edit_cart?(
                                <Text>Count: {this.props.Cart[i].product_count}</Text>
                            ):(
                                <div>
                                    <Text>Count: </Text>
                                    <input
                                        className = "Input_home"
                                        type = "number"
                                        required
                                        min = "1"
                                        style = {{color:"black",fontSize:25,width:"30%"}}
                                        value = {this.props.Cart[i].product_count}
                                        onChange = {(e)=>this.props.edit_cart(e,i)}>
                                    </input>
                                    <button className = "Button_delete" onClick = {()=>this.props.remove_cart(this.props.Cart[i].product_name)} style ={{width:"100%"}}><BsFillTrashFill className = "Icon_Button"/></button>
                                </div>
                            )}
                            </>
                        )}
                    </Composition>
                    </Card>
                )
            }
        }
        return item
    }
    handle_Add_type = ()=>
    {
        this.props.add_type(this.state.temp_type)
        this.setState({temp_type:""})
    }
    handle_remove_type = ()=>
    {
        this.props.remove_type(this.state.temp_type)
        this.setState({temp_type:""})
    }
    Add_type_ui = ()=>
    {
        if(this.props.All_product_type!=null)
        {
            let {Option} = Select
            let data = []
            for(let i = 0;i<this.props.All_product_type.length;i++)
            {
                data.push(
                    <Option value = {i}>{this.props.All_product_type[i]}</Option>
                )
            }
            return data
        }
    }
    type_sel = () =>
    {
        let data = []
        data.push(
            <Menu.Item key = {"-1"}> 
                ALL
            </Menu.Item>
        )
        if(this.props.All_product_type!=null)
        {
            for(let i = 0;i<this.props.All_product_type.length;i++)
            {
                data.push(
                    <Menu.Item key = {i.toString()}>
                        {this.props.All_product_type[i]}
                    </Menu.Item>
                )
            }
        }
        return data
    }
    show_item_UI_Addmin = ()=>
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
        let result = []
        for(let i = 0;i<this.props.product_data.length;i++)
        {
            result.push(
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
                            <Image src={this.props.product_data[i].product_image} alt={this.props.product_data[i].product_name}/>
                            </Thumbnail>
                            <Heading>
                                {!this.state.is_edit?(
                                    <div>
                                        <h3 className = "web_theme"  style ={{backgroundColor:"transparent",color:"black",fontSize:25}}>Name:{ this.props.product_data[i].product_name}</h3>
                                        <Text>
                                            Price: {this.props.product_data[i].product_price}
                                        </Text>
                                    </div>
                                ):(
                                    <div>
                                        <input
                                            className = "Input_home"
                                            style ={{fontSize:25,color:"black"}}
                                            type = "text"
                                            required
                                            value = {this.props.product_data[i].product_name}
                                            onChange = {(e)=>{this.props.edit_product(i,"product_name",e.target.value)}}
                                        >
                                        </input>
                                        <input
                                            className = "Input_home"
                                            style ={{fontSize:25,color:"black"}}
                                            type = "text"
                                            required
                                            value = {this.props.product_data[i].product_price}
                                            onChange = {(e)=>{this.props.edit_product(i,"product_price",e.target.value)}}
                                        >
                                        </input>
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Type"
                                            onChange = {(e)=>this.props.edit_product(i,"product_type",e)}
                                            optionFilterProp="children"
                                            defaultValue = {this.props.All_product_type[this.props.product_data[i].product_type]}
                                            filterOption={(input, option) =>
                                            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {this.Add_type_ui()}
                                        </Select>
                                    </div>
                                )}
                            </Heading>
                            <Actions flex align="flex-end">
                                <div style ={{justifyItems:"center",width:"100%"}}>
                                    {!this.state.is_edit?(
                                        <button className = "Button_delete" style = {{width:"100%"}} onClick = {()=>{this.props.remove_product(i)
                                            alert('Saved')}}>Delete</button>
                                    ):(
                                            <div style={{width:"100%"}}>
                                                <button  className = "Button_confirm" style = {{width:"100%"}} onClick = {()=>{this.props.save_all_product()
                                                    this.edit_edit()
                                                    alert('Saved')}}>Save</button>
                                                <button className = "Button_delete" style = {{width:"100%"}} onClick = {()=>{this.props.remove_product(i)
                                                alert('Saved')}}>Delete</button>
                                            </div>
                                    )}
                                </div>
                            </Actions>
                            </>
                        )}
                    </Composition>
                </Card>
            )
        }
        return result;
    }
    show_item_UI = ()=>
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
        let result = []
        for(let i = 0;i<this.props.product_data.length;i++)
        {
            if(this.state.current == '-1')
            {
                result.push(
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
                                <Image src={this.props.product_data[i].product_image} alt={this.props.product_data[i].product_name}/>
                                </Thumbnail>
                                <Heading>
                                    <h3  className = "web_theme"  style ={{backgroundColor:"transparent",color:"black",fontSize:25}}>Name: { this.props.product_data[i].product_name}</h3>
                                    <Text>
                                    Price: {this.props.product_data[i].product_price}
                                </Text>
                                </Heading>
                                <Actions flex align="flex-end">
                                    <Box from="md"marginRight={10} width = "50%">
                                        <input
                                            className = "Input_home"
                                            style = {{width:"100%",fontSize:25}}
                                            type = {"number"}
                                            min = '0'
                                            max = '99'
                                            required
                                            value = {this.props.c_product[i]}
                                            onChange = {(e)=>{this.props.hadle_change(e,i)}}
                                        >
                                        </input>
                                    </Box>
                                    <Box from="md" marginRight={10} width = "50%">
                                        <Button wide onClick = {()=>{this.props.cart_add(this.props.product_data[i],i)
                                            if(!this.props.Login_check)
                                            {
                                                this.setState({not_login_cart:true})
                                            }
                                            }}><BsFillBagFill className = "Icon_Button"/> Cart</Button>
                                    </Box>
                                </Actions>
                                </>
                            )}
                        </Composition>
                    </Card>
                )
            }
            else
            {
                if(this.props.product_data[i].product_type==parseInt(this.state.current))
                {
                   result.push(
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
                                    <Image src={this.props.product_data[i].product_image} alt={this.props.product_data[i].product_name}/>
                                </Thumbnail>
                                <Heading>
                                    <h3 className = "web_theme"  style ={{backgroundColor:"transparent",color:"black",fontSize:25}}>Name: { this.props.product_data[i].product_name}</h3>
                                    <Text>
                                        Price: {this.props.product_data[i].product_price}
                                    </Text>
                                </Heading>
                                <Actions flex align="flex-end">
                                    <Box from="md"marginRight={10} width = "50%">
                                        <input
                                            className = "Input_home"
                                            style = {{width:"100%",fontSize:25}}
                                            type = {"number"}
                                            min = '1'
                                            max = '20'
                                            required
                                            value = {this.props.c_product[i]}
                                            onChange = {(e)=>{this.props.hadle_change(e,i)}}
                                        >
                                        </input>
                                    </Box>
                                    <Box from="md" marginRight={10} width = "50%">
                                        <Button wide onClick = {()=>{this.props.cart_add(this.props.product_data[i],i)
                                            if(!this.props.Login_check)
                                            {
                                                this.setState({not_login_cart:true})
                                            }
                                            }}><BsFillBagFill className = "Icon_Button"/> Cart</Button>
                                    </Box>
                                </Actions>
                                </>
                            )}
                        </Composition>
                    </Card>
                   )
                }
            }
            
        }
        return (result)
    }
    get_user_order = ()=>
    {
        let item = [];
        if(this.props.All_user==null||this.props.All_order==null)
        {
            item.push(
                <Menu.Item style = {{fontSize:20,backgroundColor:"hsl(35, 100%, 80%)"}} key = "-1">
                    Empty
                </Menu.Item>
            )
        }
        else
        {
            for(let i  = 0;i<Object.keys(this.props.All_order).length;i++)
            {
                item.push(
                    <SubMenu key = {Object.keys(this.props.All_order)[i]}
                    style = {{backgroundColor:"hsl(35, 100%, 80%)"}}
                    title = {this.props.All_user[Object.keys(this.props.All_order)[i]]["name"]+" "+this.props.All_user[Object.keys(this.props.All_order)[i]]["surname"]}>    
                        {this.get_user_order_detail(this.props.All_order[Object.keys(this.props.All_order)[i]],Object.keys(this.props.All_order)[i])}
                    </SubMenu>
                )
            }
        }
        return item;
    }
    get_user_order_detail = (user,parrent)=>
    {
        let item = []
        for(let i = 0;i<Object.keys(user).length;i++)
        {
            item.push(
                <Menu.Item style = {{fontSize:15,backgroundColor:"hsl(35, 100%, 90%)"}}  key = {parrent+"+"+Object.keys(user)[i]}>
                    Order{i+1}
                </Menu.Item>
            )
        }
        return item;
    }
    show_order_UI = ()=>
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
        if(this.state.current_user_view == "-1")
        {
           
        }
        else
        {
            let data = this.state.current_user_view.split("+");
            for(let i = 0;i<this.props.All_order[data[0]][data[1]]["product"].length;i++)
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
                                    <Image src={this.props.All_order[data[0]][data[1]]["product"][i].product_image} alt={this.props.product_data[i].product_name}/>
                                </Thumbnail>
                                <Heading>
                                    <h3 className = "web_theme"  style ={{backgroundColor:"transparent",color:"black",fontSize:25}}>Name: { this.props.All_order[data[0]][data[1]]["product"][i].product_name}</h3>
                                    <Text>
                                        Count: {this.props.All_order[data[0]][data[1]]["product"][i].product_count}
                                    </Text>
                                </Heading>
                                </>
                            )}
                        </Composition>
                    </Card>
                )
            }
        }
        return item
    }
    show_Admin_user_detail = ()=>
    {
        let data = this.state.current_user_view.split("+");
        return (
            <div>
                <h1 style = {{color:"white",fontSize:25}}>Name: {this.props.All_user[data[0]]["name"]+" "+this.props.All_user[data[0]]["surname"]}</h1>
                <h2 style = {{color:"white",fontSize:25}}>Phone: {this.props.All_user[data[0]]["phone"]} </h2>
                <h3 style = {{color:"white",fontSize:25}}>Address: {this.props.All_user[data[0]]["address"]}</h3>
            </div>
        )
    }
    show_Admin_UI = ()=>
    {
        let { Header, Content, Sider } = Layout
        let result = []
        if(this.state.current == "1")
        { 
            result.push(
                <dib className = "web_theme">
                    <Layout>
                        <Content style = {{backgroundColor:"hsl(35, 100%, 70%)",position :"absolute",width:"20vw",height:"85vh",overflow:"auto",scrollbars:""}}>
                            <Menu style = {{fontSize:20,backgroundColor:"hsl(35, 100%, 80%)"}} mode = 'inline' selectedKeys = {[this.state.current_user_view]} onClick = {(e)=>{this.setState({current_user_view:e.key})}}>
                                {this.get_user_order()}
                            </Menu>
                        </Content>
                    </Layout>
                    <Layout>
                        <Content style = {{position :"absolute",left:"20vw",width:"80vw",height:"85vh",overflow:"auto",scrollbars:""}}>
                                <div className = "web_theme" style = {{position:"sticky",top:"0",width:"100%",height:"200px",backgroundColor:"hsl(35, 100%, 70%)"}}>
                                    {this.state.current_user_view == "-1"||this.props.All_user==null||this.props.All_order==null?(
                                        <div>
                                            <h1 style = {{color:"white",fontSize:25}}>Name: - -</h1>
                                            <h2 style = {{color:"white",fontSize:25}}>Phone: - - </h2>
                                            <h3 style = {{color:"white",fontSize:25}}>Address: - -</h3>
                                        </div>
                                    ):(
                                        <div>
                                            {this.show_Admin_user_detail()}
                                        </div>
                                    )}      
                                </div>
                                
                                <div>
                                    <Composition
                                        templateCols="repeat(auto-fit, 250px)"
                                        templateColsMd="repeat(2, 1fr)"
                                        templateColsLg="repeat(auto-fit, minmax(250px, 1fr))"
                                        justifyContent="center"
                                        gutter={15}
                                        gutterLg={20}
                                    >
                                    {this.show_order_UI()}
                                    </Composition>
                                </div>
                        </Content>
                    </Layout>
                </dib>
            )
        }
        else if(this.state.current == "2")
        {
            result.push(
                <div className = "web_theme" style = {{textAlign:"center",paddingLeft:"20%",paddingRight:"20%",backgroundColor:"transparent"}}>
                    <div>
                        <h1 style = {{fontSize:30,color:"black"}}>Add new Product</h1>
                    </div>
                    <div>
                        <label style = {{fontSize:25,color:"black"}} >product name: </label>
                        <input type = "text"
                            className = "Input_home"
                            required
                            style = {{color:"black"}}
                            placeholder = "product name"
                            autoFocus
                            value = {this.state.product_name}
                            onChange = {(e)=>this.setState({product_name:e.target.value})}>
                        </input>
                    </div>
                    <div>
                        <label style = {{fontSize:25,color:"black"}}>product price: </label>
                        <input type = "text"
                            style = {{color:"black"}}
                            className = "Input_home"
                            required
                            placeholder = "product price"
                            value = {this.state.product_price}
                            onChange = {(e)=>this.setState({product_price:e.target.value})}
                        ></input>
                    </div>
                    <div>
                            <Select
                                showSearch
                                style={{color:"black"}}
                                placeholder="Type"
                                onChange = {(e)=>this.setState({product_type:e})}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                            {this.Add_type_ui()}
                            </Select>
                    </div>
                    <div>
                        <input className = "Input_home" style = {{color:"black"}} type = "file" accept = "image/*" onChange = {(e)=>this.setState({product_image:e.target.files[0]},()=>this.setState({product_image_name:e.target.files[0].name}))}></input>
                        <button className ="Button_confirm" onClick = {()=>{this.props.save_product(this.state)
                        this.reset_input()
                        alert('Saved')}}>Save</button>
                    </div>
                    <div>
                        {this.state.product_image == null?(
                            <label style= {{color:"black"}}>No Image    </label>
                        ):(
                            <img src = {URL.createObjectURL(this.state.product_image)}/>
                        )}
                    </div>
                    <div>
                        <label style = {{fontSize:25,color:"black"}} >Add type </label>
                        <input className = "Input_home" style = {{color:"black"}} placeholder="Type" type = "text" value = {this.state.temp_type} onChange = {(e)=>this.setState({temp_type:e.target.value})}>
                        </input>
                        <button className ="Button_confirm" onClick = {()=>{this.handle_Add_type()
                        alert('Saved')}}>Add</button>
                        <button className ="Button_delete" onClick = {()=>{this.handle_remove_type()
                        alert('Saved')}}>remove</button>
                    </div>
                </div>
            )
        }
        else if(this.state.current == "3")
        {
            result.push(
                <div  className = "web_theme" style = {{textAlign:"center",backgroundColor:"transparent"}}>
                    <h1 style = {{fontSize:40}}>Current item</h1>
                        {this.props.product_data==null?(
                    <div>
                        Loading
                    </div>
                ):(
                    <div style = {{textAlign:"center"}}>
                        <div>
                            <button className = "Button_nomal" style = {{fontSize:20}} onClick = {()=>{ 
                                    this.edit_edit()}}>edit</button>
                        </div>
                        <Composition
                            templateCols="repeat(auto-fit, 250px)"
                            templateColsMd="repeat(2, 1fr)"
                            templateColsLg="repeat(auto-fit, minmax(250px, 1fr))"
                            justifyContent="center"
                            gutter={15}
                            gutterLg={20}
                        >
                            {this.show_item_UI_Addmin()}
                        </Composition>
                    </div>
                )}
                </div>
            )
        }
        else if(this.state.current == "4")
        {
            result.push(
                <div className = "web_theme" style = {{backgroundColor:"transparent",textAlign:"center"}}>
                    <h1 style = {{fontSize:25,color:"black"}} >USER</h1>
                    <div>
                        {this.props.All_user==null?(
                            <div>
                                userloading
                            </div>
                        ):(
                            <div>
                                {this.show_user()}
                            </div>
                        )}
                    </div>
                    <div>
                        <button  className = "Button_confirm"   onClick = {()=>{this.props.save_all_user()
                        alert('Saved')}}>confime</button>
                        <button  className = "Button_delete" onClick = {()=>{this.props.load_all_user()
                        alert('Saved')}}>cancel</button>
                    </div>
                </div>
            )
        }
        return result;
    }
    render() {
        let { Header, Content, Sider } = Layout
        const templateMobile = `
        thumbnail
        heading
        actions
        `
        const templateTablet = `
        thumbnail heading
        thumbnail actions
        `
        if(this.state.not_login_cart)
        {
            return(
                <Route>
                    <Redirect to = "/login"/>
                </Route>
            )
        }
        if(this.props.is_AdMin)
        {                   
            return (
                <div style = {{backgroundImage:`url(${Background})`,width:"100%",height:"100%"}}>
                    <Helmet>
                        <title>Admin Home</title>
                    </Helmet>
                    <Layout>
                        <Header className = "web_theme" style ={{position:"fixed",height:"15vh",width:"100vw"}}>
                            <div>
                                <h1 className = "web_theme" style = {{fontSize:"40px"}}><BsFillHouseFill/>Admin_Home</h1>
                            </div>
                            <div style = {{position:"absolute",right:"3%",top:"0%"}}>
                                <h1 className = "web_theme" style = {{fontSize:"30px"}}><BsFillPersonFill/> {this.props.name}</h1>
                            </div>
                            <ButtonGroup style = {{position:"absolute",right:"3%",top:"35%"}}>
                                <button className = "Button_nomal" onClick = {()=>this.props.logedOut()}>Log Out</button>
                            </ButtonGroup>
                            <Menu mode = "horizontal" theme = "light" selectedKeys = {[this.state.current]} onClick = {(e)=>this.setState({current:e.key})}
                                className = "home_type_sel" style ={{color:"white"}}>
                                <Menu.Item key = "1">
                                    Order
                                </Menu.Item>
                                <Menu.Item key = "2">
                                    Add Item
                                </Menu.Item>
                                <Menu.Item key = '3'>
                                    Edit Item
                                </Menu.Item>
                                <Menu.Item key = '4'>
                                    Updata Admin
                                </Menu.Item>
                            </Menu>
                        </Header>
                        <Layout>
                            <Content style = {{position :"absolute",top:"15vh",width:"100%",height:"85vh",overflow:"auto",scrollbars:""}}>
                            {this.show_Admin_UI()}
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            )
        }
        else
        {
            return (
                <div style = {{backgroundImage:`url(${Background})`,width:"100%",height:"100%"}}>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                <Layout>
                    <Header className = "web_theme" style ={{position:"fixed",height:"15vh",width:"100vw"}}>
                        <div>
                            <h1 className = "web_theme" style = {{fontSize:"40px"}}><BsFillHouseFill/> Home</h1>
                        </div>
                        <div style = {{position:"absolute",right:"3%",top:"0%"}}>
                            <h1 className = "web_theme" style = {{fontSize:"30px"}}><BsFillPersonFill/> {this.props.name}</h1>
                        </div>
                        {this.props.Login_check? (
                                <Route>
                                <ButtonGroup style = {{position:"absolute",right:"3%",top:"35%"}}>
                                    <Link to = "/order">
                                        <button className = "Button_nomal">Order</button>
                                    </Link>
                                    <Link to ="/edit">
                                        <button className = "Button_nomal">Edit profile</button>
                                    </Link>
                                        <button className = "Button_nomal" onClick = {()=>this.props.logedOut()}>Log Out</button>
                                </ButtonGroup>
                                    <Menu mode = "horizontal" theme = "light" selectedKeys = {[this.state.current]} onClick = {(e)=>this.setState({current:e.key})}
                                    className = "home_type_sel" style ={{color:"white"}}>
                                        {this.type_sel()}
                                    </Menu>
                                </Route>
                        ):(
                                <Route>
                                    <ButtonGroup style = {{position:"absolute",right:"3%",top:"35%"}}>
                                        <Link to = "/login">
                                            <button className = "Button_nomal">Log in</button>
                                        </Link>
                                        <Link to = "/register">
                                            <button className = "Button_nomal">Sign up</button>
                                        </Link>
                                    </ButtonGroup>
                                    <Menu mode = "horizontal" theme = "light" selectedKeys = {[this.state.current]} onClick = {(e)=>this.setState({current:e.key})}
                                        className = "home_type_sel" style ={{color:"white"}}>
                                        {this.type_sel()}
                                    </Menu>
                                </Route>
                        )}
                    </Header>
                        <Layout>
                            <Content style = {{position :"absolute",top:"15vh",width:"80vw",height:"85vh",overflow:"auto",scrollbars:""}}>
                            {this.props.product_data==null?(
                                <div>
                                    Loading
                                </div>
                            ):(
                                <div>
                                <Composition
                                    templateCols="repeat(auto-fit, 250px)"
                                    templateColsMd="repeat(2, 1fr)"
                                    templateColsLg="repeat(auto-fit, minmax(250px, 1fr))"
                                    justifyContent="center"
                                    gutter={15}
                                    gutterLg={20}
                                >
                                {this.show_item_UI()}
                                </Composition>
                                </div>
                            )}
                            </Content>
                        </Layout>
                        <Layout>
                            <Content style = {{position :"fixed",top:"15vh",width:"20vw",height:"85vh",right:"0",overflow:"auto"}}>
                            <div  className = "web_theme"  style = {{borderStyle:"solid",borderWidth:"5px",borderColor:"hsl(35, 100%, 80%)",color:"white",padding:"40px"}}>
                                <div style ={{position:"sticky",top:"0%",backgroundColor:"hsl(35, 100%, 60%)",height :"20%",textAlign:"center"}}>
                                    <h1 style = {{fontSize:"20px",width:"100%",color:"white"}}><BsFillBagFill/>Cart total = {this.total_price()} Bath</h1>
                                    <div style = {{}}>
                                        <button className = "Button_nomal" style = {{width:"40%"}} onClick  = {()=>this.handle_edit()}>Edit</button>
                                        {this.state.edit_cart?(
                                            <button className ="Button_confirm" onClick = {()=>this.handle_confirm()} style = {{width:"60%"}} >Confirm</button>
                                        ):(
                                            <div></div>
                                        )}
                                    </div>
                                    <Route>
                                        {!this.props.Login_check||this.props.Cart.product_name ==="empty"?(
                                             <button className ="Button_confirm">Confirm Order</button>
                                        ):(
                                            
                                            <Link to = "/bill">
                                                <button className ="Button_confirm">Confirm Order</button>
                                            </Link>
                                        )}
                                    </Route>
                                </div>
                                <div>
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
                            </div>
                            </Content>
                        </Layout>
                </Layout>
                </div>
            )
        }
    }
}
