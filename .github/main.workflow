workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "Install Dependencies" {
  uses = "actions/npm@e7aaefe"
  args = "install"
}

action "Unit Test" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install Dependencies"]
  args = "test"
}
