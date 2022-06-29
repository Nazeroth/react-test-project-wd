import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './common/hooks/hook';
import { TabContent } from './components/tab-content/tab-content';
import { getRates } from './store/rates/actions';
import { AppHeading } from './components/app-heading/app-heading';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { rates, isLoading, error } = useAppSelector((state) => ({
    rates: state.rates,
    isLoading: state.isLoading,
    error: state.errorMessage,
  }));

  useEffect(() => {
    dispatch(getRates());
  }, []);

  if (!rates.length || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <AppHeading rates={rates} />
      <Routes>
        <Route path="/">
          {rates.map((data) => (
            <Route
              key={data.currency}
              path={`${data.currency}`}
              element={<TabContent ratio={data.ratio} currency={data.currency} />}
            />
          ))}
          <Route path="/" element={<Navigate to={`/${rates[0].currency}`} />} />
          <Route path="*" element={<Navigate to={`/${rates[0].currency}`} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
