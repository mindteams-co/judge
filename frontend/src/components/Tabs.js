import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import ScoreBoard from './ScoreBoard';
import { competitionService } from '../services';
import UploadResult from './UploadResult';

const { TabPane } = Tabs;

const TabsComponent = () => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        competitionService.getCompetitions().then(res => setCompetitions(res));
    }, []);

    return (
        <Tabs defaultActiveKey="1">
            {competitions.map(comp => (
                <TabPane tab={comp.name} key={comp.id}>
                    <UploadResult />
                    <ScoreBoard id={comp.id} />
                </TabPane>
            ))}
        </Tabs>
    );
};

export default TabsComponent;
