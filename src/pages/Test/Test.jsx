import { useAuth } from "../../contexts/authContext";
const TestPage = () => {
  const { signIn } = useAuth();

  return (
    <div>
      <button onClick={signIn}>로그인</button>
    </div>
  );
};

export default TestPage;
