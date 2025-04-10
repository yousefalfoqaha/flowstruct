import {ReactElement} from "react";

export interface ErrorObject {
    statusCode: number;
    message: string;
    timestamp: string;
}

export type Notification<TData, TVariables> = {
    title?: TextResolver<TData, TVariables>;
    message: TextResolver<TData, TVariables>;
    icon?: IconResolver<TData, TVariables>;
}

export type TextResolver<TData, TVariables> =
    | string
    | ((data: TData, variables: TVariables) => string);

export type IconResolver<TData, TVariables> =
    | ReactElement
    | ((data: TData, variables: TVariables) => ReactElement | undefined);
