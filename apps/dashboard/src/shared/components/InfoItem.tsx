import { ReactNode } from 'react';
import classes from './InfoItem.module.css';

type InfoItemProps = {
  label: string;
  value: ReactNode;
  suffix?: string;
};

export function InfoItem({ label, value, suffix }: InfoItemProps) {
  return (
    <div>
      <p className={classes.label}>{label}</p>
      <p>
        {value} {suffix}
      </p>
    </div>
  );
}
