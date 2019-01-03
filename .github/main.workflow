workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "Install Dependencies" {
  uses = "docker://node:10"
  runs = "yarn"
  args = "install"
}

action "Unit Test" {
  uses = "docker://node:10"
  needs = ["Install Dependencies"]
  args = "test"
  runs = "yarn"
}
