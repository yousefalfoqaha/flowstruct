import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { infer as zInfer, output, ZodObject } from 'zod/v4';

export function useAppForm<TInterface extends ZodObject<any>>(
  schema: TInterface,
  defaultValues?: Partial<zInfer<TInterface>>
) {
  return useForm<zInfer<TInterface>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<output<TInterface>> | undefined,
  });
}
