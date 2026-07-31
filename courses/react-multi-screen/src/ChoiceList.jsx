import Choice from './Choice.jsx';

function ChoiceList({ choices }) {
    return (
        <ol>
            {choices.map((choice) => (
                <Choice key={choice.id} choice={choice} />
            ))}
        </ol>
    );
}

export default ChoiceList;
