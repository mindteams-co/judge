import jwt_decode from 'jwt-decode';

const decodeToken = token => {
    const decodedToken = jwt_decode(token);
    const { user_id, email } = decodedToken;
    return {
        user_id,
        email,
    };
};

export default decodeToken;
