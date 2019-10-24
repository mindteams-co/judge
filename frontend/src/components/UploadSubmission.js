import React from 'react';
import { Icon, Button, Upload } from 'antd';
import PropTypes from 'prop-types';
import { dummyUploadPhotoRequest } from '../common/helpers/dummyUploadPhotoRequest';

const UploadSubmission = ({ setCurrentFileList, currentFileList, acceptType }) => {
    const handleOnChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);

        setCurrentFileList(fileList);
    };

    return (
        <Upload
            onChange={handleOnChange}
            name={acceptType === 'PDF' ? 'PDF file' : 'CSV file'}
            listType="file"
            customRequest={dummyUploadPhotoRequest}
            multiple={false}
            fileList={currentFileList}
            accept={'.' + acceptType}
        >
            <Button>
                <Icon type="upload" />
                Click to upload {acceptType}
            </Button>
        </Upload>
    );
};

UploadSubmission.propTypes = {
    setCurrentFileList: PropTypes.func.isRequired,
    currentFileList: PropTypes.array.isRequired,
};

export default UploadSubmission;
