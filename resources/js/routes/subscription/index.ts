import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/settings/subscription',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\SubscriptionController::edit
* @see Http/Controllers/SubscriptionController.php:15
* @route '/settings/subscription'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see Http/Controllers/SubscriptionController.php:20
* @route '/settings/subscription/checkout'
*/
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

checkout.definition = {
    methods: ["post"],
    url: '/settings/subscription/checkout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see Http/Controllers/SubscriptionController.php:20
* @route '/settings/subscription/checkout'
*/
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see Http/Controllers/SubscriptionController.php:20
* @route '/settings/subscription/checkout'
*/
checkout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see Http/Controllers/SubscriptionController.php:20
* @route '/settings/subscription/checkout'
*/
const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkout.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::checkout
* @see Http/Controllers/SubscriptionController.php:20
* @route '/settings/subscription/checkout'
*/
checkoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: checkout.url(options),
    method: 'post',
})

checkout.form = checkoutForm

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see Http/Controllers/SubscriptionController.php:32
* @route '/settings/subscription/cancel'
*/
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/settings/subscription/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see Http/Controllers/SubscriptionController.php:32
* @route '/settings/subscription/cancel'
*/
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see Http/Controllers/SubscriptionController.php:32
* @route '/settings/subscription/cancel'
*/
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see Http/Controllers/SubscriptionController.php:32
* @route '/settings/subscription/cancel'
*/
const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::cancel
* @see Http/Controllers/SubscriptionController.php:32
* @route '/settings/subscription/cancel'
*/
cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(options),
    method: 'post',
})

cancel.form = cancelForm

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see Http/Controllers/SubscriptionController.php:45
* @route '/settings/subscription/resume'
*/
export const resume = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(options),
    method: 'post',
})

resume.definition = {
    methods: ["post"],
    url: '/settings/subscription/resume',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see Http/Controllers/SubscriptionController.php:45
* @route '/settings/subscription/resume'
*/
resume.url = (options?: RouteQueryOptions) => {
    return resume.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see Http/Controllers/SubscriptionController.php:45
* @route '/settings/subscription/resume'
*/
resume.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resume.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see Http/Controllers/SubscriptionController.php:45
* @route '/settings/subscription/resume'
*/
const resumeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resume.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\SubscriptionController::resume
* @see Http/Controllers/SubscriptionController.php:45
* @route '/settings/subscription/resume'
*/
resumeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resume.url(options),
    method: 'post',
})

resume.form = resumeForm

const subscription = {
    edit: Object.assign(edit, edit),
    checkout: Object.assign(checkout, checkout),
    cancel: Object.assign(cancel, cancel),
    resume: Object.assign(resume, resume),
}

export default subscription