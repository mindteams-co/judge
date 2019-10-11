import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

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
`;

export const HeaderStyled = styled(Header)`
    background-color: white;
    text-align: left;
    font-size: 1rem;
`;

export const FooterStyled = styled(Footer)`
    background-color: white;
`;

export const LinkStyled = styled(Link)`
    text-decoration: none;
`;
