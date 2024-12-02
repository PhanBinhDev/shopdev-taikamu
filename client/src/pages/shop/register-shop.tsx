import { useState } from 'react'
import { Check, Store, Truck, Receipt, UserSquare2, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
function SellerRegistration() {
  const [step, setStep] = useState(1)
  const totalSteps = 5

  const steps = [
    { id: 1, name: 'Thông tin Shop', icon: Store },
    { id: 2, name: 'Cài đặt vận chuyển', icon: Truck },
    { id: 3, name: 'Thông tin thuế', icon: Receipt },
    { id: 4, name: 'Thông tin định danh', icon: UserSquare2 },
    { id: 5, name: 'Hoàn tất', icon: Flag }
  ]

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Đăng ký trở thành Người bán
          </h1>
        </div>

        {/* Progress Step */}
        <div className='mb-8'>
          <div className='relative'>
            <div className='absolute left-0 top-[15px] h-0.5 w-full bg-gray-200'>
              <div
                className='absolute h-0.5 bg-blue-600 transition-all duration-500'
                style={{
                  width: `${((step - 1) / (totalSteps - 1)) * 100}%`
                }}></div>
            </div>
            <div className='relative flex justify-between'>
              {steps.map((s) => (
                <div key={s.id} className='flex flex-col items-center'>
                  <div
                    className={cn(
                      'flex size-8 items-center justify-center rounded-full border-2 transition-colors duration-200',
                      step > s.id
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : step === s.id
                        ? 'border-blue-600 bg-white text-blue-600'
                        : 'border-gray-300 bg-white text-gray-300'
                    )}>
                    {step > s.id ? (
                      <Check className='size-4' />
                    ) : (
                      <s.icon className='size-4' />
                    )}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium',
                      step > s.id ? 'text-blue-600' : 'text-gray-500'
                    )}>
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardContent className='p-6'>
            {/*  */}
            {step === 1 && (
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='shopName'>
                    Tên Shop <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='shopName'
                    placeholder='Nhập tên shop của bạn'
                    className='max-w-md'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='address'>
                    Địa chỉ lấy hàng <span className='text-red-500'>*</span>
                  </Label>
                  <div className='flex gap-2'>
                    <Input placeholder='Nhập địa chỉ của bạn' />
                    <Button variant='outline' className='shrink-0'>
                      + Thêm
                    </Button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>
                    Email <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='Nhập địa chỉ email của bạn'
                    className='max-w-md'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>
                    Số điện thoại <span className='text-red-500'>*</span>
                  </Label>
                  <Input
                    id='phone'
                    type='tel'
                    placeholder='Nhập số điện thoại của bạn'
                    className='max-w-md'
                  />
                </div>
              </div>
            )}

            <div className='mt-6 flex justify-end gap-4'>
              {step > 1 && (
                <Button
                  variant='outline'
                  onClick={() => setStep((prev) => Math.max(1, prev - 1))}>
                  Lưu
                </Button>
              )}
              <Button
                onClick={() =>
                  setStep((prev) => Math.min(totalSteps, prev + 1))
                }
                className='bg-blue-600 hover:bg-blue-700'>
                Tiếp theo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SellerRegistration
