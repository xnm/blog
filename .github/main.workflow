workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "Install Dependencies" {
  uses = "aquariuslt/yarn"
}

action "Unit Test" {
  uses = "aquariuslt/yarn"
  needs = ["Install Dependencies"]
  args = "test"
}
