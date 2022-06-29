import { useAppSelector } from '../../common/hooks/hook';
import { RatioDto } from '~/common/types/types';

export const TabContent = ({ currency, ratio }: RatioDto) => {
  const uahRatio = useAppSelector((state) => state.uahRatio);

  return <div>{uahRatio * ratio}</div>;
};
