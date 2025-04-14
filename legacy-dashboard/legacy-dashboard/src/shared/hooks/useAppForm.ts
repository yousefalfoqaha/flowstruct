import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ZodSchema, infer as zInfer, z} from 'zod';

export function useAppForm<TSchema extends ZodSchema<any>>(
    schema: TSchema,
    defaultValues?: zInfer<TSchema>
) {
    return useForm<zInfer<TSchema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });
}

export type InferFormValues<TSchema extends z.ZodType> = z.infer<TSchema>;