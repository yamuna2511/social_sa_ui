import React, { useState } from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RightOutlined } from '@ant-design/icons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const { Panel } = Collapse;
function StudentLectureNote() {
    const [state, setstate] = useState({
        key: 0,
    });
    const callback = (key) => {
        setstate({ ...state, key });
    };

    const customPanelStyle = {
        marginBottom: 20,
        border: 0,
        overflow: 'hidden',
    };
  return (
        <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
        >
        <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
                <div className="file-list">
                <div className="file-list__single d-flex">
                <div className="file-single-info d-flex">
                    <div className="file-single-logo">
                    <img src={require(`../../../static/img/files/zip.png`)} alt="File Logo" />
                    </div>
                    <div className="file-single__content">
                    <span className="file-name">Lecture_Note.zip</span>
                    <span className="file-size">7.05 MB</span>
                    <span className="file-content-action">
                        <Link to="/">Download</Link>
                    </span>
                    </div>
                </div>
                </div>
                <div className="file-list__single d-flex">
                <div className="file-single-info d-flex">
                    <div className="file-single-logo">
                    <img src={require(`../../../static/img/files/pdf.png`)} alt="File Logo" />
                    </div>
                    <div className="file-single__content">
                    <span className="file-name">Lecture_Note_2.pdf</span>
                    <span className="file-size">522 KB</span>
                    <span className="file-content-action">
                        <Link to="#">Download</Link>
                    </span>
                    </div>
                </div>
                </div>
            </div>
        </Panel>
        </Collapse>
  )
}

StudentLectureNote.defaultProps = {
  title: 'File',
};

StudentLectureNote.propTypes = {
  title: PropTypes.string,
};

export default StudentLectureNote;
