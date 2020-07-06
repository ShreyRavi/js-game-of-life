# [js-game-of-life](https://shreyravi.github.io/js-game-of-life/)
An implementation of Conway's Game of Life using purely JavaScript/CSS/HTML, prioritizing code readability and clarity over efficiency. Support for custom rulesets, population density, FPS settings, colors, and more.

<p align="center"><img src="https://raw.githubusercontent.com/ShreyRavi/js-game-of-life/master/conway_screenshot.PNG" height="93%" width="23%"><br />Conway's Game of Life in action.</p>

## [Live Demo](https://shreyravi.github.io/js-game-of-life/)
Hosted on a GitHub pages environment.

## Custom Rule-Set
This follow's Conway's rules, where the custom rule-set can be inputted in the format:
```
BX/SY
```
where `X` is the number of neighbors required for an empty cell to be 'born' in a location, while `Y` is the number of neighbors required for a living cell to continue living. Thus, Conway's Game of Life can be described as `B3/S23` using this format.

## Supported Rule-Sets
Some interesting rule-sets are supported via drop-down select by default.
- Replicator (`B1357/S1357`)
- Seeds (`B2/S`)
- B25/S4 (`B25/S4`)
- Life without Death (`B3/S012345678`)
- Conway's Game of Life (`B3/S23`)
- 34 Life (`B34/S34`)
- Diamoeba (`B35678/S5678`)
- 2x2 (`B36/S125`)
- HighLife (`B36/S23`)
- Day & Night (`B3678/S34678`)
- Morley (`B368/S245`)
- Anneeal (`B4678/S35678`)

## Usage
Pick a desired ruleset from the dropdown or put in your own ruleset! Choose the population density, desired FPS, colors, and click 'restart simulation' to start simulation using your desired parameters.

## File Breakdown
- **cgol.css** - the CSS for the front-end
- **cgol.js** - the actual JavaScript code logic that runs and updates grid universe with the Game of Life and other simulation games
- **cgol.html** - the HTML for the front-end, basic skeleton for JavaScript to manipulate

## Future Plans
- Improve performance
- Add GPU acceleration or multi-threading support
- Possible WebGL implementation

## License
[The MIT License (MIT)](https://raw.githubusercontent.com/ShreyRavi/js-game-of-life/master/LICENSE)
