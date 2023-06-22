import {Game} from "./object/game.class";
import {getFile, parseFile} from "./utils";

const dataset = getFile();
const {map, adventurers} = parseFile(dataset);

const game = new Game({map, adventurers});
game.play();
