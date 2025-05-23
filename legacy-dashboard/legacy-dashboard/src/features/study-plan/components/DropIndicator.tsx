import classes from "@/features/study-plan/components/ProgramMap.module.css";
import {CoursePlacement} from "@/features/study-plan/types.ts";
import {getTermIndexFromPlacement} from "@/utils/getTermIndexFromPlacement.ts";

type Props = {
    placement: Pick<CoursePlacement, 'year' | 'semester'>;
}

export function DropIndicator({placement}: Props) {
    return (
        <div
            data-term-index={getTermIndexFromPlacement(placement)}
            className={classes.dropIndicator}
        />
    );
}
