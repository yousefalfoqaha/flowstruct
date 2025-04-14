import {ReactNode} from "react";
import classes from './InfoItem.module.css';

type InfoItemProps = {
    label: string;
    value: ReactNode;
};

export function InfoItem({label, value}: InfoItemProps) {
    return (
        <div>
            <p className={classes.label}>{label}</p>
            <p>{value}</p>
        </div>
    );
}
