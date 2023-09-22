import React, { useState, lazy, useEffect} from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { Row, Col, Collapse, Spin } from 'antd';
import UilPlay from '@iconscout/react-unicons/icons/uil-play';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import ModalVideo from 'react-modal-video';
import { CourseDetailsWrap } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CollapseStyleWrap } from '../styled';
import { Button } from '../../components/buttons/buttons';
import '../profile/myProfile/overview/video-modal.css';

const StudentClassGallery = lazy(() => import('../pages/StudentClassGallery'));
const NotFound = lazy(() => import('../../container/pages/404'));
const { Panel } = Collapse;
const PageRoutes = [
  {
    path: 'index',
    breadcrumbName: 'Dashboard',
  },
  {
    path: 'course',
    breadcrumbName: 'Courses',
  },
];


function CourseDetails() {
  const path = '/student';
  const [isOpen, setOpen] = useState(false);  

  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch('/course/getCourses?courseId=3')
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setCourseName(result.courseName);
        setCourseDesc(result.courseDescription);  
        setModules(result.module);      
      });
  },[]); 

  return (
    <CourseDetailsWrap>
      <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />
      <PageHeader className="ninjadash-page-header-main" title="Course " routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col lg={12} xs={24}>
            <div className="ninjadash-course-details-wrap">
              <div className="ninjadash-course-content">
                <h2 className="ninjadash-course-content-top-title">{courseName}</h2>
                <h2 className="ninjadash-course-content__title">About This Course </h2>
                <p>{courseDesc}</p>
                <h2 className="ninjadash-course-content__title">Course content </h2>
                <div className="ninjadash-course-content__lectures">
                  <CollapseStyleWrap>
                    <Collapse
                      bordered={false}
                      defaultActiveKey={['1']}
                      expandIcon={({ isActive }) => (isActive ? <UilMinus /> : <UilPlus />)}
                    >
                      {modules.map((lecture) => (
                        <Panel
                          header={lecture.moduleName}
                          key={lecture.moduleId}
                          extra={
                            <>
                              <span>{lecture.topic.length} Lectures</span>
                            </>
                          }
                        >
                          <ul>
                            {lecture.topic.map((singletopc, index) => (
                              <li key={index}>
                                <Link
                                  className="ninjadash-course-content__lecture--single"
                                  to={`${path}/class`} state={{ fromCourse: {id: singletopc.topicId, title: singletopc.topicName} }}
                                >
                                  <UilPlay />
                                  <span className="ninjadash-course-content__lecture--title">
                                    {singletopc.topicName}
                                  </span>
                                  <div className="ninjadash-course-content__lecture--extra">
                                    <p>Pre-Assignment</p>&nbsp;&nbsp;
                                    <p>Post-Assignment</p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Panel>
                      ))}
                    </Collapse>
                  </CollapseStyleWrap>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </CourseDetailsWrap>
  );
}

export default CourseDetails;
