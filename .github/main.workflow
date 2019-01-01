workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "Install Dependencies" {
  uses = "docker://aquariuslt/yarn@master"
  runs = "yarn"
}

action "Unit Test" {
  uses = "docker://aquariuslt/yarn@master"
  needs = ["Install Dependencies"]
  args = "test"
  runs = "yarn"
}
