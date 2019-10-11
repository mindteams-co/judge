import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Menu } from '../components/Menu';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UploadSubmissionForm from './UploadSubmissionForm';
import { authService } from '../services';

const CardStyled = styled(Card)`
    margin-bottom: 15px;
    padding: 0px;
`;

const Dashboard = ({ competitionId }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const $user = authService.currentUser.subscribe(user => setCurrentUser(user));

        return () => $user.unsubscribe();
    }, []);

    return (
        <CardStyled>
            {currentUser ? (
                <>
                    <UploadSubmissionForm competitionId={competitionId} user={currentUser} />
                    <Menu />
                </>
            ) : (
                <>
                    Please <Link to="/login">log in</Link> to submit a solution
                </>
            )}
        </CardStyled>
    );
};

Dashboard.propTypes = {
    competitionId: PropTypes.number.isRequired,
};

export default Dashboard;
