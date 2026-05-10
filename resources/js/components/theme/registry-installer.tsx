import { usePage } from '@inertiajs/react';
import { PackageManagerCode } from '@/components/theme/package-manager-code';
import { cn } from '@/lib/utils';

function RegistryInstaller({
    code,
    className,
}: {
    code: string;
    className?: string;
}) {
    const { url } = usePage().props;

    return (
        <PackageManagerCode
            className={cn(``, className)}
            codes={{
                bun: `bunx --bun shadcn@latest add ${url}/r/${code}.json`,
                npm: `npx shadcn@latest add ${url}/r/${code}.json`,
                pnpm: `pnpm dlx shadcn@latest add ${url}/r/${code}.json`,
                yarn: `yarn dlx shadcn@latest add ${url}/r/${code}.json`,
            }}
        />
    );
}

RegistryInstaller.displayName = 'RegistryInstaller';

export default RegistryInstaller;
