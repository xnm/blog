workflow "workflow/build-test" {
  on = "push"
  resolves = ["workflow/ci"]
}

action "workflow/install" {
  uses = "docker://node:10"
  runs = "yarn"
  args = "install"
}

action "workflow/ci" {
  uses = "docker://node:10"
  needs = ["workflow/install"]
  args = "ci"
  runs = "yarn"
}
