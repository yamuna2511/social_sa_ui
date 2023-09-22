import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { UserTableStyleWrapper } from './style';
import { TableWrapper } from './styled';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import UserList from './StudentListDataTable';


function UserListTable(props) { 
 
  const usersTableData = [];

  const students = props.studentData; 

  students.map((user) => {
    const { userId, firstName, lastName, mobile, mailId} = user;

    return usersTableData.push({
      key: userId,
      user: (
        <div className="user-info">
          <figcaption>
            <Heading className="user-name" as="h6">
              {firstName + ' ' + lastName}
            </Heading>
            <span className="user-designation">San Francisco, Test</span>
          </figcaption>
        </div>
      ), 
      batchName: "2023-AI-Batch-1",   
      mobile: mobile, 
      mailId: mailId,
      action: (
        <div className="table-actions">
          <Button className="btn-icon" type="primary" to="#" shape="circle">
            <UilEye />
          </Button>
          <Button className="btn-icon" type="info" to="#" shape="circle">
            <UilEdit />
          </Button>
          <Button className="btn-icon" type="danger" to="#" shape="circle">
            <UilTrashAlt />
          </Button>
        </div>
      ),
    });
  });
  

  const usersTableColumns = [
    {
      title: 'Student',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Batch',
      dataIndex: 'batchName',
      key: 'batchName',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'mailId',
      key: 'mailId',
    },    
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
}

export default UserListTable;
