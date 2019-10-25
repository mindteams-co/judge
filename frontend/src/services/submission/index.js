export const submissionServiceFactory = httpService => {
    const getSubmissions = () => httpService.GET('submissions').then(res => res.json());
    const postSumbmission = (submissionId, score) =>
        httpService.POST('submissions', { submission: submissionId, score: score });

    return {
        getSubmissions,
        postSumbmission,
    };
};
