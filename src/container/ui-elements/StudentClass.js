import React from 'react';
import { useLocation } from "react-router-dom";
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { StudentClassTab } from '../../components/tabs/studentclasstab';
import tabData from '../../demoData/tab-data.json';

const { data, dataIcon, icon } = tabData;

function StudentClass() {
  const location = useLocation();
  const { fromCourse } = location.state;
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Tabs',
    },
  ];
  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title={fromCourse.title} routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col md={25} xs={24}>
            <StudentClassTab data={data} />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default StudentClass;
