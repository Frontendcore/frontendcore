tap-eater
=========

Consumes [TAP file](http://podwiki.hexten.net/TAP/TAP.html?page=TAP) and sends an email in case of failed tests.

## Installation

```
sudo apt-get install sendmail sendmail-bin
npm install --global tap-eater
```

## Usage

tap-eater consumes TAP data from stdin:

```
cat examples/yslow.tap | tap-eater --email-to "foo@bar.net" --email-subject "YSlow test for bar.net" -v
```

```
tap-eater --help
```
