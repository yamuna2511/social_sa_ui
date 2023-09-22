import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './dashboard';
import withTeacherLayout from '../../layout/withTeacherLayout';

const NotFound = lazy(() => import('../../container/pages/404'));
const AddUser = lazy(() => import('./StudentDetail'));
const AddBatch = lazy(() => import('./StudentBatch'));
const Student = lazy(() => import('./StudentListDataTable'));

const AddCourse = lazy(() => import('./CourseDetail'));
const Course = lazy(() => import('./CourseListDataTable'));
const StudentClass = lazy(() => import('../../container/ui-elements/StudentClass'));

const Teacher = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index path="/*" element={<Dashboard />} />
        <Route path="student" element={<Student />} />
        <Route path="course" element={<Course />} />
        <Route path="add-user/*" element={<AddUser />} />
        <Route path="add-batch/*" element={<AddBatch />} />
        <Route path="add-course/*" element={<AddCourse />} />
        <Route path="studentclassdetails" element={<StudentClass />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withTeacherLayout(Teacher);
