import { Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Textarea } from '@/components/ui/textarea';

export default function CardsPreview() {
    return (
        <div className="flex flex-col gap-8 py-10">
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
        </div>
    );
}
