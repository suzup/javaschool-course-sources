export const readChoiceId = (typed) => {
    const choiceId = Number(typed);
    if (typed.trim() === '' || !Number.isInteger(choiceId) || choiceId < 1 || choiceId > 4) {
        return null;
    }
    return choiceId;
};
