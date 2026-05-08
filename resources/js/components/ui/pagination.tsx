import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginatedData } from '@/types';

function Pagination<T>({ pagination }: { pagination: PaginatedData<T> }) {
    if (pagination.last_page <= 1) return null

    const pageLinks = pagination.links.filter(
        (link) => link.label !== '&laquo; Previous' && link.label !== '&laquo;' && link.label !== 'Previous' && link.label !== 'Next' && link.label !== 'Next &raquo;' && link.label !== '&raquo;',
    )

    return (
        <nav aria-label="Pagination" className="my-8 flex items-center justify-center gap-1">
            <Link
                href={pagination.prev_page_url ?? '#'}
                className={`inline-flex size-9 items-center justify-center rounded-md text-sm transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none ${!pagination.prev_page_url ? 'pointer-events-none opacity-50' : ''}`}
                preserveScroll
                preserveState
                disabled={!pagination.prev_page_url}
                aria-label="Previous page"
            >
                <ChevronLeft className="size-4" />
            </Link>

            {pageLinks.map((link, i) => {
                const label = decodeURIComponent(link.label)

                if (!link.url) {
                    return (
                        <span
                            key={i}
                            aria-hidden="true"
                            className="inline-flex size-9 items-center justify-center text-sm text-muted-foreground"
                        >
                            {label || '...'}
                        </span>
                    )
                }

                return (
                    <Link
                        key={i}
                        href={link.url}
                        className={`inline-flex size-9 items-center justify-center rounded-md text-sm transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none ${link.active ? 'bg-primary text-primary-foreground shadow-xs' : ''}`}
                        preserveScroll
                        preserveState
                        aria-current={link.active ? 'page' : undefined}
                        aria-label={`Page ${label}`}
                    >
                        {label}
                    </Link>
                )
            })}

            <Link
                href={pagination.next_page_url ?? '#'}
                className={`inline-flex size-9 items-center justify-center rounded-md text-sm transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none ${!pagination.next_page_url ? 'pointer-events-none opacity-50' : ''}`}
                preserveScroll
                preserveState
                disabled={!pagination.next_page_url}
                aria-label="Next page"
            >
                <ChevronRight className="size-4" />
            </Link>
        </nav>
    )
}

export { Pagination }
