workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "Install Dependencies" {
  uses = "aquariuslt/github-actions-yarn"
}

action "Unit Test" {
  uses = "aquariuslt/github-actions-yarn"
  needs = ["Install Dependencies"]
  args = "test"
}
