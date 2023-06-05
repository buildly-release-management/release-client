import axios from 'axios';

export default axios.create(
    {
        baseURL: `${process.env.REACT_APP_RELEASE_BASE_URL}`,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_RELEASE_SERVICE_TOKEN}`
        }
    }
);
