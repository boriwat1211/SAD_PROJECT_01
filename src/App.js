
import React from 'react';
import Login from './components/Login'
import Register from "./components/Register"
import Home from './components/Home'
import Bill from './components/Bill'
import "./components/App.css"
import Check_order from './components/Check_order'
import Edit_profile from './components/Edit_profile'
import {BrowserRouter as Router,Switch, Route, Redirect} from'react-router-dom';
import fire from './components/Firebase/Firebase';
class App extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      user:"",
      address:"",
      email:"Not Login",emailerror:"",
      name:"-",inputerror:"",
      password:"",passworderror:"",
      phone:"",
      point:0,
      surname:"-",
      is_AdMin: false,
      Cart:{product_name:"empty"},
      All_order:null,
      product:null,
      count_product:{},
      is_save:false,

      is_profile_load:false,
      All_user:null,
      product_del:null,
      All_product_type:null
    }
    //this.logedOut()
    this.load_product()
    this.load_order()
    this.load_all_product_type()
  }
  remove_type = (data)=>
  {
    let locate,check = false
    console.log(this.state.All_product_type.length)
    for(let i = 0;i<this.state.All_product_type.length;i++)
    {
      if(data == this.state.All_product_type[i])
      {
        locate = i
        check = true
        break
      }
    }
    if(data ===""||!check)
    {
      console.log("test")
    }
    else
    {
      let typedata = []
      if(this.state.All_product_type == null)
      {
        
      }
      else
      {
        this.state.All_product_type.forEach(temp=>
        {
          if(temp!=data)
          {
            typedata.push(temp)
          }
          else
          {

          }
        })
      }
      if(this.state.product!=null)
      {
        let temp_product = this.state.product
        temp_product.forEach(data=>
        { 
          if(data.product_type==locate)
          {
            data.product_type = -1
          }
          else if(data.product_type>locate)
          {
            data.product_type-=1
          }
        })
        this.setState({product:temp_product},this.save_all_product())
      }
      this.setState({All_product_type:typedata},()=>fire.database().ref("/product_type").set(
        this.state.All_product_type
      ))
    }
  }
  add_type = (data)=>
  {
    if(data==="")
    {
     
    }
    else
    {
      let typedata = []
      if(this.state.All_product_type == null)
      {
        typedata.push(data)
      }
      else
      {
        this.state.All_product_type.forEach(temp=>typedata.push(temp))
      }
      typedata.push(data)
      this.setState({All_product_type:typedata},()=>fire.database().ref("/product_type").set(
        this.state.All_product_type
      ))
    }
  }
  edit_cart_mode =()=>
  {
    this.load_user()
  }
  edit_cart_confirm = ()=>
  {
    this.save_user()
  }
  edit_cart = (value,i)=>
  {
    let temp = []
    this.state.Cart.forEach(data=>temp.push(data))
    temp[i].product_count = value.target.value
    this.setState({Cart:temp},()=>console.log(this.state.Cart))
  }
  remove_cart = (name) =>
  {
    let data = []
    let count = 0
    for(let i = 0;i<this.state.Cart.length;i++)
    {
      if(this.state.Cart[i].product_name != name)
      {
        data.push(this.state.Cart[i])
        count++
      }
    }
    if(count==0)
    {
      data["product_name"] = "empty"
    }
    this.setState({Cart:data})
  }
  edit_product = (key,type,e) =>
  {
      let temp_product = this.state.product
      temp_product[key][type] = e
      this.setState({product:temp_product})
  }
  edit_profile = (data)=>
  {
      this.setState({is_save:false})
      if(data.E_name !="")
      {
        this.setState({name:data.E_name},()=>this.save_user(),()=>this.load_user(this.state.user))
      }
      if(data.E_surname != "")
      {
        this.setState({surname:data.E_surname},()=>this.save_user())
      }    
      if(data.E_phone != "")
      {
        this.setState({phone:data.E_phone},()=>this.save_user())
      }
      if(data.E_address!="")
      {
        this.setState({address:data.E_address},()=>this.save_user())
      }
  }
  count_product = (e,i) =>
  {
      let arr = this.state.count_product
      arr[i] =  parseInt(e.target.value)
      this.setState({count_product:arr})
  }
  add_2_cart = (data,num)=>
  {
    if(this.state.user)
    {
      var data_temp = []
      let count = this.state.count_product[num]
      data["product_count"] = parseInt(count)
      if(this.state.count_product[num]!=0)
      {
        if(this.state.Cart.product_name === "empty")
        {
          data_temp.push(data)
        }
        else
        {
          let check = true
          this.state.Cart.forEach(C_data=>{
            if(data.product_name == C_data.product_name)
            {
              data.product_count+=parseInt(C_data.product_count)
              data_temp.push(data)
              check = false
            }
            else
            {
              data_temp.push(C_data)
            }
          })
          if(check)
          {
            data_temp.push(data)
          }
        }
        this.setState({Cart:data_temp},()=>{this.save_user()
          let temp = []
          this.state.count_product.forEach(data=>temp.push(0))
          this.setState({count_product:temp},()=>console.log(this.state.count_product))
          })
        }
    }
    else
    {
      console.log("login")
    }
  }
  save_user = () =>
  {
    fire.database().ref("/user").child(this.state.user.uid).set(
      {
        email:this.state.email,
        password: this.state.password,
        surname: this.state.surname,
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.address,
        point : 0,
        cart:this.state.Cart,
        is_AdMin:this.state.is_AdMin
      })    
  }
  load_all_product_type = ()=>
  {
    fire.database().ref("/product_type").on("value",data=>
    {
      if(data.val()==null)
      {
        console.log("Empty")
      }
      else
      {
        this.setState({All_product_type:data.val()},()=>console.log(data.val()))
      }
    })
  }
  load_all_user = ()=>
  {
    fire.database().ref("/user").on("value",data =>
    {
      if(data.val()==null)
      {
        console.log("Empty")
      }
      else
      {
        this.setState({All_user:data.val()})
      }
    })
  }
  load_user = () =>
  {
    fire.database().ref("/user/"+this.state.user.uid).on("value",data =>
    {
        if(data.val() == null)
        {
          this.save_user()     
        }
        else
        {
          let user_data =[]
          data.forEach(subdata =>
          {
            user_data.push(subdata.val())
          })
          this.setState({address: user_data[0]})
          this.setState({Cart:user_data[1]})
          this.setState({email:user_data[2]})
          this.setState({is_AdMin:user_data[3]})
          this.setState({name:user_data[4]})
          this.setState({password:user_data[5]})
          this.setState({phone:user_data[6]})
          this.setState({point:user_data[7]})
          this.setState({surname:user_data[8]})
          this.setState({is_profile_load:true})
        }
    })
  }
  load_product = ()=>
  {
      this.setState({product_del:null})
      fire.database().ref("/product").on("value",product_data =>
      {
        if(product_data.val()==null)
        {
          console.log("Product is null")
        }
        else
        {
          let temp = []
          let c_product = []
          product_data.forEach(sub_product_data=>
          {
            temp.push(sub_product_data.val())
            c_product.push(0)
          })
          this.setState({product:temp,count_product:c_product})
        }
      })
  }
  load_order = ()=>
  {
    fire.database().ref("/order").on("value",order=>
    {
      if(order.val()!=null)
      { 
        this.setState({All_order:order.val()},()=>
        {
          if(this.state.user)
          {
            this.load_user()
          }
        })
      }
      else
      {
        if(this.state.user)
        {
          this.load_user()
        }
      }
    })
  }
  save_all_product = ()=>
  {
    if(this.state.product_del!=null)
    {
      for(let i =0;i<this.state.product_del.length;i++)
      {
        fire.storage().refFromURL(this.state.product_del[i].product_image).delete().catch(()=>
        {
          console.log("eror")
        })
      }
    }
    fire.database().ref("/product").set(this.state.product)
  }
  save_product =(data)=>
  {
    let uploatd = fire.storage().ref("/images/"+data.product_image.name).put(data.product_image);
    uploatd.on(
      "stage_chaged",
      snapshot =>{},err =>
      {
        console.log(err)
      },()=>{
        fire.storage().ref("images").child(data.product_image.name).getDownloadURL().then(url=>{
          let temp_data 
          if(this.state.product!=null)
          {
            temp_data = this.state.product
          }
          else
          {
            temp_data = []
          }
          if(data.product_type=="")
          {
            temp_data.push(
            {
              product_name:data.product_name,
              product_id:data.product_id,
              product_price:data.product_price,
              product_point:data.product_point,
              product_type:-1,
              product_image:url,
              product_image_name:data.product_image_name
            })
          }
          else
          {
            temp_data.push(
              {
                product_name:data.product_name,
                product_id:data.product_id,
                product_price:data.product_price,
                product_point:data.product_point,
                product_type:data.product_type,
                product_image:url,
                product_image_name:data.product_image_name
              })
            }
          console.log(temp_data)
          this.setState({product:temp_data},()=>this.save_all_product())
        })
      }
    )
  }
  save_order = (data) =>
  {
    let total_point = 0
    let total_price = 0
    for(let i = 0;i<this.state.Cart.length;i++)
    {
      total_price+=parseInt(this.state.Cart[i].product_price)*parseInt(this.state.Cart[i].product_count)
      total_point+=parseInt(this.state.Cart[i].product_point)*parseInt(this.state.Cart[i].product_count)
    }
    fire.database().ref("/order").child(this.state.user.uid).push({
        user_name:this.state.name+" "+this.state.surname,
        user_phone:this.state.phone,
        user_address:this.state.address,
        user_money:data.user_money,
        user_chage:data.user_money-total_price,
        product:this.state.Cart,
        product_point:total_point,
        product_price:total_price,
        product_statuc:data.bill_status
    },()=>{this.load_product()
            this.clearCart()
            this.save_user()})
  }
  remove_product =(value)=>
  {
    let temp_product = []
    let temp_product_remove = []
    for(let i = 0;i<this.state.product.length;i++)
    {
      if(i!=value)
      {
        temp_product.push(this.state.product[i])
      }
      else
      {
        temp_product_remove.push(this.state.product[i])
      }
    }
    this.setState({product:temp_product,product_del:temp_product_remove},()=>{this.save_all_product()})
  }
  componentDidMount()
  {
    this.authListener()
  }
  clearInput = () =>
  {
    this.setState({user:""})
    this.setState({address:""})
    this.setState({email:"Not Login"})
    this.setState({name: "-"})
    this.setState({surname: "-"})
    this.setState({password:""})
    this.setState({phone:""})
    this.setState({point:0})
    this.setState({surname:"-"})
    this.setState({is_AdMin:false})
    this.setState({Cart:{product_name:"empty"}})
    this.setState({Order:{order:"empty"}})
  }
  clearCart = () =>
  {
    this.setState({Cart:{product_name:"empty"}})
  }
  clearError = () =>
  {
    this.setState({emailerror:""})
    this.setState({passworderror:""})
  }
  logedIn = (email,password) =>
  {
    this.clearError()
    this.setState({email: email , password:password},()=>{
      fire
      .auth()
      .signInWithEmailAndPassword(this.state.email,this.state.password)
      .catch((err)=>
        {
          switch (err.code)
          {
            case "auth/invalid-email":
            case "auth/user-disable":
            case "auth/user-not-found":
              this.setState({emailerror:err.message})
              break
            case "auth/wrong-password":
              this.setState({passworderror:err.message})
              break
          }
        })
    })
  }
  signedUp = (data) =>
  {
    this.clearError()
    let count = 0
    let checkU = false,checkN = false,checkA = true
    let temppass = data.password
    let temp = data.temp
    temppass.split("").forEach(char =>{
      if(char>='A'&&char<='Z')
      {
        checkU = true
        count++
      }
      if(char>='0'&&char<='9')
      {
        checkN = true
        count++
      }
      count++
      }
    )
    let email_check = data.email.split("@")[1]
    let checkEmail = email_check==="gmail.com"||email_check ==="email.com"||email_check === "hotmail.com"
    if(checkN&&checkU&&count>=8&&checkEmail)
    {
      this.setState({user:data.user,
        email:data.email,
        password:data.password,
        name : data.name,
        surname: data.surname,
        address:data.address,
        phone:data.phone},()=>{
        fire
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .catch((err)=>{
          checkA = false
          switch(err.code)
          {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                this.setState({emailerror:err.message})
                break;
              case "auth/weak-password":
                this.setState({passworderror:err.message})
                break;
          }
          })
        })
    }
    else if(checkEmail == false)
    {
      this.setState({emailerror:"Invalid email"})
    }
    else
    {
      this.setState({passworderror:"Week-password"})
    }
  }
  logedOut = () =>
  {
    this.clearInput()
    this.clearError()
    fire.auth().signOut()
  }
  authListener =()=>
  {
      fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user:user},()=>{this.load_user()})
      }
      else
      {
        this.setState({user:""})
      }
    })
  }
  change_addmin =(i)=>
  {
    let data = this.state.All_user;
    data[Object.keys(this.state.All_user)[i]]['is_AdMin'] = !data[Object.keys(this.state.All_user)[i]]['is_AdMin']
    this.setState({All_user:data})
  }
  save_all_user = ()=>
  {
    fire.database().ref("/user").set(this.state.All_user)
  }
  render()
  {
    return (
      <Router basename = {"/SAD_PROJECT_01"}>
        <div className = "App">
          <Switch>
              <Route path = "/login" render = {props => 
                <Login 
                  email = {this.state.email} emailerror = {this.state.emailerror}
                  password = {this.state.password} passworderror = {this.state.passworderror}
                  logedIn = {this.logedIn} Login_check = {this.state.user}
                  clearError = {this.clearError}
                />}/>
              <Route path = "/register" render = {props => 
              <Register
                signUp = {this.signedUp}
                email = {this.state.email} emailerr = {this.state.emailerror}
                password = {this.state.password} passworderr = {this.state.passworderror}
                clearError = {this.clearError} Login_check = {this.state.user} inputerr = {this.state.inputerror}
              />}/>
              <Route path = "/home" render = {props =>
                <Home
                  logedOut = {this.logedOut}
                  Login_check = {this.state.user}
                  email = {this.state.email}
                  name = {this.state.name+" "+this.state.surname}
                  clear = {this.clearInput}
                  is_AdMin = {this.state.is_AdMin}
                  product_data = {this.state.product}
                  save_product = {this.save_product}
                  cart_add = {this.add_2_cart}
                  c_product = {this.state.count_product}
                  hadle_change = {this.count_product}
                  load_all_user = {this.load_all_user}
                  All_user = {this.state.All_user}
                  change_addmin = {this.change_addmin}
                  save_all_user = {this.save_all_user}
                  user = {this.state.user}
                  edit_product = {this.edit_product}
                  load_product = {this.load_product}
                  save_all_product = {this.save_all_product}
                  remove_product = {this.remove_product}
                  All_order = {this.state.All_order}
                  load_order = {this.load_order}
                  Cart = {this.state.Cart}
                  edit_cart = {this.edit_cart}
                  edit_cart_confirm = {this.edit_cart_confirm}
                  edit_cart_mode = {this.edit_cart_mode}
                  All_product_type = {this.state.All_product_type}
                  add_type = {this.add_type}
                  remove_type = {this.remove_type}
                  remove_cart = {this.remove_cart}
                />}/>
                <Route path = "/edit" render = {props =>
                <Edit_profile 
                  email = {this.state.email}
                  surname = {this.state.surname}
                  name = {this.state.name}
                  phone = {this.state.phone}
                  address = {this.state.address}
                  order = {this.state.All_order}
                  user = {this.state.user}
                  logedOut = {this.logedOut}
                  edit_profile = {this.edit_profile}
                  />}/>
                <Route path ="/bill" render = {props => <Bill 
                  save_order = {this.save_order}
                  Cart = {this.state.Cart}
                  user = {this.state.user}
                  name = {this.state.name+" "+this.state.surname}
                  />}/>  
                <Route path ="/order" render ={props=> <Check_order
                  order = {this.state.All_order}
                  user = {this.state.user}
                  name = {this.state.name+" "+this.state.surname}
                  logedOut = {this.logedOut}
                />}/>
                <Redirect to = "/home"></Redirect>
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App;