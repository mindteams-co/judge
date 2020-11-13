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

    const handleOnSubmit = async event => {
        event.preventDefault();

        if (currentFileList.length !== 1) return;

        const file = currentFileList[0];
        const teamId = decodeToken(user.token).user_id;

        const data = {
            team: teamId,
            file: file.originFileObj,
            link: currentLink,
        };

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
            showNotification({ message: err.nonFieldErrors[0], alert });
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
                        <p>You can also upload a link for your solution:</p>
                        <input type="text" value={currentLink} />
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
