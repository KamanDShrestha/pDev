import QuestionAnswerCard from '../../components/QuestionAnswerCard';
import useGetQAs from '../../services/QAs/getQAs';

const QAs = () => {
  const { data: QAs } = useGetQAs();
  console.log(QAs);

  return (
    <div>{QAs && QAs.map((QA) => <QuestionAnswerCard question={QA} />)}</div>
  );
};

export default QAs;
