import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { authService } from '../services';

const List = styled.ul`
    display: flex;
    justify-content: right;
    justify-content: flex-end;
`;

const LinkStyled = styled(Link)`
    padding-left: 20px;
`;

export const Menu = () => (
    <List>
        <LinkStyled to="/submissions">My submissions</LinkStyled>
        <LinkStyled to="/final-scores">Final scores</LinkStyled>
        <LinkStyled to="/" onClick={authService.logout}>
            Log out
        </LinkStyled>
    </List>
);
