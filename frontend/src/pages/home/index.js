import React from 'react';
import { Layout, Card } from 'antd';
import TabsComponent from '../../components/Tabs';
import { LayoutStyled, HeaderStyled, LinkStyled, FooterStyled } from './style';

const { Content } = Layout;

const HomePage = () => {
    return (
        <LayoutStyled>
            <HeaderStyled>
                <LinkStyled to="/">skyhacks</LinkStyled>
            </HeaderStyled>
            <Card>
                <Content>
                    <TabsComponent />
                </Content>
            </Card>
            <FooterStyled>© 2019 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default HomePage;
