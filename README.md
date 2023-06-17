Website for Gear Weekly Updates!

see: https://gear.rs/weekly-updates/

## Generate Typefully Draft

1. Get your API KEY of typefully.com

Open [Settings > Integrations][0], and copy your api key to your clipboard.

2. Run the workflow

Open [Worflows > Typefully][1] and click the button <kbd>Run workflows</kbd>,
fill your API KEY and the title of the thread, then click the green button
<kbd>Run workflows</kbd>.

Done.

3. Check your typefully draft

Just open https://typefully.com/ as usual.

## Development

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## LICENSE

GPL-3.0-or-later

[0]: https://typefully.com/?settings=integrations
[1]: https://github.com/gear-tech/weekly-updates/actions/workflows/typefully.yml
