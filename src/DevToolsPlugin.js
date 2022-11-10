import {
  nightwatchStringifyChromeRecording,
  stringifyParsedStep
} from "@nightwatch/chrome-recorder";

export class RecorderPlugin {
  async stringify(recording) {
    return await nightwatchStringifyChromeRecording(JSON.stringify(recording));
  }
  async stringifyStep(step) {
    return await stringifyParsedStep(step);
  }
}

/* eslint-disable no-undef */
chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  /* name=*/
  'Nightwatch Test',
  /* mediaType=*/
  'text/javascript'
);
