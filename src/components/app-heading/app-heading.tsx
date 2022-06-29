import { Box, Tab, Tabs, Button } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../common/hooks/hook';
import { RatioDto } from '~/common/types/types';
import { setUahRatio } from '../../store/rates/actions';
import './styles.css';

type Props = {
  rates: Array<RatioDto>;
};

export const AppHeading = ({ rates }: Props) => {
  const [index, setIndex] = useState(0);
  const [ratioValue, setRatioValue] = useState(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
    navigate(`/${rates[newIndex].currency}`);
    dispatch(setUahRatio(ratioValue));
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.currentTarget.value);
    setRatioValue(newValue || 0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setUahRatio(ratioValue));
  };

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <span>UAH</span>
        <input className="countInput" type="text" value={ratioValue} onInput={handleInputChange} />
        <Button variant="contained" onClick={handleSubmit}>
          Convert
        </Button>
      </form>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={index} onChange={handleChange}>
          {rates.map(({ currency }) => {
            return <Tab key={currency} label={currency} />;
          })}
        </Tabs>
      </Box>
    </>
  );
};
