import useDocumentTitle from '../../services/getTitle';
import QuestionAnswerCard from '../../components/QuestionAnswerCard';
import useGetQAs from '../../services/QAs/getQAs';
import Heading from '../../components/Heading';

const QAs = () => {
  const { data: QAs, error } = useGetQAs();
  console.log(QAs);
  console.log(error);

  useDocumentTitle('QAs - SelfSync');

  return (
    <>
      <Heading>Questions and Feedbacks</Heading>
      <div className='flex flex-wrap justify-center gap-5'>
        {QAs && QAs.map((QA) => <QuestionAnswerCard question={QA} />)}
      </div>
    </>
  );
};

export default QAs;
