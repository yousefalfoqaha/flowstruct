import React, {ReactElement} from "react";
import {ColumnFilter} from "@tanstack/react-table";

export interface ErrorObject {
    statusCode: number;
    messages: string[];
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

export type SidebarLink = {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    route: string;
}

export type TableSearchOptions = {
    filter: string;
    page: number;
    size: number;
    columnFilters: ColumnFilter[]
}
