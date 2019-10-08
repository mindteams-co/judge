import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout, Card } from 'antd';

const { Header, Footer } = Layout;

export const LayoutStyled = styled(Layout)`
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 60px;
    background-color: white;
    min-height: 100%;
    text-align: center;
    display: flex;
    align-items: stretch;
    flex-direction: column;
`;

export const HeaderStyled = styled(Header)`
    background-color: white;
    text-align: left;
    font-size: 1rem;
    flex-shrink: 0;
`;

export const FooterStyled = styled(Footer)`
    background-color: white;
    flex-shrink: 0;
`;

export const LinkStyled = styled(Link)`
    text-decoration: none;
`;

export const CardStyled = styled(Card)`
    flex-grow: 1;
    flex-shrink: 0;
`;
