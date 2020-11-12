import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { competitionService } from '../services';
import ScoreBoard from './ScoreBoard';
import Dashboard from './Dashboard';

const { TabPane } = Tabs;

const TabsComponent = () => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        competitionService.getCompetitions().then(setCompetitions);
    }, []);

    return (
        <Tabs defaultActiveKey="1">
            {competitions.length && competitions.map(comp => (
                <TabPane tab={comp.name} key={comp.id}>
                    <Dashboard competitionId={comp.id} />
                    <ScoreBoard id={comp.id} />
                </TabPane>
            ))}
        </Tabs>
    );
};

export default TabsComponent;
