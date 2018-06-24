---
layout: post
title: Custom validator with Laravel 5 +
date: 2017-05-31 01:06:05.000000000 -03:00
type: post
image: https://upload.wikimedia.org/wikipedia/commons/3/3d/LaravelLogo.png
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
- custom validator
author:
login: matheusmarabesi
email: matheus.marabesi@gmail.com
display_name: Matheus Marabesi
first_name: Matheus
last_name: Marabesi
---

# Custom validator with Laravel 5+

Laravel comes with powerful features to validate your data, the official documentation has tons of examples to used. 
Usually the validation is really straight forward, it takes a request as parameter and the second parameter is an array
with all the rules to be validated.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookController extends Controller
{

    public function save(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'author' => 'required|min:3',
        ]);
    }

}
```

The goodness about that is if any rule fails, Laravel will return a response with all errors that occurred within the 
messages.

Though if common to have custom rules to be applied when submitting data to any application. 

For that Laravel provide us with a simple and powerful interface, the first thing is to extend the Validator class
from Laravel framework.

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

Notice that we are under the namespace `App\Validators` which means that for this example we have a folder to store
all validators.

The Laravel Framework itself uses this approach, the class [Validator](https://laravel.com/api/5.2/Illuminate/Validation/Validator.html) brings the core validation from the Framework such as, require, between a value, min value, max value and so on.

Second thing to have a look is the convention name of each method. You must use the *validate* prefix, this is a way
to tell Laravel that this method can be used to validate data.

Now before we use the validator class that we just created, one more step is needed. Laravel doesn't know about our 
validation class, and we tell it using a ServiceProvider.

```php
<?php

namespace App\Providers;

use App\Validators\MyCustomRule;
use Validator;
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

All parameters that are required by the constructor are from the Laravel validator class base, so as we are
extending it we must pass all arguments as well(Thanks Laravel D.I).

So now we are all set to use our custom validation, and in order to do that is a matter of adding the rule we've 
created into the array rules given to the validate method.

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

Here we'e changed the required rule by the one we've created. The name is the same of our method, but in [snake case](https://en.wikipedia.org/wiki/Snake_case) and without the *validate* prefix.

## Important tips to be aware of

1. We used the class AppServiceProvider to register our validator, it is practical and fast. But depending on the situation
you might want to create your own service provider to register those classes.


## Empty fields trap

All custom validations do not accept empty fields by default. If you want to have it you must override the property
`$implicitRules` otherwise your validation method will not be fired.

