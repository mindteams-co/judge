import React, { useState, useEffect } from 'react';
import { Layout, Card } from 'antd';
import TabsComponent from '../../components/Tabs';
import { LayoutStyled, HeaderStyled, LinkStyled, FooterStyled } from './style';
import { authService } from '../../services';
import JudgePage from '../judge';

const { Content } = Layout;

const HomePage = () => {
    const user = authService.currentUserValue();
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSetAdmin = async () => {
        const result = await authService.checkIfAdmin();
        setIsAdmin(result);
    };

    useEffect(() => {
        user && handleSetAdmin();
    }, []);

    return (
        <LayoutStyled>
            <HeaderStyled>
                <LinkStyled to="/">skyhacks</LinkStyled>
            </HeaderStyled>
            <Card>
                <Content>{user && isAdmin ? <JudgePage /> : <TabsComponent />}</Content>
            </Card>
            <FooterStyled>© 2020 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default HomePage;
