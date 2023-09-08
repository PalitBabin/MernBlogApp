import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken,getType } from '../Components/utils/common-utils';
import { BaseUrl } from '../../config';

const API_URL = BaseUrl;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Accept": "multipart/form-data / application/json",
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        //stop global loader here
        return processResponse(response);
    },
    function (error) {
        //stop global loader here
        return Promise.reject(processError(error));
    }
);
/*          
if Success ==> return {isSuccess:true, data:object}

if Failure ==> return {isFailure:true, status:string, msg:string, code:int}

*/
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response.status,
            msg: response.msg,
            code: response.code
        }
    }
};

const processError = (error) => {
    if (error.response) {
        //Request successful but the server responded other than the range of 2.x.x(i.e. 200)
        console.log("ERROR IN RESPONSE", error.toJSON);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        // Request send to the server but response didn't come might be front and back end didn't connected , network issue or else
        console.log("ERROR IN REQUEST", error.toJSON);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        }
    } else {
        // something happedned in setting up the request
        console.log("ERROR IN NETWORK", error.toJSON);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        }
    }

};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url.replace(':id', body.id),
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            headers:{
                authorization:getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };

