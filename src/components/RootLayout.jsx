import React, { useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import FloatButton from './FloatButton';
import Modal from './Modal';
import {useUserStore} from "../store/userStore.js";
import {navigate} from "jsdom/lib/jsdom/living/window/navigation.js";
import {useNavigate} from "react-router-dom";

export default function RootLayout() {
    const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useUserStore();

    const handleOpenModal = () => {
        if (!isAuthenticated) {
            alert("로그인 후 이용해주세요.");
            navigate('/auth/login');
            return;
        }
        setIsModalOpen(true);
    };


    return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
        <main className='w-full px-4 py-8'>
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        <Outlet />
      </main>
      <FloatButton setIsModalOpen={handleOpenModal} isModalOpen={isModalOpen} />
    </div>
  );
}
