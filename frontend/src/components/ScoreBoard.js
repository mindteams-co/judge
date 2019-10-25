import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { competitionService } from '../services';
import { formatDate } from '../common/helpers/formatDate.js';

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
        title: 'Date',
        dataIndex: 'last',
        key: 'last',
        width: '15%',
    },
];

const ScoreBoard = ({ id }) => {
    const [competitionScores, setCompetitionScores] = useState([]);

    useEffect(() => {
        setInterval(() => competitionService.getCompetitionScores(id).then(setCompetitionScores), 10000);
    }, [id]);

    const dataSource = competitionScores.map(({ team, createdAt, ...rest }) => ({
        team: team.name,
        key: team.id,
        last: formatDate(createdAt),
        ...rest,
    }));

    return <Table pagination={false} dataSource={dataSource} columns={columns} />;
};

ScoreBoard.propTypes = {
    id: PropTypes.number.isRequired,
};

export default ScoreBoard;
