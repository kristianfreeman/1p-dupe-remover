const util = require('util');
const exec = util.promisify(require('child_process').exec);

const {groupBy, sortBy} = require('lodash')

const vault = process.env.VAULT
if (!vault) {
  console.log("Need VAULT env var set")
  return
}

async function main() {
  const listCmd = `op item list --vault ${vault} --format json`
  const { stdout } = await exec(listCmd)
  const allItems = JSON.parse(stdout)
  processDupes(allItems)
}

function processDupes(list) {
  const grouped = groupBy(list, 'title')
  Object.keys(grouped).forEach(group => {
    if (grouped[group].length > 1) {
      const sorted = sortBy(grouped[group], 'updated_at')
      const dupe = sorted[0]
      deleteDupe(dupe)
    }
  })
}

async function deleteDupe(dupe) {
  const tagCmd = `op item delete ${dupe.id} --vault ${vault} --archive`
  const { stdout } = await exec(tagCmd)
  console.log(`Deleted dupe for ${dupe.title}`)
}

main()
