import { usePage } from '@inertiajs/react';
import { PackageManagerCode } from '@/layouts/main/theme/main-package-manager-code';
import { cn } from '@/lib/utils';

function MainRegistryInstaller({
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

MainRegistryInstaller.displayName = 'MainRegistryInstaller';

export default MainRegistryInstaller;
