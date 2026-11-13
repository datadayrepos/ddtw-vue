# Npm Publication

`npm run pack:release` runs the reviewed library build and verifies a README-free
local archive in the ignored `.npm-package/` directory. It does not publish.
An operator may supply `-- --out /absolute/output/directory`.

Only reviewed code, declarations, required runtime assets and legal notices are
staged. Agent instructions, documentation, nonlegal Markdown, maps and test
material are excluded. Public resolution/dependency metadata is preserved.

Normal source-root packing/publication is blocked. For a separately authorized
release, prepare the archive and use `npm run pub`; it rechecks current artifact
inputs and publishes those exact verified bytes, without rebuilding. Repack after
source/build/manifest changes. Existing source checks are not waived by packing.
A failed build or missing declared asset is a release blocker, not permission to
publish a broader source payload. Git operations and releases stay human-owned.

The ESM build externalizes declared peers and runtime JavaScript dependencies.
Component styles and explicit dependency CSS are combined into the existing
`dist/style.css` export. Declarations have no source-map references; bundled
`node_modules` and maps remain blocked by the archive checks.
