import React from 'react'
import SideBar from '../../components/SideBar/SideBar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import TableUser from './components/TableUser';

const users = [
  { id: 1, name: 'Hector Gutierrez', email: 'hgutierrez@gmail.com', active: true, avatar: 'https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Hector Gutierrez', email: 'hgutierrez@gmail.com', active: false, avatar: 'https://images.unsplash.com/photo-1747285726356-535557675eda?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

export default function ListUsers() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={"Lista de Usuarios"}/>
        <div className="p-4">
          <TableUser users={users} />
        </div>
      </div>
    </div>
  );
}
