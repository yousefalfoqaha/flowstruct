import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {infer as zInfer, ZodSchema} from 'zod';

export function useAppForm<TSchema extends ZodSchema<any>>(
    schema: TSchema,
    defaultValues?: Partial<zInfer<TSchema>>
) {
    return useForm<zInfer<TSchema>>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as zInfer<TSchema> | undefined,
    });
}
