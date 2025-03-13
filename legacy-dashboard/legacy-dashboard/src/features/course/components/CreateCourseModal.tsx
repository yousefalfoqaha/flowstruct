import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Flex, LoadingOverlay, Modal} from "@mantine/core";
import {useCreateCourse} from "@/features/course/hooks/useCreateCourse.ts";
import {CourseDetailsFormValues, courseDetailsSchema} from "@/features/course/form-schemas.ts";
import {CourseDetailsFormFields} from "@/features/course/components/CourseDetailsFormFields.tsx";
import {Plus} from "lucide-react";
import {Course} from "@/features/course/types.ts";

interface CreateCourseModalProps {
    opened: boolean;
    setOpened: (open: boolean) => void;
    openCourseSearch: () => void;
    selectCreatedCourse: (course: Course) => void;
}

export function CreateCourseModal({opened, setOpened, openCourseSearch, selectCreatedCourse}: CreateCourseModalProps) {
    const {control, handleSubmit, reset, formState: {errors}} = useForm<CourseDetailsFormValues>({
        resolver: zodResolver(courseDetailsSchema),
    });

    const createCourse = useCreateCourse();

    const handleClose = () => {
        setOpened(false);
        openCourseSearch();
        reset();
    }

    const onSubmit = (data: CourseDetailsFormValues) => {
        createCourse.mutate(data, {
            onSuccess: (newCourse) => {
                selectCreatedCourse(newCourse);
                handleClose();
            }
        })
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title="Create Course"
            centered
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap="md" direction="column">
                    <LoadingOverlay
                        visible={createCourse.isPending}
                        zIndex={1000}
                        overlayProps={{radius: "sm", blur: 2}}
                    />
                    <CourseDetailsFormFields control={control} errors={errors}/>
                    <Button leftSection={<Plus size={14}/>} type="submit" fullWidth mt="md">
                        Create and Select Course
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}
