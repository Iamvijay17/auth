import { Button, Modal, Typography } from 'antd';
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import Signup from '../../pages/account';
import styles from "./styles.module.css";

const { Title } = Typography;

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  return (
    <div className={styles.wrapper}>
      <div>Hi Navbar</div>
      <div className={styles.menu}>
        <div>  <NavLink to="/"><Title level={5} className='hover:text-primary-color'>Home</Title></NavLink></div>
        <div>
          <NavLink to="destination">  <Title level={5} className='hover:text-primary-color'>Destination</Title></NavLink></div>
        <div><NavLink to="stories"><Title level={5} className='hover:text-primary-color'>Stories</Title></NavLink></div>
        <div><NavLink to="reviews"><Title level={5} className='hover:text-primary-color'>Reviews</Title></NavLink></div>
      </div>
      <div className="flex align-center gap-10">
        <IoSearch className='text-xl mt-3 hover:text-primary-color cursor-pointer'/>
        <Button size='large' shape="round" className='hover:text-primary-color hover:border-primary-color font-semibold' onClick={() => setIsModalOpen(true)}>Login</Button>
      </div>

      <>
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          maskClosable={false}
          width={null}
          closeIcon={null}
          centered
        >
          <div className="!border-rounded-lg">
            <Signup />
          </div>
        </Modal>

      </>
    </div>
  );
};

export default Navbar;
