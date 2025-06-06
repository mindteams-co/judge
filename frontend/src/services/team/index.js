export const TeamServiceFactory = httpService => {
    const getTeamSubmissions = id => httpService.GET(`teams/${id}/submissions`).then(res => res.json());
    const getTeamsFinalScores = () => httpService.GET('teams/final-scores').then(res => res.json());

    return {
        getTeamSubmissions,
        getTeamsFinalScores,
    };
};
