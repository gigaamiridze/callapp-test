import { ICityData } from './City';

export interface IChartConfig {
  data: ICityData[];
  appendPadding?: number[] | number;
  angleField: string;
  colorField: string;
  radius?: number;
  label?: {
    type: string;
    offset: string;
    content: string;
    style: {
      fontSize: number;
      textAlign: string;
    };
  };
  legend: {
    layout: 'horizontal' | 'vertical' | undefined;
    position: 'bottom' | 'top' | 'top-left' | 'top-right' | 'right' | 'right-top' | 'right-bottom' | 'left' | 'left-top' | 'left-bottom' | 'bottom-left' | 'bottom-right' | undefined;
  };
  interactions: { type: string }[];
}