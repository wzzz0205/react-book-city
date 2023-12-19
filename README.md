# React + TypeScript + Vite

这是一个 React18+ts+vite 的实战项目，内容为小说书城

## commit 提交规范

Commitlint 通常结合 Angular 的提交规范（Angular Commit Message Conventions）来使用，这些规范包括了一些预定义的提交类型（Commit Types），每个类型都有其特定的含义。这些类型有助于清晰地传达提交的目的和意图。以下是一些常见的 Commit Types 及其含义：

feat: 新功能（feature）

用于表示引入新的功能或功能改进。
bash
Copy code
git commit -m "feat: add user authentication"
fix: 修复 bug

用于表示修复代码中的 bug。
bash
Copy code
git commit -m "fix: resolve issue with login button"
docs: 文档变更

用于表示只对文档进行了修改。
bash
Copy code
git commit -m "docs: update installation instructions"
style: 代码样式变更

用于表示对代码样式的修改，例如格式化代码、修改缩进等。
bash
Copy code
git commit -m "style: format code according to style guide"
refactor: 代码重构

用于表示对代码的重构，既不是修复错误也不是添加新功能的代码更改。
bash
Copy code
git commit -m "refactor: simplify user authentication logic"
test: 测试变更

用于表示对测试的修改或添加新测试。
bash
Copy code
git commit -m "test: add unit tests for login functionality"
chore: 构建过程或辅助工具的变更

用于表示对构建脚本、辅助工具或其他非业务代码的更改。
bash
Copy code
git commit -m "chore: update dependencies"
perf: 性能优化

用于表示对性能的改进。
bash
Copy code
git commit -m "perf: improve page loading speed"
这些只是一些常见的类型，实际上你可以根据项目的需要定义自己的提交类型。在使用 Commitlint 时，你需要按照规范撰写你的提交信息，以确保它们符合定义的提交类型和格式。
