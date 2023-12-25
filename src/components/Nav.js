import React from 'react';
import { Link,useNavigate } from 'react-router-dom';


const Nav=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate();
    
    const logout=()=>{
        // console.warn('apple')
        localStorage.clear();
        navigate("/Signup")
    }
    return(
        <div>
            <img className='logo' alt='not avail.' src='https://images-platform.99static.com//cTANeLvHk_EibhtgJcTQG_HMyko=/0x599:601x1200/fit-in/500x500/99designs-contests-attachments/101/101270/attachment_101270547'/>
            {auth?
            
            <ul className='nav-ul'>
                <li ><Link to="/">Products</Link></li>
                <li><Link to="/Add">Add Products</Link></li>
                <li><Link to="/Update">Update Products</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link onClick={logout} to="/Signup">Logout ({JSON.parse(auth).name})</Link></li>
             
            </ul>
            

:
<ul className='nav-ul nav-right' ><li> <Link to="/Signup">Signup</Link></li>
<li><Link to="/Login">Login</Link></li> 
</ul>} 
        </div>
    )

}

export default Nav;