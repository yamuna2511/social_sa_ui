import React, { useState, lazy, Suspense, useLayoutEffect } from 'react';
import { Row, Col, Form, Input, Select, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import UilStar from '@iconscout/react-unicons/icons/uil-star';
import UilAlignLeft from '@iconscout/react-unicons/icons/uil-align-left';
import UilAlignRight from '@iconscout/react-unicons/icons/uil-align-right';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import { NoteNav, NoteWrapper, Bullet } from './style';
import { BasicFormWrapper, Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Modal } from '../../components/modals/antd-modals';
import { noteAddData } from '../../redux/note/actionCreator';

const All = lazy(() => import('./overview/all'));
const Favorite = lazy(() => import('./overview/favorite'));
const Personal = lazy(() => import('./overview/personal'));
const Work = lazy(() => import('./overview/work'));
const Social = lazy(() => import('./overview/social'));
const Important = lazy(() => import('./overview/important'));

const { Option } = Select;
function Assignment() {
  const { noteData } = useSelector((state) => {
    return {
      noteData: state.Note.data,
    };
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [state, setState] = useState({
    visible: false,
    modalType: 'primary',
    checked: [],
    responsive: 0,
    collapsed: false,
  });

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

  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const handleOk = (values) => {
    onCancel();
    const arrayData = [];
    noteData.map((data) => {
      return arrayData.push(data.key);
    });
    const max = Math.max(...arrayData);
    dispatch(
      noteAddData([
        ...noteData,
        {
          ...values,
          key: max + 1,
          time: new Date().getTime(),
          stared: false,
        },
      ]),
    );
    form.resetFields();
  };

  const handleCancel = () => {
    onCancel();
  };

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  const collapseSidebar = () => {
    setState({
      ...state,
      collapsed: false,
    });
  };

  const path = '.';

  return (
    <>
      <Main>
        <NoteWrapper>
          <Row className="justify-content-center" gutter={25}>
            <Col className="trigger-col" xxl={5} xl={7} lg={9} xs={24}>
              {responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Button>
              )}
              {responsive > 991 ? (
                <div className="sidebar-card">
                  <Cards headless>
                    <div className="note-sidebar-bottom">
                      <NoteNav>
                        <div className="nav-labels">
                          <ul>
                            <li>
                              <NavLink to={`${path}/personal`}>
                                <Bullet className="personal" /> Q1
                              </NavLink>
                            </li>
                            <li>
                              <Link to={`${path}/work`}>
                                <Bullet className="work" /> Q2
                              </Link>
                            </li>
                            <li>
                              <Link to={`${path}/social`}>
                                <Bullet className="social" /> Q3
                              </Link>
                            </li>
                            <li>
                              <Link to={`${path}/important`}>
                                <Bullet className="important" /> Q4
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </NoteNav>
                    </div>
                  </Cards>
                </div>
              ) : (
                <div className={collapsed ? 'sidebar-card note-sideabr show' : 'sidebar-card note-sideabr hide'}>
                  <Cards headless>
                    <div className="note-sidebar-bottom">
                      <NoteNav>
                        <div className="nav-labels">
                          <ul>
                            <li>
                              <NavLink to={`${path}/personal`} onClick={collapseSidebar}>
                                <Bullet className="personal" /> Personal
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to={`${path}/work`} onClick={collapseSidebar}>
                                <Bullet className="work" /> Work
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to={`${path}/social`} onClick={collapseSidebar}>
                                <Bullet className="social" /> Social
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to={`${path}/important`} onClick={collapseSidebar}>
                                <Bullet className="important" /> Important
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </NoteNav>
                    </div>
                  </Cards>
                </div>
              )}
            </Col>
            <Col xxl={19} xl={17} lg={15} xs={24}>
              <Suspense
                fallback={
                  <div className="spin">
                    <Spin />
                  </div>
                }
              >
                <Routes>
                  <Route path="all" element={<All />} />
                  <Route path="favorite" element={<Favorite />} />
                  <Route path="personal" element={<Personal />} />
                  <Route path="work" element={<Work />} />
                  <Route path="social" element={<Social />} />
                  <Route path="important" element={<Important />} />
                </Routes>
              </Suspense>
            </Col>
          </Row>
        </NoteWrapper>
      </Main>
    </>
  );
}

Assignment.propTypes = {
  // match: PropTypes.shape(PropTypes.object),
};
export default Assignment;
