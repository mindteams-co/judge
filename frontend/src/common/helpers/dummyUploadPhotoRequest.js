export const dummyUploadPhotoRequest = ({ onSuccess }) => {
    setTimeout(() => {
        onSuccess('ok');
    }, 0);
};
