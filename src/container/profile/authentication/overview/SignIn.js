import { Button, Col, Form, Input, Row, Switch } from 'antd';
import { Auth0Lock } from 'auth0-lock';
import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactSVG } from 'react-svg';
import { AuthFormWrap, ToggleButtonWrap } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import { auth0options } from '../../../../config/auth0';
import { login } from '../../../../redux/authentication/actionCreator';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const [isTeacher, setTeacher] = useState(false);
  const toggleButtonHandler = () => {
    setTeacher(!isTeacher);
  };

  const lock = new Auth0Lock(clientId, domain, auth0options);

  const handleSubmitForStudent = useCallback(
    (values) => {
      dispatch(login(values, () => navigate('/student')));
    },
    [navigate, dispatch],
  );

  const handleSubmitForTeacher = useCallback(
    (values) => {
      dispatch(login(values, () => navigate('/teacher')));
    },
    [navigate, dispatch],
  );

  const handleSubmit = useCallback(
    (values) => {
      dispatch(login(values, () => navigate('/admin')));
    },
    [navigate, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <ToggleButtonWrap>
          <div className="custom-center">
            <p>
              I am a Teacher : <Switch onChange={toggleButtonHandler} size="large" />
            </p>
          </div>
        </ToggleButtonWrap>
        <AuthFormWrap>
          <div className="ninjadash-authentication-top">
            <h2 className="ninjadash-authentication-top__title"> {isTeacher ? 'Teacher' : 'Student'} Sign in </h2>
          </div>
          <div className="ninjadash-authentication-content">
            <Form name="login" form={form} onFinish={isTeacher ? handleSubmitForTeacher : handleSubmitForStudent} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ message: 'Please input your Email!', required: true }]}
                label="Email Address"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ message: 'Please input your Password!', required: true }]}
              >
                <Input.Password />
              </Form.Item>
              <div className="ninjadash-auth-extra-links">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Keep me logged in
                </Checkbox>
              </div>
              <Form.Item>
                <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
              <p className="ninjadash-form-divider">
                <span>Or</span>
              </p>
              <ul className="ninjadash-social-login">
                <li>
                  <Link className="google-social" to="#">
                    <ReactSVG src={require(`../../../../static/img/icon/google-plus.svg`).default} />
                  </Link>
                </li>
              </ul>
            </Form>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignIn;
