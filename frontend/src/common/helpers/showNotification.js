export const showNotification = ({ message, alert, option = 'show' }) => {
    if (option === 'show') {
        alert.show(message);
    }
    if (option === 'info') {
        alert.info(message);
    }
    if (option === 'success') {
        alert.success(message);
    }
};
