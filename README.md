# timbecker.xyz

Tim Becker's personal site.

I made [the first version](https://github.com/thetimbecker/timbecker-xyz/tree/v1.0.0) from scratch over the course of a long weekend, 1/18/20-1/20/20. I was trying to show off for a company that was looking for a front end developer ([I got the job](https://github.com/thetimbecker/timbecker-xyz/tree/master/site/components/experience/BelleseFullStack.jsx)).

## Website

The website is written with React and built with [umi](https://umijs.org/).

You can find all the source code in the [site directory](https://github.com/thetimbecker/timbecker-xyz/tree/master/site).

## Infrastructure

All of the infrastructure for the site is managed by Terraform. The only exception is the Route53 hosted zone, which I created manually and haven't yet imported it into Terraform. I'm experimenting with running Terraform in a lambda and didn't want to accidentally change or delete the nameservers and have DNS propagation take down the site for a bit.

You can find all the source code in the [infrastructure directory](https://github.com/thetimbecker/timbecker-xyz/tree/master/infrastructure).
