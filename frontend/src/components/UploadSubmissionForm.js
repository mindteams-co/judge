import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'antd';
import { useAlert } from 'react-alert';
import { competitionService } from '../services';
import UploadSubmission from './UploadSubmission';
import { showNotification } from '../common/helpers/showNotification';
import decodeToken from '../common/helpers/decodeToken';
import handleResponse from '../common/helpers/handleResponse';

const RowStyled = styled(Row)`
    display: flex;
    justify-content: flex-end;
`;

const ColStyled = styled(Col)`
    padding-left: 10px;
`;

const UploadSubmissionForm = ({ competitionId, user }) => {
    const alert = useAlert();

    const [currentFileList, setCurrentFileList] = useState([]);
    const [currentLink, setCurrentLink] = useState([]);
    const [competition, setCompetition] = useState({});

    useEffect(() => {
        competitionService.getCompetition(competitionId).then(setCompetition);
    }, [competitionId]);


    const handleChange  = (event) => {
        setCurrentLink(event.target.value);
    }

    const handleOnSubmit = async event => {
        event.preventDefault();

        let file; 

        if (currentFileList.length !== 1) {
            file = undefined;
        } else {
            file = currentFileList[0];
        }
      
        const teamId = decodeToken(user.token).user_id;

        let data;

        if (file) {
            data = {
                team: teamId,
                link: currentLink,
                file: file ? file.originFileObj : null,
            };
        } else {
            data = {
                team: teamId,
                link: currentLink,
            };
        }

        if (!data.file && data.link.length === 0) {
            showNotification({ message: 'Sorry we have problems with our server, please contact our support' , alert });
            return;
        } 



       
        try {
            const response = await competitionService.postCompetitionSubmission(competitionId, data);
            await handleResponse(response);
            showNotification({
                message:
                    'A solution has been successfully submitted. You can check "my submissions" page.',
                alert,
                option: 'success',
            });
        } catch (err) {
            showNotification({ message: 'Sorry we have problems with our server, please contact our support' , alert });
        }
        setCurrentFileList([]);
        setCurrentLink("");
    };

    return (
        <Form onSubmit={handleOnSubmit}>
            <RowStyled>
                <ColStyled>
                    <Form.Item>
                        <UploadSubmission
                            setCurrentFileList={setCurrentFileList}
                            currentFileList={currentFileList}
                            acceptType={competition.type}
                        />
                    </Form.Item>
                    <Form.Item>
                        <p>Upload a link for your solution:</p>
                        <input id="solution-url" type="url" onChange={handleChange}/>
                    </Form.Item>
                </ColStyled>
                <ColStyled>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </ColStyled>
            </RowStyled>
        </Form>
    );
};

UploadSubmissionForm.propTypes = {
    competitionId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
};

export default UploadSubmissionForm;
