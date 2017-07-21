---
layout: post
title: Queues and slow jobs with Laravel
image: /assets/Laravel-5.png
date: 2017-06-21 01:06:05.000000000 -03:00
type: post
published: true
status: published
categories:
- php
tags:
- queues,
- laravel,
- quickbooks,
- php
author:
  login: matheusmarabesi
  email: matheus.marabesi@gmail.com
  display_name: Matheus Marabesi
  first_name: Matheus
  last_name: Marabesi
---

Queues are commonly used on a daily basis of software development, even the IoT world
has an specific protocol that implements this concept. Laravel does
the same providing developers with an amazing API.

Here, we are going to focus on the theory and practice itself being
independent of any vendor such as Amazon or Beanstalkd, for that
you can check [Laravel's documentation](https://laravel.com/docs/queues).

## Basics

The first thing to notice is how Laravel handles the configuration part,
as usual the configuration part is in the **config** folder, the file queue.php
is the place to set up the details of our service.

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Queue Driver
    |--------------------------------------------------------------------------
    |
    | Laravel's queue API supports an assortment of back-ends via a single
    | API, giving you convenient access to each back-end using the same
    | syntax for each one. Here you may set the default queue driver.
    |
    | Supported: "sync", "database", "beanstalkd", "sqs", "redis", "null"
    |
    */

    'default' => env('QUEUE_DRIVER', 'sync'),

    /*
    |--------------------------------------------------------------------------
    | Queue Connections
    |--------------------------------------------------------------------------
    |
    | Here you may configure the connection information for each server that
    | is used by your application. A default configuration has been added
    | for each back-end shipped with Laravel. You are free to add more.
    |
    */

    'connections' => [

        'sync' => [
            'driver' => 'sync',
        ],

        'database' => [
            'driver' => 'database',
            'table' => 'jobs',
            'queue' => 'default',
            'retry_after' => 90,
        ],

        'beanstalkd' => [
            'driver' => 'beanstalkd',
            'host' => 'localhost',
            'queue' => 'default',
            'retry_after' => 90,
        ],

        'sqs' => [
            'driver' => 'sqs',
            'key' => 'your-public-key',
            'secret' => 'your-secret-key',
            'prefix' => 'https://sqs.us-east-1.amazonaws.com/your-account-id',
            'queue' => 'your-queue-name',
            'region' => 'us-east-1',
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
            'queue' => 'default',
            'retry_after' => 90,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Failed Queue Jobs
    |--------------------------------------------------------------------------
    |
    | These options configure the behavior of failed queue job logging so you
    | can control which database and table are used to store the jobs that
    | have failed. You may change them to any database / table you wish.
    |
    */

    'failed' => [
        'database' => env('DB_CONNECTION', 'mysql'),
        'table' => 'failed_jobs',
    ],

];
```

The dotenv approach used is the best thing of it, as you could see
the configuration file is almost enteirely driven by it. sync is the default
driver to use queues, which means that Laravel won't use any queue at all, it will
just run the code synchronously as it runs normally.

The first change is not in this file, it is in the .env file, created automatically 
when Laravel is installed, we are going to use the database drive.

```
 QUEUE_DRIVER=database
```

Cool, the next thing to do is to create the necessary tables to handle the queue.
Laravel has an Artisan helper to make it for us, when the database is properly configured,
go in your terminal and run the folowing code:

```
php artisan queue:table
```

The Artisan command will genenrate a migration file, which  contains the table struture,
then we need to execute the migrate command to create the table in our database

```
php artisan migrate
```

## Creating services

The most common example is to send an email through the queue system. If you are wondering
why, the answer is simple. Queues give a friedly feedback to the user, which means that 
they will receive an answer as fast as possible while the applicationis still working in the background.
 
For this reason Laravel has a few methods that work great with sending email 

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function send()
    {
        Mail::later(10, 'welcome.blade', ['data' => 'Email sent!'], function($message) {
            $message->to('my@email.com');
        });  
        
        return 'Email has been sent successfully!';      
    }
}
```

The code above ilustrates how would it be to send an email using the queue, usually to send emails we invoke the method
**send**, but the Laravel documentation gives to us a good reason to queue: 

"Since sending email messages can drastically lengthen the response time of your application, many developers choose to 
queue email messages for background sending. Laravel makes this easy using its built-in unified queue API." - [Laravel docs](https://laravel.com/docs/5.4/mail#configuring-the-view)

If you didn't notice, the method invoked here is the later, and its first argument is how many seconds it should be delayed.
In our case we are going to send the email after 10 seconds, but if you run this code you will immediately see the message: 
"Email has been sent successfully!".
