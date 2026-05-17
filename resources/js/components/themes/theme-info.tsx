import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    InputSlug,
    defaultSlugify,
} from '@/registry/new-york/components/ui/inputs/input-slug';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/registry/new-york/components/ui/inputs/multi-select';

interface ThemeInfoData {
    title: string;
    name: string;
    description: string;
    tags: string[];
}

interface ThemeInfoProps {
    theme: ThemeInfoData;
    availableTags: string[];
    onChange: (updates: Partial<ThemeInfoData>) => void;
}

export default function ThemeInfo({
    theme,
    availableTags,
    onChange,
}: ThemeInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme Information</CardTitle>
                <CardDescription>
                    Basic details about your theme.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={theme.title}
                            onChange={(e) =>
                                onChange({
                                    title: e.target.value,
                                    name: defaultSlugify(e.target.value),
                                })
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Slug </Label>
                        <InputSlug
                            id="name"
                            placeholder="my-new-theme"
                            value={theme.name}
                            disabled
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={theme.description}
                        onChange={(e) =>
                            onChange({ description: e.target.value })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label>Tags</Label>
                    <MultiSelect
                        value={theme.tags}
                        onValueChange={(tags) => onChange({ tags })}
                        allowCreate={true}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Select or create tags..." />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            <MultiSelectGroup>
                                {availableTags.map((tag) => (
                                    <MultiSelectItem key={tag} value={tag}>
                                        {tag}
                                    </MultiSelectItem>
                                ))}
                            </MultiSelectGroup>
                        </MultiSelectContent>
                    </MultiSelect>
                </div>
            </CardContent>
        </Card>
    );
}
