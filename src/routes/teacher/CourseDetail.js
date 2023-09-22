import React, { useState } from 'react';
import { Row, Col, Form, Input, Upload, Select, Radio, DatePicker} from 'antd';
import { Link } from 'react-router-dom';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilCheck from '@iconscout/react-unicons/icons/uil-user';
import { BasicFormWrapper } from './styled';
import { Button } from '../../components/buttons/buttons';
import Heading from '../../components/heading/heading';
import { FigureWizards, WizardWrapper, OrderSummary, WizardTwo } from './pageStyle';
import { Steps } from '../../components/steps/steps';
import { Cards } from '../../components/cards/frame/cards-frame';
import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';

const dateFormat = 'MM/DD/YYYY';

const { Option } = Select;
function Info() {
  const [state, setState] = useState({
    values: '',
    isFinished: false,
    current:1,
  });
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    setState({ ...state, values });
  };

  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const done = () => {
    const confirm = window.confirm('Are you sure to submit the details?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
  };
  const { status, isFinished, current } = state;


  return (
    <WizardWrapper className="ninjadash-wizard-page">
    <WizardTwo>
      <Steps
        isswitch
        current={0}
        status={status}
        steps={[
          {
            title: 'Course Details',
            className: 'wizard-step-item',
            icon: <UilBookOpen />,
            content: (
          <BasicFormWrapper className="basic-form-inner">
             <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="course-form">
                      <Form form={form} name="course">
                      <Form.Item name="coursename" label="Course Name">
                          <Input placeholder="CourseName" />
                        </Form.Item>
                        <Form.Item name="courseduration" label="Course Duration">
                          <Input placeholder="CourseDuration" />
                        </Form.Item>
                        <Form.Item name="description" label="Course Description">
              <Input.TextArea rows={4} placeholder="Course Description" />
            </Form.Item>                
            </Form>
            </div>
                    </Col>
                  </Row>
                </div>
          </BasicFormWrapper>
            ),
          },
          {
            title: 'Module Details',
            className: 'wizard-step-item',
            icon: <UilBookOpen />,
            content: (
          <BasicFormWrapper className="basic-form-inner">
             <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="module-form">
                      <Form form={form} name="course">
                      <Form.Item name="modulename" label="Module Name">
                <Input placeholder="Module Name" />
              </Form.Item>

              <Form.Item name="moduledescription" label="Module Description">
              <Input.TextArea rows={4} placeholder="Module Description" />
            </Form.Item>         
            </Form>
            </div>
                    </Col>
                  </Row>
                </div>
          </BasicFormWrapper>
            ),
          },
          {
            title: 'Topic Details',
            className: 'wizard-step-item',
            icon: <UilBookOpen />,
            content: 
            status !== 'finish' ? (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="topic-form">
                        <Form form={form} name="topic">
                        <Form.Item name="topicname" label="Topic Name">
                <Input placeholder="Topic Name" />
              </Form.Item>
              <Form.Item name="topicseqno" label="Topic SequenceNo.">
                <Input placeholder="Sequence No." />
              </Form.Item>
              <Form.Item name="topictype" label="Topic Type.">
                <Input placeholder="Topic Type" />
              </Form.Item>
              <Form.Item name="topicdescription" label="Topic Description">
              <Input.TextArea rows={4} placeholder="Topic Description" />
            </Form.Item>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
              </BasicFormWrapper>
            ) : (
              <Row justify="center" style={{ width: '100%' }}>
                <Col xl={21} xs={24}>
                  <div className="checkout-successful">
                    <Cards
                      headless
                      bodyStyle={{
                        borderRadius: '20px',
                      }}
                    >
                      <Cards headless>
                        <span className="icon-success">
                          <UilCheck />
                        </span>
                        <Heading as="h3">Course added Successfully</Heading>
                        <p>Thank you!</p>
                      </Cards>
                    </Cards>
                  </div>
                </Col>
              </Row>
            ),
          },
        ]}
      onNext={next}
      onPrev={prev}
      onDone={done}
      isfinished={isFinished}
    />
  </WizardTwo>
</WizardWrapper>

  );

}

export default Info;
