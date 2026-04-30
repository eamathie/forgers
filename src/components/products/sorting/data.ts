export type DropdownSetup = {
    title: string,
    options: string[]
}

export const dropDowns: DropdownSetup[] = [ // used for setting up dropdowns and their options
    { title: "Price", options: ["Low-high", "High-low"] },
    { title: "Rating", options: ["Low-high", "High-low"] },
    { title: "None", options: []},
]