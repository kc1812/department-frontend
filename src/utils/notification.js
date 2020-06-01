import { notification } from 'antd';

export const openNotification = (type, title, message, duration = 10) => {
    notification[type]({
        message: title,
        description: message,
        duration: duration
    });
}