'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { UsernameFormSchema } from '@/schemas/username-form';
import { createChannel, findUsername } from '@/services/channel';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const ChooseUsernameForm = () => {
  const usernameForm = useForm<z.infer<typeof UsernameFormSchema>>({
    resolver: zodResolver(UsernameFormSchema),
    defaultValues: {
      username: '',
    },
  });
  const [isLoading, startUsernameTransition] = useTransition();
  const [isSubmitLoading, startSubmitTransition] = useTransition();
  const [isTyping, setIsTyping] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const onSubmit = (data: z.infer<typeof UsernameFormSchema>) => {
    startSubmitTransition(() => {
      return createChannel(data.username);
    });
  };

  const checkUsername = async (input: z.infer<typeof UsernameFormSchema>) => {
    console.log('checking');

    startUsernameTransition(async () => {
      const usernameTaken = !!(await findUsername(input.username));

      setUsernameAvailable(!usernameTaken);

      if (usernameTaken) {
        usernameForm.setError('username', {
          type: 'custom',
          message: 'Username already taken',
        });
      }

      setIsTyping(false);
    });
  };

  let typingTimer: ReturnType<typeof setTimeout>;

  return (
    <Form {...usernameForm}>
      <form
        onSubmit={usernameForm.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={usernameForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Username</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    className={cn(
                      'border-2 border-zinc-700',
                      usernameForm.formState.errors.username &&
                        'border-destructive focus-visible:ring-destructive'
                    )}
                    onKeyUp={() => {
                      clearTimeout(typingTimer);
                      typingTimer = setTimeout(
                        usernameForm.handleSubmit(checkUsername),
                        750
                      );
                    }}
                    onKeyDown={() => {
                      setIsTyping(true);
                      clearTimeout(typingTimer);
                    }}
                    placeholder="username"
                    {...field}
                  />
                  <ShowIcon
                    isLoading={isLoading}
                    isTyping={isTyping}
                    isValidForm={usernameForm.formState.isValid}
                    usernameAvailable={usernameAvailable}
                    emptyInput={usernameForm.getValues().username === ''}
                  />
                </div>
              </FormControl>
              {!usernameForm.formState.errors.username && (
                <FormDescription>
                  People on Streem will know you by this name.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="px-3 font-semibold text-xs"
          disabled={
            isSubmitLoading ||
            !usernameAvailable ||
            usernameForm.getValues().username === ''
          }
        >
          Continue
          {isSubmitLoading && (
            <Icons.spinner className="ml-2 w-4 h-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ChooseUsernameForm;

type ShowIconProps = {
  isLoading: boolean;
  isTyping: boolean;
  usernameAvailable: boolean;
  emptyInput: boolean;
  isValidForm: boolean;
};

const ShowIcon = ({
  isLoading,
  isTyping,
  usernameAvailable,
  emptyInput,
  isValidForm,
}: ShowIconProps) => {
  return (
    <>
      {isLoading || (isTyping && isValidForm) ? (
        <Icons.spinner className="absolute right-3 w-4 h-4 animate-spin" />
      ) : (
        <>
          {usernameAvailable ? (
            <CheckCircle2
              strokeWidth={3}
              className="absolute right-3 w-4 h-4 text-green-500"
            />
          ) : (
            !emptyInput && (
              <XCircle
                strokeWidth={3}
                className="absolute right-3 w-4 h-4 text-destructive"
              />
            )
          )}
        </>
      )}
    </>
  );
};
