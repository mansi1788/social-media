import React from 'react'
import logo from '../../img/logo.png'
// import { UilSearch } from '@iconscout/react-unicons';
import './LogoSearch.css'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        <img src={logo} alt=''width={50} />
        <div className="Search">
            <input type='text' placeholder='#Explore'/>
            <div className="s-icon">
            <i class="fas fa-search"></i>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch