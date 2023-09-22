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

function StudentClassGallerya() {
  const location = useLocation();
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
    setState({
      ...state,
      activeClass: value,
    });
  };

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="test" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col xs={24}>
            <GalleryNav>
              <ul>
                <li>
                  <Link
                    className={state.activeClass === '' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('')}
                    to="./preassignment"
                  >
                    Pre-Assignment
                  </Link>
                </li>
                <li>
                  <Link
                    className={state.activeClass === 'webDesign' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('webDesign')}
                    to="./content"
                  >
                    Class
                  </Link>
                </li>
                <li>
                  <Link
                    className={state.activeClass === 'uiDesign' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('uiDesign')}
                    to="#"
                  >
                    Assignment
                  </Link>
                </li>
                <li>
                  <Link
                    className={state.activeClass === 'wireframe' ? 'active' : 'deactivate'}
                    onClick={() => handleChange('wireframe')}
                    to="#"
                  >
                    Study Material
                  </Link>
                </li>
              </ul>
            </GalleryNav>
          </Col>
          <Col xxl={24} lg={24} sm={24} xs={24}>
            <Suspense
            fallback={
                <Cards headless>
                <Skeleton active />
                </Cards>
            }
            >
            <Routes>
                <Route path="preassignment/*" element={<Assignmentb />} />
                <Route path="content" element={<StudentClass />} />
            </Routes>
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default StudentClassGallerya;
