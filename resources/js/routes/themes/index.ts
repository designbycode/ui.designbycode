import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ThemesController::index
* @see Http/Controllers/ThemesController.php:11
* @route '/themes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/themes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ThemesController::index
* @see Http/Controllers/ThemesController.php:11
* @route '/themes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ThemesController::index
* @see Http/Controllers/ThemesController.php:11
* @route '/themes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ThemesController::index
* @see Http/Controllers/ThemesController.php:11
* @route '/themes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

const themes = {
    index: Object.assign(index, index),
}

export default themes