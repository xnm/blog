workflow "workflow/build-test" {
  on = "push"
  resolves = ["Unit Test"]
}

action "workflow/install" {
  uses = "docker://node:10"
  runs = "yarn"
  args = "install"
}

action "workflow/ci" {
  uses = "docker://node:10"
  needs = ["Install Dependencies"]
  args = "ci"
  runs = "yarn"
}
