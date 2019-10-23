import React from 'react';
import { Layout, Card } from 'antd';
import TabsComponent from '../../components/Tabs';
import { LayoutStyled, HeaderStyled, LinkStyled, FooterStyled } from './style';
import { authService } from '../../services';
import JudgePage from '../judge';

const { Content } = Layout;

const HomePage = () => {
    const user = authService.currentUserValue();
    return (
        <LayoutStyled>
            <HeaderStyled>
                <LinkStyled to="/">skyhacks</LinkStyled>
            </HeaderStyled>
            <Card>
                <Content>
                    {user && user.user.isAdmin ? <JudgePage></JudgePage> : <TabsComponent />}
                </Content>
            </Card>
            <FooterStyled>© 2019 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default HomePage;
