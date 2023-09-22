import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import UserListTable from './StudentTable';
import { Main, CardToolbox } from './styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import Heading from '../../components/heading/heading';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Button } from '../../components/buttons/buttons';
import StudentBatch from './StudentBatch';

function UserList() {

  const [students, setStudents] = useState([])  

  const { searchData, users } = useSelector((state) => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    selectedRowKeys: 0,
    selectedRows: 0,
    students: students
  });

  const { notData } = state;

  const handleSearch = (searchText) => {
    const data = searchData.filter((item) => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const [showStudBatch, setShowStudBatch] = useState(false) 
  const setBatchFlag = () => {
    setShowStudBatch(true)
  }

  

  useEffect(() => {
    fetch('/user/all')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setStudents(result);
      });
  },[]); 

  return (
    <>
      <CardToolbox>
        <PageHeader
          className="ninjadash-page-header-main"
          ghost
          title="All Students"
          subTitle={
            <>
              <span className="title-counter">24 Students </span>
              <AutoComplete
                onSearch={handleSearch}
                dataSource={notData}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
          buttons={[
            <Button className="btn-add_new" size="default" type="primary" key="1">
              <Link to="/teacher/add-user/StudentDetail">+ Add New Student</Link>
            </Button>,
            <Button className="btn-add_new" size="default" type="primary" key="2"
            onClick={setBatchFlag}>
            <Link to="/teacher/add-batch/StudentBatch">+ Add New Batch</Link>
          </Button>,
          ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable studentData={students} />
            <StudentBatch studentData={students} />
          </Col>
        </Row>
      </Main>   

      <Main>
        <Row gutter={15}>
          <Col md={24}>
              { showStudBatch ? <StudentBatch studentData={students} /> : null }
          </Col>
        </Row>
      </Main>    

    </>
  );
}

export default UserList;
