import { initializeJourneyBand } from "./bands/journey.js";
import { initializeLibraryBand } from "./bands/library.js";
import { initializeWebBand } from "./bands/web.js";
import { initializeWeighingBand } from "./bands/weighing.js";
import { initializeRevealObserver, initializeSiteChrome } from "./chrome.js";

initializeSiteChrome();
initializeRevealObserver();
initializeJourneyBand();
initializeLibraryBand();
initializeWebBand();
initializeWeighingBand();
