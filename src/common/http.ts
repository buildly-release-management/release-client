import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (options = {} as any) {
    const service = options['service'];
    let baseURL = '';
    let token = '';
    if (service === 'release') {
        baseURL = `${process.env.REACT_APP_RELEASE_SERVICE_BASE_URL}`;
        token = `${process.env.REACT_APP_RELEASE_SERVICE_TOKEN}`
    } else if (service === 'product'){
        baseURL = `${process.env.REACT_APP_PRODUCT_SERVICE_BASE_URL}`
        token = `${process.env.REACT_APP_PRODUCT_SERVICE_TOKEN}`
    } else {
        baseURL = `${process.env.REACT_APP_BUILDLY_CORE_BASE_URL}`
        token = `${process.env.REACT_APP_BUILDLY_CORE_TOKEN}`
    }
    return axios.create(
        {
            baseURL: baseURL,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
};
