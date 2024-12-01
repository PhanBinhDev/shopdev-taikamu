import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  CalendarIcon,
  CrownIcon,
  DiamondIcon,
  Edit2Icon,
  Loader2,
  SaveIcon,
  StarIcon,
  User2Icon
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useUpdateProfile } from '@/hooks/user/useUpdateProfile'

interface RankInfo {
  rank: string
  color: string
  gradient: string
  icon: JSX.Element
  nextRank: string | null
  remaining: number
}
interface ProfileData {
  name: string
  phoneNumber?: string
  gender?: 'male' | 'female' | 'other'
  birthDate?: Date
  email: string
  isActive: boolean
}
function ViewProfile() {
  const { user } = useAuthStore()
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile()
  const [isEditing, setIsEditing] = useState(false)
  const progress = 10
  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name || 'Guest',
    phoneNumber: user?.phoneNumber,
    gender: user?.gender,
    birthDate: user?.birthDate,
    email: user?.email || '',
    isActive: user?.isActive || false
  })
  const handleSave = async () => {
    await updateProfile(profile)
    setIsEditing(false)
  }
  const getRankInfo = (progress: number): RankInfo => {
    if (progress < 20)
      return {
        rank: 'Thành viên Mới',
        color: 'from-zinc-200 to-zinc-400',
        gradient: 'bg-gradient-to-r from-zinc-200 to-zinc-400',
        icon: <User2Icon className='w-6 h-6' />,
        nextRank: 'Đồng',
        remaining: 20 - progress
      }
    if (progress < 40)
      return {
        rank: 'Thành viên Đồng',
        color: 'from-orange-300 to-orange-600',
        gradient: 'bg-gradient-to-r from-orange-300 to-orange-600',
        icon: <StarIcon className='w-6 h-6' />,
        nextRank: 'Bạc',
        remaining: 40 - progress
      }
    if (progress < 60)
      return {
        rank: 'Thành viên Bạc',
        color: 'from-slate-300 to-slate-500',
        gradient: 'bg-gradient-to-r from-slate-300 to-slate-500',
        icon: <StarIcon className='w-6 h-6' />,
        nextRank: 'Vàng',
        remaining: 60 - progress
      }
    if (progress < 80)
      return {
        rank: 'Thành viên Vàng',
        color: 'from-yellow-300 to-yellow-600',
        gradient: 'bg-gradient-to-r from-yellow-300 to-yellow-600',
        icon: <CrownIcon className='w-6 h-6' />,
        nextRank: 'Kim Cương',
        remaining: 80 - progress
      }
    return {
      rank: 'Thành viên Kim Cương',
      color: 'from-blue-300 to-purple-600',
      gradient: 'bg-gradient-to-r from-blue-300 to-purple-600',
      icon: <DiamondIcon className='w-6 h-6' />,
      nextRank: null,
      remaining: 0
    }
  }

  const rankInfo = getRankInfo(progress)
  return (
    <Card>
      <CardHeader className='border-b pb-4 space-y-1'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>Thông tin cá nhân</h3>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <SaveIcon onClick={handleSave} /> : <Edit2Icon />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4 p-6'>
        <div
          className={`relative overflow-hidden rounded-xl p-6 ${rankInfo.gradient} text-white shadow-lg transition-all duration-500 hover:shadow-xl`}>
          <div className='absolute top-0 left-0 w-full h-full opacity-50 mix-blend-overlay bg-[radial-gradient(circle_at_50%_0,rgba(255,255,255,0.1),rgba(255,255,255,0))]' />
          <div className='relative z-10'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                {rankInfo.icon}
                <span className='font-bold text-lg'>{rankInfo.rank}</span>
              </div>
              <div className='text-sm opacity-75'>ID: 0865294312</div>
            </div>

            <div className='space-y-2'>
              <Progress value={progress} className='h-2 bg-white/20' />
              {rankInfo.nextRank && (
                <p className='text-sm'>
                  Còn {rankInfo.remaining} điểm nữa để lên hạng{' '}
                  {rankInfo.nextRank}
                </p>
              )}
            </div>

            <div className='mt-4 text-lg font-medium'>{user?.name}</div>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Họ và tên</Label>
            <Input
              id='name'
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='phoneNumber'>Số điện thoại</Label>
            <Input
              id='phoneNumber'
              value={profile.phoneNumber}
              onChange={(e) =>
                setProfile({ ...profile, phoneNumber: e.target.value })
              }
              disabled={!isEditing}
            />
          </div>
          <div className='space-y-2'>
            <Label>Giới tính</Label>
            <RadioGroup
              value={profile.gender}
              onValueChange={(value: 'male' | 'female' | 'other') =>
                setProfile({ ...profile, gender: value })
              }
              disabled={!isEditing}
              className='flex gap-4'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='male' id='male' />
                <Label htmlFor='male'>Nam</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='female' id='female' />
                <Label htmlFor='female'>Nữ</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='other' id='other' />
                <Label htmlFor='other'>Khác</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='space-y-2'>
            <Label>Ngày sinh</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`w-full justify-start text-left font-normal ${
                    !profile.birthDate && 'text-muted-foreground'
                  }`}
                  disabled={!isEditing}>
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {profile.birthDate ? (
                    format(profile.birthDate, 'PPP', { locale: vi })
                  ) : (
                    <span>Chọn ngày sinh</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  captionLayout='dropdown-buttons'
                  selected={profile.birthDate}
                  onSelect={(date) =>
                    setProfile({ ...profile, birthDate: date })
                  }
                  disabled={!isEditing}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {isEditing && (
            <Button
              disabled={isPending}
              className='w-full md:w-fit'
              onClick={handleSave}>
              {isPending ? (
                <>
                  <Loader2 className='size-4 mr-1 animate-spin' />
                  Đang lưu thay đổi
                </>
              ) : (
                <>
                  <SaveIcon className='size-4 mr-1' />
                  Lưu thay đổi
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ViewProfile
