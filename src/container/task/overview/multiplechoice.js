import React from 'react';
import { Radio, notification } from 'antd';
import { TaskListWrap } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';

function MultipleChoice() {
  const submit = () => {
    notification['success']({
      message: 'Answer Submitted',
      description:
        'Please proceed to next question',
    });
  };

  return (
    <TaskListWrap className="mb-30">
      <Cards headless>
        <div>
          <p><b>Please select the capital city of india from below list</b></p>
        </div>
        <Radio.Group>
            <div className="ant-radio-vertical">
                <Radio value={1}>Chennai</Radio>
                <Radio value={2}>Pune</Radio>
                <Radio value={3}>Gujarat</Radio>
                <Radio value={4}>New Delhi</Radio>
            </div>
            <div style={{paddingTop: "20px"}}>
              <Button onClick={submit} size="default" shape="circle" type="primary">
                  Submit
              </Button>
            </div>
        </Radio.Group>
      </Cards>
    </TaskListWrap>
  );
}

export default MultipleChoice;
