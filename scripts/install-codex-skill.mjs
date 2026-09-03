import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(projectRoot, 'skills', 'amazon-image-studio')
const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), '.codex')
const target = path.join(codexHome, 'skills', 'amazon-image-studio')

await stat(source)
await mkdir(path.dirname(target), { recursive: true })

let targetExisted = false
try {
  await stat(target)
  targetExisted = true
  await rm(target, { recursive: true, force: true })
  console.log(`Existing Skill removed: ${target}`)
} catch (error) {
  if (error?.code !== 'ENOENT') throw error
}

await cp(source, target, { recursive: true })
console.log(`Installed amazon-image-studio Skill to: ${target}`)

if (!targetExisted) {
  const quickStart = await readFile(path.join(source, 'references', 'quick-start.md'), 'utf8')
  console.log('\n首次使用提示：\n')
  console.log(quickStart)
} else {
  console.log('\nSkill 已更新。需要查看用法时，请在 Codex 中询问“这个 Skill 怎么用？”')
}
