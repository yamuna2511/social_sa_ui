import React, { useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spin, Skeleton } from 'antd';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import { GalleryNav } from './style';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import { galleryFilter } from '../../redux/gallary/actionCreator';
import { Cards } from '../../components/cards/frame/cards-frame';

const StudentClass = lazy(() => import('../course/StudentClass'));
const StudentLectureNote = lazy(() => import('../project/overview/StudentLectureNote'));
const Assignment = lazy(() => import('../../container/note/Assignments'));
const Assignmentb = lazy(() => import('../../container/task/Asssignmentb'));
const MultipleChoice = lazy(() => import('../../container/task/overview/multiplechoice'));

function StudentClassGallery() {
  const location = useLocation();
  const { fromCourse } = location.state;
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Gallery',
    },
  ];

  const dispatch = useDispatch();
  const { gallery, isLoading } = useSelector((state) => {
    return {
      gallery: state.gallery.data,
      isLoading: state.gallery.loading,
    };
  });

  const [state, setState] = useState({
    activeClass: '',
  });

  const handleChange = (value) => {
    dispatch(galleryFilter('category', value));
    setState({
      ...state,
      activeClass: value,
    });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title={fromCourse.title} routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <GalleryNav>
              <ul>
                <li>
                  <Link
                    className={state.activeClass === '' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('')}
                    to="#" state={{ fromCourse: {id: fromCourse.id, title: fromCourse.title, tab: 'PA'} }}
                  >
                    Pre-Assignment
                  </Link>
                </li>
                <li>
                  <Link
                    className={state.activeClass === 'webDesign' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('webDesign')}
                    to="#" state={{ fromCourse: {id: fromCourse.id, title: fromCourse.title, tab: 'C'} }}
                  >
                    Class
                  </Link>
                </li>
                <li>
                  <Link
                    className={state.activeClass === 'uiDesign' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('uiDesign')}
                    to="#" state={{ fromCourse: {id: fromCourse.id, title: fromCourse.title, tab: 'A'} }}
                  >
                    Assignment
                  </Link>
                </li>
                <li>
                  <Link
                    className={state.activeClass === 'wireframe' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('wireframe')}
                    to="#" state={{ fromCourse: {id: fromCourse.id, title: fromCourse.title, tab: 'SM'} }}
                  >
                    Study Material
                  </Link>
                </li>
              </ul>
            </GalleryNav>
          </Col>
          {isLoading ? (
            <Col xs={24}>
              <div className="spin">
                <Spin />
              </div>
            </Col>
          ) : (
            gallery.map((item) => {
              const { id } = item;
              return (
                <>
                <Col key={id} xxl={24} lg={24} sm={24} xs={24}>
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton active />
                      </Cards>
                    }
                  >
                    {fromCourse.tab === 'C' && <StudentClass />}
                    {fromCourse.tab === 'PA' && <Assignmentb fromCourse={fromCourse}/>}
                    <Routes>
                      <Route path="all" element={<MultipleChoice />} />
                    </Routes>
                  </Suspense>
                </Col>
                </>
              );
            })
          )}
        </Row>
      </Main>
    </>
  );
}

export default StudentClassGallery;
