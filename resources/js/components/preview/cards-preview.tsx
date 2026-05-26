import { ChevronDown, Sparkles, Terminal } from 'lucide-react';
import { useCallback, useState } from 'react';
import {
    Bar,
    BarChart,
    Tooltip,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
    Tooltip as TooltipPrimitive,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const chartData = [
    { name: 'Jan', a: 40, b: 24 },
    { name: 'Feb', a: 30, b: 28 },
    { name: 'Mar', a: 50, b: 18 },
    { name: 'Apr', a: 27, b: 39 },
    { name: 'May', a: 18, b: 48 },
    { name: 'Jun', a: 23, b: 38 },
];

export default function CardsPreview({ ...props }) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const onTooltipOpenChange = useCallback(() => {}, []);

    return (
        <div
            {...props}
            className="flex flex-col gap-8 rounded bg-background p-4"
        >
            <div>
                <h2 className="text-3xl font-bold tracking-tight">
                    Component Preview
                </h2>
                <p className="text-muted-foreground">
                    Check how your theme looks with different components and
                    typography.
                </p>
            </div>

            <Separator />

            {/* Typography Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Typography</h3>
                <div className="grid gap-4 rounded-lg border p-6">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Heading 1: The Joke Tax Levied by the Hubble Telescope
                    </h1>
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Heading 2: The People of the Kingdom
                    </h2>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Heading 3: The King's Plan
                    </h3>
                    <p className="leading-7 not-first:mt-6">
                        The king thought long and hard, and finally came up with
                        a brilliant plan: he would tax the jokes.
                    </p>
                    <blockquote className="mt-6 border-l-2 pl-6 italic">
                        "After all," he said, "everyone enjoys a good joke, so
                        why not turn that enjoyment into revenue?"
                    </blockquote>
                    <p className="text-xl text-muted-foreground">
                        A modal dialog that interrupts the user with important
                        content and expects a response.
                    </p>
                    <div className="text-lg font-semibold">
                        Are you absolutely sure?
                    </div>
                    <p className="text-sm leading-none font-medium">
                        Email Address
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Enter your email address.
                    </p>
                </div>
            </section>

            {/* Buttons & Badges */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Buttons & Badges</h3>
                <div className="flex flex-wrap gap-4 rounded-lg border p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            <Button>Default</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button size="lg">Large</Button>
                            <Button size="default">Default</Button>
                            <Button size="sm">Small</Button>
                            <Button>
                                <Sparkles className="mr-2 h-4 w-4" /> With icon
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Menu{' '}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Sign out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <Separator
                        orientation="vertical"
                        className="hidden h-20 md:block"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                    </div>
                </div>
            </section>

            {/* Form Elements */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Form Elements</h3>
                <div className="grid gap-6 rounded-lg border p-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="message">Your message</Label>
                            <Textarea
                                placeholder="Type your message here."
                                id="message"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>One-Time Password</Label>
                            <InputOTP maxLength={6}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <p className="text-[0.8rem] text-muted-foreground">
                                Please enter the 6-digit code sent to your
                                device.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">
                                Accept terms and conditions
                            </Label>
                        </div>
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="option-one"
                                    id="option-one"
                                />
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="option-two"
                                    id="option-two"
                                />
                                <Label htmlFor="option-two">Option Two</Label>
                            </div>
                        </RadioGroup>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Cards & Avatars</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle>User Profile</CardTitle>
                                <CardDescription>
                                    Manage your account settings.
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Status
                                </span>
                                <Badge variant="outline">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Role
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    Administrator
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Create project</CardTitle>
                            <CardDescription>
                                Deploy your new project in one-click.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Name of your project"
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button>Deploy</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle>Primary Card</CardTitle>
                            <CardDescription className="text-primary-foreground/80">
                                This card uses the primary color background.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Primary color is often used for the main call to
                                action.
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="secondary" className="w-full">
                                Get Started
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            {/* Surfaces Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Surfaces</h3>
                <Card>
                    <CardHeader>
                        <CardTitle>Interactive Elements</CardTitle>
                        <CardDescription>
                            Tabs and overlays for complex layouts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Tabs defaultValue="overview">
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="analytics">
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger value="reports">
                                    Reports
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="overview"
                                className="pt-3 text-sm text-muted-foreground"
                            >
                                Tabs use the muted + accent tokens for their
                                backgrounds.
                            </TabsContent>
                            <TabsContent
                                value="analytics"
                                className="pt-3 text-sm"
                            >
                                Analytics content.
                            </TabsContent>
                            <TabsContent
                                value="reports"
                                className="pt-3 text-sm"
                            >
                                Reports content.
                            </TabsContent>
                        </Tabs>

                        <div className="flex flex-wrap items-center gap-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline">
                                        Open dialog
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Example Dialog
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <p className="text-sm text-muted-foreground">
                                            Overlays use the popover token for
                                            their backgrounds.
                                        </p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Alerts & Skeletons */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Feedback & Loading</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                        <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                You can add components to your app using the
                                cli.
                            </AlertDescription>
                        </Alert>
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Your session has expired. Please log in again.
                            </AlertDescription>
                        </Alert>
                    </div>
                    <div className="flex flex-col gap-4 rounded-lg border p-6">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Table Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Data Table</h3>
                <div className="rounded-md border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr className="h-10 text-muted-foreground">
                                <th className="px-4 text-left font-medium">
                                    Invoice
                                </th>
                                <th className="px-4 text-left font-medium">
                                    Status
                                </th>
                                <th className="px-4 text-right font-medium">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {[
                                ['INV-001', 'Paid', '$250.00'],
                                ['INV-002', 'Pending', '$180.00'],
                                ['INV-003', 'Overdue', '$420.00'],
                            ].map(([id, status, amt]) => (
                                <tr
                                    key={id}
                                    className="border-b transition-colors hover:bg-muted/50"
                                >
                                    <td className="p-4">{id}</td>
                                    <td className="p-4">
                                        <Badge
                                            variant={
                                                status === 'Overdue'
                                                    ? 'destructive'
                                                    : status === 'Paid'
                                                      ? 'default'
                                                      : 'secondary'
                                            }
                                        >
                                            {status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right font-mono">
                                        {amt}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Charts Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Charts</h3>
                <Card>
                    <CardHeader>
                        <CardTitle>Data Visualization</CardTitle>
                        <CardDescription>
                            Uses chart-1..5 tokens for colors.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        className="stroke-muted"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke="currentColor"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        className="fill-muted-foreground"
                                    />
                                    <YAxis
                                        stroke="currentColor"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        className="fill-muted-foreground"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--popover)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--popover-foreground)',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="a"
                                        fill="var(--chart-1)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="b"
                                        fill="var(--chart-2)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-50 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        className="stroke-muted"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        stroke="currentColor"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        className="fill-muted-foreground"
                                    />
                                    <YAxis
                                        stroke="currentColor"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        className="fill-muted-foreground"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'var(--popover)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--popover-foreground)',
                                            borderRadius: 'var(--radius)',
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="a"
                                        stroke="var(--chart-3)"
                                        strokeWidth={2}
                                        dot={{ fill: 'var(--chart-3)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="b"
                                        stroke="var(--chart-4)"
                                        strokeWidth={2}
                                        dot={{ fill: 'var(--chart-4)' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Navigation & Interactive Section */}
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">
                    Navigation & Interactive
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Date Picker</CardTitle>
                            <CardDescription>
                                Calendar component with state.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow-sm"
                            />
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Navigation & Selection</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/">
                                                Home
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink href="/components">
                                                Components
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>
                                                Breadcrumb
                                            </BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>

                                <div className="flex flex-col gap-2">
                                    <Label>Toggle Group</Label>
                                    <ToggleGroup
                                        type="multiple"
                                        variant="outline"
                                        className="justify-start"
                                    >
                                        <ToggleGroupItem value="bold">
                                            B
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="italic">
                                            I
                                        </ToggleGroupItem>
                                        <ToggleGroupItem value="underline">
                                            U
                                        </ToggleGroupItem>
                                    </ToggleGroup>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline">
                                                Open Popover
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="leading-none font-medium">
                                                        Dimensions
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set the dimensions for
                                                        the layer.
                                                    </p>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <TooltipProvider>
                                        <TooltipPrimitive>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline">
                                                    Hover for Tooltip
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>This is a tooltip</p>
                                            </TooltipContent>
                                        </TooltipPrimitive>
                                    </TooltipProvider>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
