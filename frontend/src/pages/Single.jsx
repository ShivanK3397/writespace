import React from 'react'
import Logo from "../images/writespacelogo.jpg"
import Edit from "../images/edit.png"
import Delete from "../images/delete.png"
import { Link } from 'react-router';
import Menu from '../components/Menu';
const Single = () => {
  return (
    <div className='single'>
      <div className="content">
        <img src={Logo} alt="" /> 
        <div className="user">
          <img src={Logo} alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
            <img src={Edit} alt="" />
            </Link> 
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit inventore quibusdam laborum! Assumenda incidunt repellendus quia hic enim alias, error rerum, nostrum ratione quaerat accusamus reiciendis delectus repudiandae deleniti.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit inventore quibusdam laborum! Assumenda incidunt repellendus quia hic enim alias, error rerum, nostrum ratione quaerat accusamus reiciendis delectus repudiandae deleniti
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit inventore quibusdam laborum! Assumenda incidunt repellendus quia hic enim alias, error rerum, nostrum ratione quaerat accusamus reiciendis delectus repudiandae deleniti
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit inventore quibusdam laborum! Assumenda incidunt repellendus quia hic enim alias, error rerum, nostrum ratione quaerat accusamus reiciendis delectus repudiandae deleniti
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit inventore quibusdam laborum! Assumenda incidunt repellendus quia hic enim alias, error rerum, nostrum ratione quaerat accusamus reiciendis delectus repudiandae deleniti
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae velit inventore quibusdam laborum! Assumenda incidunt repellendus quia hic enim alias, error rerum, nostrum ratione quaerat accusamus reiciendis delectus repudiandae deleniti
        </p>
      </div>
      <Menu/>
    </div>
  )
}

export default Single
