---
layout: post
title: 30 days of VIM - One week after
date: 2018-01-29 20:30:18.000000000 -02:00
type: post
published: true
status: publish
categories:
- Thoughts
tags:
- vim
- text editor
- a byte of vim
- vim adventures
- practical vim
author:
  - Matheus Marabesi
---

It's been one week since I adopted vim as my main editor, and this is the second post about this journey.
If you haven't read the [first](/thoughts/2018/01/21/30-days-of-vim.html) post yet, click here and be happy.

## First impressions

I feel like I have the control over my editor and the navigation is REALLY fast with the `w` and `e` letters.
The key challenge here (I believe, and I haven't achieved yet) is to move the navigation from the key
arrows (up, down, left and right) to `k`, `j`, `h` and `l`. As it seems to be weird at first the book
[Practical Vim](https://pragprog.com/book/dnvim2/practical-vim-second-edition) from Drew Neil in it's
chapter 8 says that using those keys improves the productivity as your hand won't leave the home row.

Besides Drew's book, vimtutor, [vim adventures](https://vim-adventures.com/) and
[A byte of vim](https://vim.swaroopch.com/) encorages the same approach.

## Searching

As I can't use the home row to navigate yet, to search a string in a file, I would say, is one of the
best things to use in vim (which I've been using a lot). VScode uses the combination of `CMD + F`
on MAC, while Vim uses the `/` followed by the desired string.

In the normal mode, just press the key `/` and type what you want, once finished type enter to confirm
the serach. Vim will send the cursor to the first ocurrence in the file. To go through the next occurence
just press `n`.

The second type of search is a bit trickier compared to searching for a string in the current file.
Vim has different approachs to search a string through files and directories, for me, [vimgrep](http://vim.wikia.com/wiki/Find_in_files_within_Vim) is the one I ended up using the most.

VScode turns it simpler than vim though, you just type `CMD + SHIFT + F`.

## Workspaces and vim GUI

Vim runs directly from the terminal, just open a new window and that's it. Though it can be a bit
limitating, so for every new project a new window is required. As I don't like to have a bunch of
terminals openend I jus tried to find something that would fit for me.

The first shot was to find a Mac GUI for vim. The projec [Mac vim](https://github.com/macvim-dev/macvim) is the most popular, with more than 3k stars but unfortunatelly I couldn't stick with it.

The second solution that I found is [TMUX](https://github.com/tmux/tmux/wiki), which I am using right now.
The good part is that I can divide my terminal in as many part as I want and create new windows
inside the existing one.

## Conclusion

For now the biggest change is the workspace shift. Which on VScode I was used to just drag as many folders
as I want, save the workspace, and open it again later. The second thing I miss the most is the auto complete.
Vim has plugins to auto complete as you type, but at least in my case it was a bit slow, I decided to
go without it.

It turns out that is a good way to test your knowledge in the language that you are familiar with, I haven't
had any major problems. If I am not sure about a function in PHP for example, I just go to php.net, the same
applies to Javascript, I just go to the MDN documentation and find what I need.
