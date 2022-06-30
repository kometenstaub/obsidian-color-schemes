# Colour Schemes Experiment

This plugin was an experiment for seeing how feasible it would be to have colour schemes in addition to the already existing themes in Obsidian by only modifying the colour variables like how it is possible for terminals.

**Turns out, there is already a snippet for Style Settings that achieves it: https://github.com/mgmeyers/obsidian-style-settings/blob/main/obsidian-default-theme.css, so this plugin was unnecessary.**


It may now serve a purpose for quickly discovering which elements use which colour variables, as the colours get immediately updated when the colour is changed in the colour picker.

---

The settings let you modify both light and dark theme variables with a colour picker. It is the default browser one, so it sadly doesn't support `calc`, `hsla` or `rgba`, but only `rgb`, `hsl` and `hex`. 

There are also an import and export option (thanks to code from Style Settings from @mgmeyers), but this shouldn't be relied upon as it's not future-proofed (~~i.e. there is no guarantee of backwards-compatibility if additional settings were to be added~~There won't be any updates.).

The settings can also be opened like a note (thanks to code from @mgmeyers again), so that changes can be seen interactively.

