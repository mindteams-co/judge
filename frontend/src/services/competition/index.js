export const competitionServiceFactory = (apiBase, fetch) => {
    const getCompetitions = () => fetch(`${apiBase}/competitions`).then(res => res.json());

    const getCompetition = id => fetch(`${apiBase}/competitions/${id}`).then(res => res.json());

    const getCompetitionScores = id =>
        fetch(`${apiBase}/competitions/${id}/scores`).then(res => res.json());

    return {
        getCompetition,
        getCompetitions,
        getCompetitionScores,
    };
};
