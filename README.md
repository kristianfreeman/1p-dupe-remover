# 1p-dupe-remover

Simple tool for removing duplicates in 1Password using the local CLI.

## Requirements

- [1Password CLI](https://developer.1password.com/docs/cli)

## Usage

```sh
$ VAULT=VAULT_NAME npm start
```

By default, the tool will find any 1Password items that have identical titles and soft-delete (archive) the older item, based on the `updated_at` value.

The code is pretty straightforward, so feel free to take it and customize to your liking.

Note that the `op` CLI appears to rate-limit, so you may need to run it a few times for it to fully complete.
