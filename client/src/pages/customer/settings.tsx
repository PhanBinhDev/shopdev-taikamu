import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

function SettingsPage() {
  return (
    <div className='container mx-auto bg-gray-50'>
      <div className='py-4 md:p-8'>
        <h1 className='text-3xl font-bold mb-6'>Settings</h1>
        <div className='space-y-6'>
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='notifications'>Enable Notifications</Label>
                <Switch id='notifications' />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='email-notifications'>Email Notifications</Label>
                <Switch id='email-notifications' />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='push-notifications'>Push Notifications</Label>
                <Switch id='push-notifications' />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='login-alerts'>Unusual Login Alerts</Label>
                <Switch id='login-alerts' />
              </div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='tfa'>Two-Factor Authentication (TFA)</Label>
                <Switch id='tfa' />
              </div>
              <Button className='mt-2'>Configure TFA</Button>
            </CardContent>
          </Card>

          {/* Login History */}
          <Card>
            <CardHeader>
              <CardTitle>Login History</CardTitle>
              <CardDescription>Recent account access</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-05-15 14:30:00</TableCell>
                    <TableCell>192.168.1.1</TableCell>
                    <TableCell>Chrome on Windows</TableCell>
                    <TableCell>New York, USA</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-14 09:15:00</TableCell>
                    <TableCell>10.0.0.1</TableCell>
                    <TableCell>Safari on iPhone</TableCell>
                    <TableCell>London, UK</TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Chrome on Windows</TableCell>
                    <TableCell>192.168.1.1</TableCell>
                    <TableCell>Just now</TableCell>
                    <TableCell>
                      <Button variant='destructive' size='sm'>
                        Terminate
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Safari on iPhone</TableCell>
                    <TableCell>10.0.0.1</TableCell>
                    <TableCell>5 minutes ago</TableCell>
                    <TableCell>
                      <Button variant='destructive' size='sm'>
                        Terminate
                      </Button>
                    </TableCell>
                  </TableRow>
                  {/* Add more rows as needed */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
