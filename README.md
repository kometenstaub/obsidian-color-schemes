# Color Schemes Experiment

This plugin is an experiment for seeing how feasible it would be to have colour schemes in addition to the already existing themes in Obsidian.

Themes are great, but if you just want to change one colour or keep the default UI, themes aren't the best option. Of course, one could *just* use a code editor, get the Obsidian variables and modify them, but this isn't beginner-friendly.

This plugin is not supposed to be "used in production". It is an experiment for getting a feeling about what kind of settings/inputs users would need or whether it doesn't make sense at all to style Obsidian only based on colour variables, which is what feeling I'm getting now that I've built and played around with it a bit.

It could also be used to show whether colour schemes from theme developers can be used outside of the structure of a theme or whether these colour schemes themselves depend on the styling of special elements, although that's already possible by just putting the variable declarations into a snippet, which is easier than inputting it over this plugin's UI.

---

The settings let you modify both light and dark theme variables with a colour picker. It is the default browser one, so it sadly doesn't support `calc`, `hsla` or `rgba`, but only `rgb`, `hsl` and `hex`. 

There are also an import and export option (thanks to code from Style Settings from @mgmeyers), but this shouldn't be relied upon as it's not future-proofed (i.e. there is no guarantee of backwards-compatibility if additional settings were to be added).

The settings can also be opened like a note (thanks to code from @mgmeyers again), so that changes can be seen interactively.
