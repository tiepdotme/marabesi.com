---
layout: post
title: PHP import checker - VScode extension to support PHP developers
date: 2020-04-05 01:06:05.000000000 -03:00
image: /images/posts/2020-04-05-php-import-checker-vscode-extension/cover.png
type: article
published: true
status: published
categories:
- php
tags:
- php,
- import,
- checker,
- visual,
- studio,
- code,
- market,
- place,
- extension
---

Vscode is one of the most used editors for web development **[1]**, which supports
various programming languages, including PHP. As its goal is not to be a full
featured PHP IDE, it lacks a few characteristics that help PHP developers
to be more productive. In that list, we can name one: the lack of checking if
an imported class is being used or not.

On the other hand, PHPStorm **[2]** has the ability to check imports being used
built-in - This is a long discussion between editors x IDE's.

PHP import checker **[3]** fills this gap, which offers PHP developers feedback of
unused classes that have been imported into the file.

## Installing the extension

Once installed Vscode, the steps to install PHP import checker are the following:

1. Lunch Vscode
2. Access the extension menu
3. Search for PHP import checker
4. Hit the button install

## PHP import checker features

The extension is enabled by default, once installed it will start to look
for unused classes in PHP files only. The first feature that the extension provides
is a command to run the import checker manually.

The extension runs on PHP files only and by default it will run and scan
the imported classes once the file is saved. Though, there are cases in which
the developer might want to run the scan manually, for that a command is
available. The command can be executed typing "check php import" in the
command palette **[4]** (as depicted by the following GIF).

![Unused class highlight in red, the default color](https://github.com/marabesi/php-import-checker/blob/master/demo.gif?raw=true){:target="_blank"}

By default, the extension uses a red color to highlight the unused classes in the
file. The color can be changed through the directive `php.import.highlight`. The
directive accepts a JSON with the key `color`. The color should be in the hex
format. The JSON settings can be accessed through the command palette as well **[5]**.

```json
{
  "php.import.highlight": {
    "color": "#fff"
  }
}
```

The `color` key inside the directive `php.import.hightligh` was used to provide
a flexible way if needed in the future. This way is possible to add more options
without side effects or need to change previous directives.

![Changing the highlight color from white to yellow](https://github.com/marabesi/php-import-checker/blob/master/demo-color.gif?raw=true){:target="_blank"}

The highlight color can improve the fitness of the extension with different themes
that developers might use, if the theme used by the developer has a red background
it would be harder to note the highlight that the extension adds to the imported
class.

## Conclusion

PHP import checker is an extension that aims to help PHP developers to write better
code, letting the developer know when an unused import is in the file. The extension
is simple and provides a command to run the checker manually and an option for the
developer to change the highlight color.

Besides that the extension is open source and its being developed at Github. There
are edge cases that have been reported and are being tracked on the issues
section of the project.

## References

[1] Top IDE index - The Top IDE Index is created by analyzing how often IDEs' download page are searched on Google. Available: [https://pypl.github.io/IDE.html](https://pypl.github.io/IDE.html "Top IDE index - The Top IDE Index is created by analyzing how often IDEs' download page are searched on Google"){:target="_blank"}. [Accessed: 12 - Apr - 2020]

[2] The Lightning-Smart PHP IDE. Available: [https://www.jetbrains.com/phpstorm](https://www.jetbrains.com/phpstorm "The Lightning-Smart PHP IDE"){:target="_blank"}. [Accessed: 12 - Apr - 2020]

[3] PHP import checker - Visual Studio Code market place. Available: [https://marketplace.visualstudio.com/items?itemName=marabesi.php-import-checker](https://marketplace.visualstudio.com/items?itemName=marabesi.php-import-checker "PHP import checker - Visual Studio Code market place"){:target="_blank"}. [Accessed: 12 - Apr - 2020]

[4] User interface, Command Palette. Available: [https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette "User interface, Command Palette"){:target="_blank"}. [Accessed: 12 - Apr - 2020]

[5] User and Workspace Settings. Available: [https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations "User and Workspace Settings"){:target="_blank"}. [Accessed: 12 - Apr - 2020]