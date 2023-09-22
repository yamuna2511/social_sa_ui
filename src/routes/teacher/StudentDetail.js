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

const dateFormat = 'DD-MMM-yyyy';

const { Option } = Select;
function StudentDetail() {
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

  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [stateAddress, setStateAddress] = useState('')
  const [city, setCity] = useState('')

  const [parentFirstName, setParentFirstName] = useState('')
  const [parentMiddleName, setParentMiddleName] = useState('')
  const [parentLastName, setParentLastName] = useState('')
  const [relation, setRelation] = useState('')
  const [parentMobile, setParentMobile] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [responseMsg, setResponseMsg] = useState('')
  const [additionalMsg, setAdditionalMsg] = useState('')
  

  const done = () => {
    const confirm = window.confirm('Are you sure to submit the details?');
    if (confirm) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });

      fetch('/user/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userType : 'S',
          firstName : firstName.trim(),
          middleName : middleName.trim(),
          lastName : lastName.trim(),
          dob : dob.toString(),
          gender : gender.trim(),
          address1 : address1.trim(),
          address2 : address2.trim(),
          city : city.trim(),
          state : stateAddress.trim(),
          mobile : mobile.trim(),          
          mailId : email.trim(),
          parentDetailDTO : {
            firstName : parentFirstName.trim(),
            middleName : parentMiddleName.trim(),
            lastName : parentLastName.trim(),
            relationType : relation.trim(),
            mobile : parentMobile.trim(),
            mailId : parentEmail.trim()
          }
        })
      })
      .then(response => response.json())
      .then(result => {
        setResponseMsg(result.message);
        console.log(result.status==='success')
        if(result.status==='success')         
          setAdditionalMsg('Thank you!')
        else 
          setAdditionalMsg('Please enter mandatory fields and try again!')    
      })
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
            title: 'Student Details',
            className: 'wizard-step-item',
            icon: <UilUser />,
            content: (
          <BasicFormWrapper className="basic-form-inner">
             <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="student-form">
                      <Form form={form} name="student">
              <Form.Item name="firstname" label="First Name" required='true' value = {firstName} onChange={e => setFirstName(e.target.value)}>
                          <Input placeholder="FirstName" />
                        </Form.Item>
                        <Form.Item name="middlename" label="Middle Name" value = {middleName} onChange={e => setMiddleName(e.target.value)}>
                          <Input placeholder="MiddleName" />
                        </Form.Item>
                        <Form.Item name="lastname" label="Last Name" required='true' value = {lastName} onChange={e => setLastName(e.target.value)}>
                          <Input placeholder="LastName" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender" required='true' value = {gender} onChange={e => setGender(e.target.value)}>
                        <Radio.Group defaultValue="a">
                    <Radio.Button value="M">Male</Radio.Button>
                    <Radio.Button value="F">Female</Radio.Button>
                    <Radio.Button value="O">Others</Radio.Button>
                  </Radio.Group>
                  </Form.Item>
                        
              <Form.Item name="dob" rules={[{ type: 'object', whitespace: true }]} label="Date of Birth" >
                <DatePicker format={dateFormat} style={{ width: '100%' }} selected={dob} onChange={(dob) => setDob(dob.format('DD-MMM-yyyy'))} />
              </Form.Item>
                        <Form.Item name="phone" label="Mobile No." required='true' value = {mobile} onChange={e => setMobile(e.target.value)}>
                          <Input placeholder="Phone" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email' }]} label="Email Address" required='true' value = {email} onChange={e => setEmail(e.target.value)}>
                          <Input placeholder="name@gmail.com" />
                        </Form.Item>
                        <Form.Item name="address1" label="Address1" value = {address1} onChange={e => setAddress1(e.target.value)}>
                          <Input placeholder="Address1" />
                        </Form.Item>
                        <Form.Item name="address2" label="Address2" value = {address2} onChange={e => setAddress2(e.target.value)}>
                          <Input placeholder="Address2" />
                        </Form.Item>
                        <Form.Item name="state" label="State" value = {stateAddress} onChange={e => setStateAddress(e.target.value)}>
                          <Input placeholder="State" />
                        </Form.Item>
                        <Form.Item name="city" label="City" value = {city} onChange={e => setCity(e.target.value)}>
                          <Input placeholder="City" />
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
            title: 'Parent Details',
            className: 'wizard-step-item',
            icon: <UilUser />,
            content: 
            status !== 'finish' ? (
              <BasicFormWrapper className="basic-form-inner">
                <div className="atbd-form-checkout">
                  <Row justify="center">
                    <Col sm={22} xs={24}>
                      <div className="parent-form">
                        <Form form={form} name="parent">
                        <Form.Item name="parentFirstName" label="First Name" required='true' value = {parentFirstName} onChange={e => setParentFirstName(e.target.value)}>
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item name="parentMiddleName" label="Middle Name" value = {parentMiddleName} onChange={e => setParentMiddleName(e.target.value)}>
                <Input placeholder="Middle Name" />
              </Form.Item>

              <Form.Item name="parentLastName" label="Last Name" value = {parentLastName} onChange={e => setParentLastName(e.target.value)}>
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item name="relation" initialValue="active" label="Relation" required='true' value = {relation} onChange={e => setRelation(e.target.value)}>
                <Radio.Group>
                  <Radio value="Father">Father</Radio>
                  <Radio value="Mother">Mother</Radio>
                  <Radio value="Guardian">Guardian</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="parentMobile" label="Phone No." required='true' value = {parentMobile} onChange={e => setParentMobile(e.target.value)}>
                          <Input placeholder="Phone" />
                        </Form.Item>
                        <Form.Item name="parentEmail" rules={[{ type: 'email' }]} label="Email Address" value = {parentEmail} onChange={e => setParentEmail(e.target.value)}>
                          <Input placeholder="name@gmail.com" />
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
                        <Heading as="h3">{responseMsg}</Heading>
                        <p>{additionalMsg}</p>
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

export default StudentDetail;
