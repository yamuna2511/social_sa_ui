/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, lazy, Suspense, useLayoutEffect } from 'react';
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin, Input, Form, Modal } from 'antd';
import UilAngleLeft from '@iconscout/react-unicons/icons/uil-angle-left';
import UilAngleRight from '@iconscout/react-unicons/icons/uil-angle-right';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { FixedSidebar, SidebarWrap, Bullet } from './style';
import { Main, BasicFormWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { taskAddData } from '../../redux/task/actionCreator';

const All = lazy(() => import('./overview/all'));
const Favourites = lazy(() => import('./overview/favourites'));
const Completed = lazy(() => import('./overview/completed'));
const MultipleChoice = lazy(() => import('./overview/multiplechoice'));
const Passage = lazy(() => import('./overview/passage'));

function Assignmentsb() {
  const [form] = Form.useForm();
  // const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { taskData } = useSelector((state) => {
    return {
      taskData: state.Task.data,
    };
  });

  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
    visible: false,
    modalType: 'primary',
  });

  const showModal = () => {
    setState({
      ...state,
      visible: true,
      collapsed: false,
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const handleAddTask = (values) => {
    handleCancel();
    const arrayData = [];
    taskData.map((data) => {
      return arrayData.push(data.id);
    });

    const max = Math.max(...arrayData);
    dispatch(
      taskAddData([
        ...taskData,
        {
          ...values,
          id: max + 1,
          favourite: false,
          completed: false,
        },
      ]),
    );
  };

  const { responsive, collapsed } = state;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  const path = '/';
  return (
    <>
      <Main>
        <Row gutter={25}>
          <Col xxl={5} lg={6} md={7} xs={24}>
            {responsive > 767 ? (
              <>
                <SidebarWrap className="mb-30">
                  <div className="ninjadash-taskApp-sidebar">
                    <ul className="ninjadash-taskApp-sidebar__nav">
                      <li className="ninjadash-taskApp-sidebar__nav--item">
                        <NavLink className="ninjadash-taskApp-sidebar__nav--link" to="./mcq">
                        <Bullet className="personal" /><span className="nav-item-text">Question 1</span>
                        </NavLink>
                      </li>
                      <li className="ninjadash-taskApp-sidebar__nav--item">
                        <NavLink className="ninjadash-taskApp-sidebar__nav--link" to="./passage">
                        <Bullet className="personal" /><span className="nav-item-text">Question 2</span>
                        </NavLink>
                      </li>
                      <li className="ninjadash-taskApp-sidebar__nav--item">
                        <NavLink className="ninjadash-taskApp-sidebar__nav--link" to="./coding">
                        <Bullet className="personal" /><span className="nav-item-text">Question 3</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </SidebarWrap>
              </>
            ) : (
              <FixedSidebar className={collapsed ? 'show' : 'hide'}>
                <Link to="#" type="link" className="trigger-close" onClick={toggleCollapsed}>
                  <UilTimes />
                </Link>
                <SidebarWrap className="mb-30">
                  <div className="ninjadash-taskApp-sidebar">
                    <ul className="ninjadash-taskApp-sidebar__nav">
                      <li className="ninjadash-taskApp-sidebar__nav--item">
                        <NavLink className="ninjadash-taskApp-sidebar__nav--link" to="./mcq">
                        <Bullet className="personal" /><span className="nav-item-text">Question 1</span>
                        </NavLink>
                      </li>
                      <li className="ninjadash-taskApp-sidebar__nav--item">
                        <NavLink className="ninjadash-taskApp-sidebar__nav--link" to="./passage">
                          <Bullet className="personal" /><span className="nav-item-text">Question 2</span>
                        </NavLink>
                      </li>
                      <li className="ninjadash-taskApp-sidebar__nav--item">
                        <NavLink className="ninjadash-taskApp-sidebar__nav--link" to="./coding">
                        <Bullet className="personal" /><span className="nav-item-text">Question 3</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </SidebarWrap>
              </FixedSidebar>
            )}
          </Col>
          <Col xxl={19} lg={18} md={17} xs={24}>
            {responsive <= 767 && (
              <div className="sidebar-trier-wrap text-center mb-30">
                <Button type="link" className="sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAngleLeft /> : <UilAngleRight />}
                </Button>
              </div>
            )}
            <Suspense
              fallback={
                <div className="spin">
                  <Spin />
                </div>
              }
            >
            <Routes>
                <Route path="mcq" element={<MultipleChoice />} />
                <Route path="passage" element={<Passage />} />
            </Routes>
            </Suspense>
          </Col>
        </Row>
        <span
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          className={collapsed ? 'overlay-dark show' : 'overlay-dark'}
          onClick={toggleCollapsed}
        />
      </Main>
    </>
  );
}

export default Assignmentsb;
