import { execa } from 'execa'

async function prepare() {
  await execa('npx', ['simple-git-hooks'])
}

prepare()
