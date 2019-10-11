import React, { useEffect, useState } from 'react';
import { teamService, authService } from '../../services';
import { formatDate } from '../../common/helpers/formatDate';
import { Table } from 'antd';
import decodeToken from '../../common/helpers/decodeToken';

const columns = [
    {
        title: 'Team Name',
        dataIndex: 'team',
        key: 'team',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: '15%',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '15%',
    },
];

const SubmissionsPage = () => {
    const [teamSubmissions, setTeamSubmissions] = useState([]);

    const user = authService.currentUserValue();
    const teamId = decodeToken(user.token).user_id;

    useEffect(() => {
        teamService.getTeamSubmissions(teamId).then(setTeamSubmissions);
    }, [teamId]);

    const dataSource = teamSubmissions.map(({ team, createdAt, score }) => ({
        team: team.name,
        key: team.id,
        date: formatDate(createdAt),
        score,
    }));

    return (
        <>
            <Table pagination={false} dataSource={dataSource} columns={columns} />
        </>
    );
};

export default SubmissionsPage;
