workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "Install Dependencies" {
  uses = "aquariuslt/yarn@master"
}

action "Unit Test" {
  uses = "aquariuslt/yarn@master"
  needs = ["Install Dependencies"]
  args = "test"
}
