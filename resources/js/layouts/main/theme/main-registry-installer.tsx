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

    const installerCode = `${url}/r/${code}.json`;

    return (
        <PackageManagerCode
            className={cn(``, className)}
            codes={{
                bun: `bunx --bun shadcn@latest add ${installerCode}`,
                npm: `npx shadcn@latest add ${installerCode}`,
                pnpm: `pnpm dlx shadcn@latest add ${installerCode}`,
                yarn: `yarn dlx shadcn@latest add ${installerCode}`,
            }}
        />
    );
}

MainRegistryInstaller.displayName = 'MainRegistryInstaller';

export default MainRegistryInstaller;
