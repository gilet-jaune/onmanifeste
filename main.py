"""mkdocs-macros module: helpers available in every page.

res("id", "text") links to a directory resource by its id, so a URL lives only in
docs/data/resources.json and is fixed (and checked) in one place.
"""


def define_env(env):
    resources = {r["id"]: r for r in env.variables["resources"]}

    @env.macro
    def res(resource_id, text=None):
        if resource_id not in resources:
            raise KeyError(f"unknown resource '{resource_id}' (see docs/data/resources.json)")
        r = resources[resource_id]
        return f"[{text or r['name']}]({r['url']})"
