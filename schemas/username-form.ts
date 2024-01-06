import * as z from 'zod';

export const UsernameFormSchema = z.object({
  username: z
    .string()
    .regex(
      new RegExp(`^[a-zA-Z0-9]+$`),
      'Username must only contain alphanumeric characters.'
    )
    .min(4, {
      message: 'Usernames must be between 4 and 20 characters.',
    })
    .max(20, { message: 'Usernames must be between 4 and 20 characters.' }),
});
