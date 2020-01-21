# timbecker.xyz

Tim Becker's personal site. I made it from scratch over the course of the long weekend, 1/18/20-1/20/20.

## Website

The website is written with React and built with [umi](https://umijs.org/).

You can find all the source code in the [site directory](https://github.com/TheTimBecker/timbecker-xyz/tree/master/site).

## Infrastructure

All of the infrastructure for the site is managed by Terraform. The only exception is the Route53 hosted zone, which I created manually and haven't yet imported it into Terraform. I'm experimenting with running Terraform in a lambda and didn't want to accidentally change or delete the nameservers and have DNS propogation really slow me down.

You can find all the source code in the [infrastructure directory](https://github.com/TheTimBecker/timbecker-xyz/tree/master/infrastructure).
