import useGetSpecificQuestionPrompt from '../../services/questionPrompts/getSpecificQuestionPrompt';
import { useParams } from 'react-router-dom';

const EditQuestionPromptPage = () => {
  const { id } = useParams();
  console.log(id);
  const { data: questionPrompt, isLoading } = useGetSpecificQuestionPrompt(
    id as string
  );
  console.log(questionPrompt);
  return <div>{questionPrompt && questionPrompt.title}</div>;
};

export default EditQuestionPromptPage;
