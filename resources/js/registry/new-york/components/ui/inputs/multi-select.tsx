'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, ChevronsUpDownIcon, PlusIcon, XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

// Context for the MultiSelect compound component
interface MultiSelectContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    selected: string[];
    onSelect: (value: string) => void;
    onDeselect: (value: string) => void;
    search: string;
    setSearch: (search: string) => void;
    options: Map<string, string>;
    registerOption: (value: string, label: string) => void;
    onCreateOption?: (value: string) => void;
    allowCreate: boolean;
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(
    null,
);

function useMultiSelect() {
    const context = React.useContext(MultiSelectContext);

    if (!context) {
        throw new Error(
            'MultiSelect components must be used within a MultiSelect',
        );
    }

    return context;
}

// Root component
interface MultiSelectProps {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    onCreateOption?: (value: string) => void;
    allowCreate?: boolean;
    children: React.ReactNode;
}

function MultiSelect({
    value,
    defaultValue = [],
    onValueChange,
    onCreateOption,
    allowCreate = true,
    children,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [internalSelected, setInternalSelected] =
        React.useState<string[]>(defaultValue);
    const [options, setOptions] = React.useState<Map<string, string>>(
        new Map(),
    );

    const selected = value ?? internalSelected;

    const registerOption = React.useCallback(
        (optionValue: string, label: string) => {
            setOptions((prev) => {
                const next = new Map(prev);
                next.set(optionValue, label);

                return next;
            });
        },
        [],
    );

    const handleSelect = React.useCallback(
        (itemValue: string) => {
            const newSelected = selected.includes(itemValue)
                ? selected.filter((v) => v !== itemValue)
                : [...selected, itemValue];

            if (value === undefined) {
                setInternalSelected(newSelected);
            }

            onValueChange?.(newSelected);
        },
        [selected, value, onValueChange],
    );

    const handleDeselect = React.useCallback(
        (itemValue: string) => {
            const newSelected = selected.filter((v) => v !== itemValue);

            if (value === undefined) {
                setInternalSelected(newSelected);
            }

            onValueChange?.(newSelected);
        },
        [selected, value, onValueChange],
    );

    const handleCreateOption = React.useCallback(
        (newValue: string) => {
            if (onCreateOption) {
                onCreateOption(newValue);
            }

            // Select the new option
            const newSelected = [...selected, newValue];

            if (value === undefined) {
                setInternalSelected(newSelected);
            }

            onValueChange?.(newSelected);
            setSearch('');
        },
        [selected, value, onValueChange, onCreateOption],
    );

    return (
        <MultiSelectContext.Provider
            value={{
                open,
                setOpen,
                selected,
                onSelect: handleSelect,
                onDeselect: handleDeselect,
                search,
                setSearch,
                options,
                registerOption,
                onCreateOption: handleCreateOption,
                allowCreate,
            }}
        >
            <Popover open={open} onOpenChange={setOpen}>
                {children}
            </Popover>
        </MultiSelectContext.Provider>
    );
}

// Trigger component
type MultiSelectTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

function MultiSelectTrigger({
    className,
    children,
    ...props
}: MultiSelectTriggerProps) {
    const { selected, options, onDeselect } = useMultiSelect();

    return (
        <PopoverTrigger asChild {...props}>
            <button
                type="button"
                role="combobox"
                data-slot="multi-select-trigger"
                className={cn(
                    'flex min-h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
            >
                <div className="flex flex-1 flex-wrap items-center gap-1.5">
                    {selected.length > 0
                        ? selected.map((value) => (
                              <Badge
                                  key={value}
                                  variant="secondary"
                                  className="gap-1 pr-1"
                              >
                                  {options.get(value) || value}
                                  <button
                                      type="button"
                                      className="rounded-sm p-0.5 hover:bg-muted"
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          onDeselect(value);
                                      }}
                                  >
                                      <XIcon className="size-3" />
                                      <span className="sr-only">
                                          Remove {options.get(value) || value}
                                      </span>
                                  </button>
                              </Badge>
                          ))
                        : children}
                </div>
                <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
            </button>
        </PopoverTrigger>
    );
}

// Value/placeholder component
interface MultiSelectValueProps {
    placeholder?: string;
}

function MultiSelectValue({ placeholder }: MultiSelectValueProps) {
    const { selected } = useMultiSelect();

    if (selected.length > 0) {
        return null;
    }

    return (
        <span className="pointer-events-none text-muted-foreground">
            {placeholder}
        </span>
    );
}

// Content component
type MultiSelectContentProps = React.ComponentProps<typeof PopoverContent>;

function MultiSelectContent({
    className,
    children,
    ...props
}: MultiSelectContentProps) {
    const {
        search,
        setSearch,
        selected,
        options,
        onCreateOption,
        allowCreate,
    } = useMultiSelect();

    // Check if the current search matches any existing option
    const searchLower = search.toLowerCase().trim();
    const hasExactMatch = React.useMemo(() => {
        for (const [value, label] of options) {
            if (
                value.toLowerCase() === searchLower ||
                label.toLowerCase() === searchLower
            ) {
                return true;
            }
        }

        return false;
    }, [options, searchLower]);

    const showCreateOption =
        allowCreate &&
        search.trim() !== '' &&
        !hasExactMatch &&
        !selected.includes(search.trim());

    return (
        <PopoverContent
            data-slot="multi-select-content"
            className={cn('w-(--radix-popover-trigger-width) p-0', className)}
            align="start"
            {...props}
        >
            <CommandPrimitive
                className="flex h-full w-full flex-col overflow-hidden rounded-md"
                shouldFilter={true}
            >
                <div className="flex items-center border-b px-3">
                    <CommandPrimitive.Input
                        data-slot="multi-select-input"
                        placeholder="Search or create..."
                        value={search}
                        onValueChange={setSearch}
                        className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <CommandPrimitive.List className="max-h-50 overflow-y-auto p-1">
                    <CommandPrimitive.Empty className="py-6 text-center text-sm">
                        No options found.
                    </CommandPrimitive.Empty>
                    {children}
                    {showCreateOption && (
                        <CommandPrimitive.Item
                            data-slot="multi-select-create"
                            value={`create-${search}`}
                            onSelect={() => onCreateOption?.(search.trim())}
                            className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                        >
                            <PlusIcon className="size-4 shrink-0" />
                            <span>Create &quot;{search.trim()}&quot;</span>
                        </CommandPrimitive.Item>
                    )}
                </CommandPrimitive.List>
            </CommandPrimitive>
        </PopoverContent>
    );
}

// Group component
type MultiSelectGroupProps = React.ComponentProps<
    typeof CommandPrimitive.Group
>;

function MultiSelectGroup({ className, ...props }: MultiSelectGroupProps) {
    return (
        <CommandPrimitive.Group
            data-slot="multi-select-group"
            className={cn(
                'overflow-hidden text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

// Item component
interface MultiSelectItemProps extends Omit<
    React.ComponentProps<typeof CommandPrimitive.Item>,
    'onSelect'
> {
    value: string;
    children: React.ReactNode;
}

function MultiSelectItem({
    value,
    children,
    className,
    ...props
}: MultiSelectItemProps) {
    const { selected, onSelect, registerOption } = useMultiSelect();
    const isSelected = selected.includes(value);

    // Register this option
    React.useEffect(() => {
        const label = typeof children === 'string' ? children : value;
        registerOption(value, label);
    }, [value, children, registerOption]);

    return (
        <CommandPrimitive.Item
            data-slot="multi-select-item"
            value={value}
            onSelect={() => onSelect(value)}
            className={cn(
                'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
                className,
            )}
            {...props}
        >
            <div
                className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary',
                    isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50',
                )}
            >
                {isSelected && <CheckIcon className="size-3" />}
            </div>
            <span>{children}</span>
        </CommandPrimitive.Item>
    );
}

export {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
};
