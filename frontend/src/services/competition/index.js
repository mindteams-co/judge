import { Methods } from '../http';

export const competitionServiceFactory = httpService => {
    const getCompetitions = () => httpService.GET('competitions').then(res => res.json());

    const getCompetition = id => httpService.GET(`competitions/${id}`).then(res => res.json());

    const getCompetitionScores = id =>
        httpService.GET(`competitions/${id}/scores`).then(res => res.json());

    const postCompetitionSubmission = (id, data) =>
        httpService.makeRequestForm(Methods.POST, `competitions/${id}/submissions`, data);
    return {
        getCompetition,
        getCompetitions,
        getCompetitionScores,
        postCompetitionSubmission,
    };
};
