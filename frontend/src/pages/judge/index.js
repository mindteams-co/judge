import React, { useState, useEffect } from 'react';
import { submissionService, authService } from '../../services';
import { formatDate } from '../../common/helpers/formatDate';
import { Table, Card, Input, Form, Button } from 'antd';
import { StorageService } from '../../services/storage';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { JudgeSubmissionScoreForm } from '../../components/JudgeSubmissionScoreForm';

const LinkStyled = styled(Link)`
    padding-left: 20px;
`;

const CardStyled = styled(Card)`
    margin: 5px;
    padding: 0px;
`;

const columns = [
    {
        title: 'Submission ID',
        dataIndex: 'id',
        key: 'id',
        width: '15%',
    },
    {
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'File',
        dataIndex: 'file',
        key: 'file',
        render: (text, record) => <a href={text}>Submitted file</a>,
        width: '15%',
    },
    {
        title: 'Submitted Date',
        dataIndex: 'date',
        key: 'date',
        width: '15%',
    },
];

const JudgePage = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        submissionService.getSubmissions().then(setSubmissions);
    }, []);

    const dataSource = submissions.map(({ id, team, createdAt, ...rest }) => ({
        name: team.name,
        key: id,
        date: formatDate(createdAt),
        id: id,
        ...rest,
    }));

    const { user } = JSON.parse(new StorageService().getItem('currentUser'));

    const favicon = document.getElementById('favicon');
    favicon.href = 'skyhacks_logo.png';

    return (
        <>
            <CardStyled>
                <p>
                    You're logged as <strong>{user.email}</strong>
                </p>
                <LinkStyled to="/" onClick={authService.logout}>
                    Log out
                </LinkStyled>
            </CardStyled>
            <h2>Submissions waiting for review</h2>
            <Table pagination={false} dataSource={dataSource} columns={columns} />
            <CardStyled>
                <JudgeSubmissionScoreForm />
            </CardStyled>
        </>
    );
};

export default JudgePage;
