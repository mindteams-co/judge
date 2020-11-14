import React, { useEffect, useState } from 'react';
import { teamService, authService } from '../../services';
import { formatDate } from '../../common/helpers/formatDate';
import { Link } from 'react-router-dom';
import { Table, Card, Layout } from 'antd';
import decodeToken from '../../common/helpers/decodeToken';
import { LayoutStyled, HeaderStyled, LinkStyled, FooterStyled } from '../home/style';

const { Content } = Layout;

const columns = [
    {
        title: 'Competition Name',
        dataIndex: 'competition',
        key: 'competition',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: '15%',
    },
    {
        title: 'Judges',
        dataIndex: 'judges',
        key: 'judges',
        width: '15%',
    },
    {
        title: 'Submission File',
        dataIndex: 'file',
        key: 'file',
        width: '15%',
        render: (text, record) => <a href={text}>Submitted file</a>,
    },
    {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        width: '15%',
        render: (text, record) => <a href={text} target="_blank">Link</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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

    const dataSource = teamSubmissions.map(
        ({ competition, createdAt, judgesubmissionscoreSet, id, ...rest }) => ({
            competition: competition.name,
            key: id,
            judges: judgesubmissionscoreSet.map(xd => `${xd.judge.name} - ${xd.score}`).toString(),
            date: formatDate(createdAt),
            ...rest,
        }),
    );

    return (
        <LayoutStyled>
            <HeaderStyled>
                <LinkStyled to="/">skyhacks</LinkStyled>
            </HeaderStyled>
            <Card>
                <Content>
                    <Card>
                        <Link to="/">Go back to Home Page</Link>
                        <p style={{ float: 'left' }}>
                            If a scorer returned INVALID_FORMAT:
                            <ul>
                                Please ensure that:
                                <li>the first line of CSV has set up proper labels</li> 
                                <li>file has 39 columns</li> 
                            </ul>
                        </p>
                    </Card>
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                </Content>
            </Card>
            <FooterStyled>© 2020 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default SubmissionsPage;
