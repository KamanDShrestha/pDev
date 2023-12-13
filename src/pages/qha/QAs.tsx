import QuestionAnswerCard from '../../components/QuestionAnswerCard';
import useGetQAs from '../../services/QAs/getQAs';

const QAs = () => {
  const { data: QAs, error } = useGetQAs();
  console.log(QAs);
  console.log(error);

  return (
    <div className='flex flex-wrap justify-center gap-5'>
      {QAs && QAs.map((QA) => <QuestionAnswerCard question={QA} />)}
    </div>
  );
};

export default QAs;
