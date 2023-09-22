import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Radio, notification } from 'antd';
import { TaskListWrap } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { ImportWord } from '@ckeditor/ckeditor5-import-word/src/importword';

function Passage() {
  const submit = () => {
    notification['success']({
      message: 'Answer Submitted',
      description:
        'Please proceed to next question',
    });
  };
  const editorConfiguration = {
    toolbar: [ 'bold', 'importWord' ]
  };
  return (
    <TaskListWrap className="mb-30">
      <Cards headless>
        <div>
          <p><b>Please select the capital city of india from below list</b></p>
        </div>
        <div className="editor-compose">
          <CKEditor
              editor={ Editor }
              config={ editorConfiguration }
              data="<p>Hello from CKEditor&nbsp;5!</p>"
              onReady={ editor => {
                  console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  console.log( { event, editor, data } );
              } }
              onBlur={ ( event, editor ) => {
                  console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                  console.log( 'Focus.', editor );
              } }
            />
        </div>
        <div style={{paddingTop: "20px"}}>
            <Button onClick={submit} size="default" shape="circle" type="primary">
                Submit
            </Button>
        </div>
      </Cards>
    </TaskListWrap>
  );
}

export default Passage;
