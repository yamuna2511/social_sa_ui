import React, { useState } from 'react';
import { Row, Col, Collapse } from 'antd';
import ModalVideo from 'react-modal-video';
import { Link } from 'react-router-dom';
import { CourseDetailsWrap } from './Style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main, CollapseStyleWrap } from '../styled';
import { Button } from '../../components/buttons/buttons';
import '../profile/myProfile/overview/video-modal.css';

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

const lectures = [
  {
    id: '1',
    title: 'Getting Started',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
  {
    id: '2',
    title: 'User Interface Vs User Experience',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
  {
    id: '3',
    title: 'Design Fundamental',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
  {
    id: '4',
    title: 'Colour Theory',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
  {
    id: '5',
    title: 'Typography',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
  {
    id: '6',
    title: 'Live Project 01',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
  {
    id: '7',
    title: 'Live Project 02',
    classes: [
      {
        id: '1',
        classTitle: 'Course Introduction',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '2',
        classTitle: 'Demand of UI/UX Design',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
      {
        id: '3',
        classTitle: 'Tools',
        videoId: 'L61p2uyiMSo',
        duration: '5',
      },
    ],
  },
];

function StudentClass() {
  const [isOpen, setOpen] = useState(false);

  return (
    <CourseDetailsWrap>
      <ModalVideo channel="youtube" autoplay isOpen={isOpen} videoId="L61p2uyiMSo" onClose={() => setOpen(false)} />
      <Main>
        <Row gutter={25}>
          <Col lg={25} xs={24}>
            <div className="ninjadash-course-infobox">
              <div className="ninjadash-course-infobox__video">
                <iframe
                  height="315"
                  src="https://www.youtube.com/embed/dBd1j6x2HOo"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="ninjadash-course-infobox__action">
                <Button size="default" type="primary" onClick={() => setOpen(true)}>
                  Watch Recording
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Main>
    </CourseDetailsWrap>
  );
}

export default StudentClass;
