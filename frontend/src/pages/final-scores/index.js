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
        title: 'Team Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
    },
    {
        title: 'Final Score',
        dataIndex: 'finalScore',
        key: 'finalScore',
        width: '50%',
    },
];

const FinalScoresPage = () => {
    const [teamsFinalScores, setTeamsFinalScores] = useState([]);

    const user = authService.currentUserValue();
    const teamId = decodeToken(user.token).user_id;

    useEffect(() => {
        teamService.getTeamsFinalScores().then(setTeamsFinalScores);
    }, [teamId]);

    const dataSource = teamsFinalScores.map(
        ({ name, finalScore, ...rest }) => ({
            name: name,
            finalScore: finalScore,
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
                    <Table pagination={false} dataSource={dataSource} columns={columns} />
                </Content>
            </Card>
            <FooterStyled>© 2020 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default FinalScoresPage;
