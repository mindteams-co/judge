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
        title: 'Submission File',
        dataIndex: 'file',
        key: 'file',
        width: '15%',
        render: (text, record) => <a href={text}>Submitted file</a>,
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

    const dataSource = teamSubmissions.map(({ competition, createdAt, id, ...rest }) => ({
        competition: competition.name,
        key: id,
        date: formatDate(createdAt),
        ...rest,
    }));

    return (
        <LayoutStyled>
            <HeaderStyled>
                <LinkStyled to="/">skyhacks</LinkStyled>
            </HeaderStyled>
            <Card>
                <Content>
                    <Card>
                        <Link to="/">Go back to Home Page</Link>
                    </Card>
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                </Content>
            </Card>
            <FooterStyled>© 2019 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default SubmissionsPage;
