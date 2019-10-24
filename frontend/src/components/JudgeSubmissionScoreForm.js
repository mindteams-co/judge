import { Form } from 'antd';
import * as React from 'react';
import { Input } from '../common/components/Input';
import { SubmitButton } from '../common/components/SubmitButton';
import PropTypes from 'prop-types';
import { submissionService } from '../services';
import handleResponse from '../common/helpers/handleResponse';

const JudgeSubmissionScoreFormComponent = ({ form }) => {
    const handleSubmit = async event => {
        event.preventDefault();

        form.validateFields(async (err, { submissionId, score }) => {
            if (!err) {
                console.log(submissionId, score);
                try {
                    const response = await submissionService.postSumbmission(submissionId, score);
                    console.log(response);
                    await handleResponse(response);
                } catch (err) {
                    console.log(err);
                }
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                id="submissionId"
                form={form}
                placeholder="Submission ID"
                message="Submission ID is required"
                type="number"
            />
            <Input
                id="score"
                form={form}
                placeholder="Score"
                message="Score is required"
                type="float"
                type="number"
            />
            <SubmitButton value="Submit" />
        </Form>
    );
};

JudgeSubmissionScoreFormComponent.propTypes = {
    form: PropTypes.object.isRequired,
};

export const JudgeSubmissionScoreForm = Form.create()(JudgeSubmissionScoreFormComponent);
