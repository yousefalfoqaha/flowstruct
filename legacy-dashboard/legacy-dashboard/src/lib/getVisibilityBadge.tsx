import {Badge} from "@mantine/core";
import classes from "@/features/program/components/StatusBadge.module.css";
import {Eye, EyeOff} from "lucide-react";

export const getVisibilityBadge = (isPrivate: boolean) => (
    isPrivate ? (
        <Badge variant="outline" classNames={{root: classes.root}}
               leftSection={<EyeOff size={14}/>}>Hidden</Badge>
    ) : (
        <Badge variant="light" classNames={{root: classes.root}}
               leftSection={<Eye size={14}/>}>Public</Badge>
    )
);