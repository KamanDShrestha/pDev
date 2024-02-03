import { useParams } from 'react-router-dom';

const EditQuestionPromptPage = () => {
  const { promptId } = useParams();
  console.log(promptId);
  return <div>EditQuestionPromptPage</div>;
};

export default EditQuestionPromptPage;
