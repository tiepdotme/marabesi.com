---
layout: post
title: Custom validator with Laravel 5 + (5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8)
date: 2017-05-31 01:06:05.000000000 -03:00
type: post
image: /images/posts/2017-05-31-laravel-custom-validator/cover.png
published: true
status: published
categories:
- php
tags:
- php,
- laravel,
- right way,
- models,
- framework,
- laracast,
- laranews,
- validator,
- custom validator,
- laravel validator extend,
- laravel custom validator class,
- laravel validation service provider,
- laravel extend validator,
- laravel validator::extend
- laravel 5.2,
- laravel 5.3,
- laravel 5.4,
- laravel 5.5,
- laravel 5.6,
- laravel 5.7
---

Obs: This post assumes that you understand the following topics within the
Laravel framework:

1. Routers and controllers.
2. Using default validator rules.
3. What is a service provider and how to use them.

## Using built-in validator rules

Laravel comes with powerful features to validate your data, the official documentation has tons of examples to use. Usually the validation is really straight forward, it takes a request as parameter and the second parameter is an array with all the rules to be validated.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{

    /**
     * @param Request $request data to be validated
     */
    public function save(Request $request)
    {
        // array key represets the field from the request to validate
        // the array value is which validation rule should be applied
        $this->validate($request, [
            'title' => 'required',
            'author' => 'required|min:3',
        ]);
    }

}
```

The goodness about that is if any rule fails, Laravel will return a response with all errors that occurred within the messages.

Though, it is common to have custom rules when submitting data to any application.

For that Laravel provide us with a simple and powerful interface, the first thing is to extend the Validator class from Laravel framework.

## Creating a custom validator class

The first thing is to create new class and extends the Laravel Validator
(a custom validator is a class anywhere in your project).

The second thing to have a look, is the convention name of each method. You must use the *validate* prefix, this is a way to tell Laravel that this method can be used to validate data.

The Laravel Framework itself uses this approach, the class [Validator](https://laravel.com/api/5.2/Illuminate/Validation/Validator.html){:target="_blank"} brings the core validation from the Framework such as: required, between a value, min value, max value and so on.

```php
<?php

namespace App\Validators;

use Illuminate\Validation\Validator;

class MyCustomRule extends Validator
{

    public function validateSpecificValidation($attribute, $value)
    {
        // do your work here
    }
}
```

Notice that we are under the namespace `App\Validators` which means that for this example we have a folder to store all validators.

Now before we use the validator class that we just created, one more step is needed. Laravel doesn't know about our validation class, and we tell it using a **ServiceProvider**.

## Registering the new validator with Service Provider

All parameters that are required by the constructor are from the Laravel validator class, so as we are
extending it we must pass all arguments as well (Thanks Laravel D.I).

```php
<?php

namespace App\Providers;

use App\Validators\MyCustomRule;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->app->validator->resolver(function($translator, $data, $rules, $messages) {
            return new MyCustomRule($translator, $data, $rules, $messages);
        });
    }

    public function register()
    {}
}
```

So now we are all set to use our custom validator, and in order to do that is
a matter of adding the rule we've created into the array rules given to the
validate method.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{

    public function save(Request $request)
    {
        $this->validate($request, [
            'title' => 'specific_validation',
            'author' => 'required|min:3',
        ]);
    }

}
```

Here we have changed the required rule by the one we've created. The name is the same of our method, but in [snake case](https://en.wikipedia.org/wiki/Snake_case){:target="_blank"} and without the *validate* prefix.

## Important tips to be aware of

1. We used the class AppServiceProvider to register our validator, it is practical and fast. But depending on the situation you might want to create your own service provider to register those classes.


## Empty fields trap

All custom validations do not accept empty fields by default. If you want to have it you must override the property `$implicitRules` otherwise your validation method will not be fired.
