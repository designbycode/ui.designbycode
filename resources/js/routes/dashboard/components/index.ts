import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/components',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardComponentsController::index
 * @see app/Http/Controllers/DashboardComponentsController.php:20
 * @route '/dashboard/components'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/components/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardComponentsController::create
 * @see app/Http/Controllers/DashboardComponentsController.php:50
 * @route '/dashboard/components/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\DashboardComponentsController::store
 * @see app/Http/Controllers/DashboardComponentsController.php:74
 * @route '/dashboard/components'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/components',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DashboardComponentsController::store
 * @see app/Http/Controllers/DashboardComponentsController.php:74
 * @route '/dashboard/components'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardComponentsController::store
 * @see app/Http/Controllers/DashboardComponentsController.php:74
 * @route '/dashboard/components'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DashboardComponentsController::store
 * @see app/Http/Controllers/DashboardComponentsController.php:74
 * @route '/dashboard/components'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardComponentsController::store
 * @see app/Http/Controllers/DashboardComponentsController.php:74
 * @route '/dashboard/components'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
export const edit = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/components/{name}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
edit.url = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { name: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    name: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        name: args.name,
                }

    return edit.definition.url
            .replace('{name}', parsedArgs.name.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
edit.get = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
edit.head = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
    const editForm = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
        editForm.get = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardComponentsController::edit
 * @see app/Http/Controllers/DashboardComponentsController.php:86
 * @route '/dashboard/components/{name}/edit'
 */
        editForm.head = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\DashboardComponentsController::update
 * @see app/Http/Controllers/DashboardComponentsController.php:129
 * @route '/dashboard/components/{name}'
 */
export const update = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/components/{name}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DashboardComponentsController::update
 * @see app/Http/Controllers/DashboardComponentsController.php:129
 * @route '/dashboard/components/{name}'
 */
update.url = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { name: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    name: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        name: args.name,
                }

    return update.definition.url
            .replace('{name}', parsedArgs.name.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardComponentsController::update
 * @see app/Http/Controllers/DashboardComponentsController.php:129
 * @route '/dashboard/components/{name}'
 */
update.put = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DashboardComponentsController::update
 * @see app/Http/Controllers/DashboardComponentsController.php:129
 * @route '/dashboard/components/{name}'
 */
    const updateForm = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardComponentsController::update
 * @see app/Http/Controllers/DashboardComponentsController.php:129
 * @route '/dashboard/components/{name}'
 */
        updateForm.put = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\DashboardComponentsController::destroy
 * @see app/Http/Controllers/DashboardComponentsController.php:146
 * @route '/dashboard/components/{name}'
 */
export const destroy = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/components/{name}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DashboardComponentsController::destroy
 * @see app/Http/Controllers/DashboardComponentsController.php:146
 * @route '/dashboard/components/{name}'
 */
destroy.url = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { name: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    name: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        name: args.name,
                }

    return destroy.definition.url
            .replace('{name}', parsedArgs.name.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardComponentsController::destroy
 * @see app/Http/Controllers/DashboardComponentsController.php:146
 * @route '/dashboard/components/{name}'
 */
destroy.delete = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DashboardComponentsController::destroy
 * @see app/Http/Controllers/DashboardComponentsController.php:146
 * @route '/dashboard/components/{name}'
 */
    const destroyForm = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DashboardComponentsController::destroy
 * @see app/Http/Controllers/DashboardComponentsController.php:146
 * @route '/dashboard/components/{name}'
 */
        destroyForm.delete = (args: { name: string | number } | [name: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const components = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default components