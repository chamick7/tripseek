import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useRecoilValue, atom } from "recoil";
import { account as accountAtom } from "../atom";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";




import '../css/navbar.css';

export default function Navbar(props) {
    const history = useHistory();
    const [accountData , setAccountData] = useRecoilState(accountAtom);


    const handleLogout = () =>{
        Cookies.remove('token');
        setAccountData({});
        history.push('/');
        
    }
    
    const account = useRecoilValue(accountAtom)
    return (
        <nav className="navBar">
            <ul className="logo">
                <Link to="/">
                <li>Trip<span>Seek</span></li>
                </Link>
            </ul> 
            <ul className="nav-btn">
                { props.isLogined?  
                <>
                    {accountData.email}
                    <button className="login-btn" onClick={handleLogout}>Log Out</button> 
                </>
                    :
                <>
                <li><Link to="/login"> <button className="login-btn">Log in</button></Link></li>
                <li> <Link to="/register" >  <button className="reg-btn">Register</button> </Link> </li> 
                </>
                }
            </ul>
        </nav>
    )
}
