import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { competitionService } from '../services';
import { formatDate } from '../common/formatDate';

const ScoreBoard = ({ id }) => {
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
            title: 'Entries',
            dataIndex: 'entries',
            key: 'entries',
            width: '15%',
        },
        {
            title: 'Last',
            dataIndex: 'last',
            key: 'last',
            width: '15%',
        },
    ];

    const [competitionScores, setCompetitionScores] = useState([]);

    useEffect(() => {
        competitionService.getCompetitionScores(id).then(res => setCompetitionScores(res));
    }, [id]);

    const dataSource = competitionScores.map(({ team, createdAt, ...rest }) => ({
        team: team.name,
        key: team.id,
        last: formatDate(createdAt),
        ...rest,
    }));

    return <Table pagination={false} dataSource={dataSource} columns={columns} />;
};

export default ScoreBoard;
