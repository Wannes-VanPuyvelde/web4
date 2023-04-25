// pages/index.tsx
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Header from '../components/Header';

const HomePage: NextPage = () => {
  const router = useRouter();

  const redirectToPlants = () => {
    router.push('/plants');
  };

  return (
    <div>
      <Header />
      <h1>Welcome to the Plant App</h1>
      <button onClick={redirectToPlants}>Go to Plants</button>
    </div>
  );
};

export default HomePage;
