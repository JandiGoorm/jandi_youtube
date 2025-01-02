import DefaultLayout from "../../layouts/DefaultLayout/DefaultLayout";
import "./Home.module.css";
import Videos from "./Videos/Videos";

const HomePage = () => {
  return (
    <DefaultLayout>
      <Videos />
    </DefaultLayout>
  );
};

export default HomePage;
