---
title: "VS Code on a Remote Server"
description: "How to run Visual Studio Code on a remote server"
date: "7 September 2019"
lastUpdate: "2 October 2019"
author: "John Henry"
heroImage: "/vendor/img/www.pexels.com/pixabay/view-of-street-from-a-glass-window.jpg"
alt: "Astro"
layout: "../../../components/BlogPage.astro"
tags: ["programming", "experimenting"]
---

These days, it is easy to set up a web server where you can program remotely using virtually any client device.

It is not difficult to do this using secure shell alone, but here are a few methods that can enhance this experience using the [Visual Studio Code](https://code.visualstudio.com) editor.

## Definitions

- CL = Command Line
- FS = File System

## Pre-Requisites

This tutorial assumes that you are already famaliar with using [secure shell (SSH)](https://en.wikipedia.org/wiki/Secure_Shell).

You _should_ at least be famaliar with logging into a remote server using [key-based authentication](https://www.ssh.com/ssh/key/).

## Method 1 : code-server

[Code-server](https://github.com/cdr/code-server) creates a web server with an instance of a web version of Visual Studio Code that you can access via a browser.

0. Install code-server on your server.
1. Access server's CL via SSH.
2. On server, run `code-server <path to workspace or directory>`.
3. You can access server's FS and CL through password-secured web interface at <serveraddress>:8443

## Method 2 : sshcode

[Sshcode](https://github.com/cdr/sshcode) works similarly to code-server (it's actually built on top of it) but uses a client program to set up the web server. Additionally, if you're using chrome, it will open a customized window with Visual Studio Code keybinding in tact.

0. Install chrome and sshcode on client
1. On client, run `sshcode <user>@<serveraddress>`
2. Access server's FS and CL through chrome window.

## Method 3 : Visual Studio Code

0. Install [Visual Studio Code](https://code.visualstudio.com/) on client
1. Install [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension
2. From extenison menu, connect <user>@<serveraddress>
3. Access server's FS and CL through Visual Studio Code
4. From extension menu, tunnel ports from server to client.

## Next Steps

To supplement the above methods, you may want to learn about:

- mounting file remote folders locally and using any editor you want using [sshfs](https://github.com/libfuse/sshfs)
- accessing other resources on your remote maching via [tunneling](https://www.ssh.com/ssh/tunneling/example).
- mitigating unstable remote [mobile] connections with [mosh](https://mosh.org/).
- customizations and pitfalls of above programs by reading their documetion.
