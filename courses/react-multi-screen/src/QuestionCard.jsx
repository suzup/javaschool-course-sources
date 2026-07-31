import ChoiceList from './ChoiceList.jsx';

function QuestionCard({ question }) {
    return (
        <section className="question-card">
            <h2>{question.question}</h2>
            <ChoiceList choices={question.choices} />
        </section>
    );
}

export default QuestionCard;
