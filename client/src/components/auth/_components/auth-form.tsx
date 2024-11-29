// lib
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// components
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import AuthWrapper from './auth-wrapper'

import { signInSchema, signUpSchema } from '@/schema/auth'
import { useSignIn } from '@/hooks/auth/useSignIn'
import { useSignUp } from '@/hooks/auth/useSignUp'
import { Loader2 } from 'lucide-react'

type SignInFormValues = z.infer<typeof signInSchema>
type SignUpFormValues = z.infer<typeof signUpSchema>

export function AuthForm() {
  const { mutate: signIn, isPending: isPendingSignIn } = useSignIn()
  const { mutate: signUp, isPending: isPendingSignUp } = useSignUp()
  const formSignIn = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const formSignUp = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  function onSubmitSignIn(values: SignInFormValues) {
    signIn(values)
  }
  function onSubmitSignUp(values: SignUpFormValues) {
    signUp(values)
  }
  return (
    <Tabs defaultValue='sign-in' className='mx-auto max-w-sm'>
      <TabsList className='grid grid-cols-2'>
        <TabsTrigger value='sign-in'>Đăng nhập</TabsTrigger>
        <TabsTrigger value='sign-up'>Đăng ký</TabsTrigger>
      </TabsList>
      <TabsContent value='sign-in'>
        <AuthWrapper
          title='Đăng nhập'
          description='Nhập email của bạn để đăng nhập'
          showSocial>
          <Form {...formSignIn}>
            <form onSubmit={formSignIn.handleSubmit(onSubmitSignIn)}>
              <FormField
                control={formSignIn.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignIn.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id='password' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full mt-3'
                disabled={isPendingSignIn}>
                {isPendingSignIn ? (
                  <>
                    <Loader2 className='size-5 mr-2 animate-spin' />
                    Đang đăng nhập...
                  </>
                ) : (
                  'Đăng nhập'
                )}
              </Button>
            </form>
          </Form>
        </AuthWrapper>
      </TabsContent>
      <TabsContent value='sign-up'>
        <AuthWrapper
          title='Đăng ký'
          description='Điền thông tin của bạn để tạo tài khoản'
          showSocial>
          <Form {...formSignUp}>
            <form onSubmit={formSignUp.handleSubmit(onSubmitSignUp)}>
              <FormField
                control={formSignUp.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ & Tên</FormLabel>
                    <FormControl>
                      <Input
                        id='name'
                        type='name'
                        placeholder='John Doe'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id='email'
                        type='email'
                        placeholder='m@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id='password' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full mt-3'
                disabled={isPendingSignUp}>
                {isPendingSignUp ? (
                  <>
                    <Loader2 className='size-5 mr-2 animate-spin' />
                    Đang đăng ký...
                  </>
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </form>
          </Form>
        </AuthWrapper>
      </TabsContent>
    </Tabs>
  )
}
