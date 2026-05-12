import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/fonts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\FontsController::index
* @see Http/Controllers/FontsController.php:10
* @route '/fonts'
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

const fonts = {
    index: Object.assign(index, index),
}

export default fonts