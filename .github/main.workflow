workflow "Build and test on push" {
  on = "push"
  resolves = ["Unit Test"]
}

action "installdependencies" {
  uses = "docker://node:10"
  runs = "yarn"
  args = "install"
}

action "unittest" {
  uses = "docker://node:10"
  needs = ["Install Dependencies"]
  args = "ci"
  runs = "yarn"
}
