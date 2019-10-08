import React from 'react';
import { Layout } from 'antd';
import TabsComponent from '../../components/Tabs';

import { LayoutStyled, HeaderStyled, LinkStyled, CardStyled, FooterStyled } from './style';

const { Content } = Layout;

const HomePage = () => {
    return (
        <LayoutStyled>
            <HeaderStyled>
                <LinkStyled to="/">skyhacks</LinkStyled>
            </HeaderStyled>
            <CardStyled>
                <Content>
                    <TabsComponent />
                </Content>
            </CardStyled>
            <FooterStyled>© 2019 skyhacks</FooterStyled>
        </LayoutStyled>
    );
};

export default HomePage;
