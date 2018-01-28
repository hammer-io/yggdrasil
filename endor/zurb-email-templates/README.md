# Using the Zurb email templates

## Viewing/editing a template

In the terminal, move to the `zurb-email-templates` directory and serve
the files in that folder. (If you have php installed, this is as easy
as `php -S localhost:8888`) You can now view the files at `localhost:8888`.

When making a new email template, copy one of the originals into a new
file before making changes. Then, to help keep track of which ones are
custom and which ones are generic, add the file to the list of Yggdrasil
templates in the `index.html` file.

## Preparing it for email use

Before using the html in an email, you need to run it through Zurb's
[Email Inliner](https://foundation.zurb.com/emails/inliner-v2.html), which
will convert html and styles files into one html file with inline styles
that can be put into an email. Finally, copy/paste the results back into
our application into its appropriate place.
