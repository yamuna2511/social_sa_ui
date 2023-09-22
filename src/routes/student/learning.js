import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const StudentCourse = lazy(() => import('../../container/course/StudentCourseDetails'));
const NotFound = lazy(() => import('../../container/pages/404'));

function StudentLearningRoute() {
  return (
    <Routes>
      <Route path="course" element={<StudentCourse />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default StudentLearningRoute;
