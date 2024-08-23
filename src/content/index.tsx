import browser from 'webextension-polyfill';
import { axiosInstance } from '../utils';
import { LogEntry, MessageRequest } from '../utils/types';

// Observe mutation only after page fully loaded

const observer = new MutationObserver((mutationsList: MutationRecord[]) => {
  mutationsList.forEach((mutation: MutationRecord) => {
    // Initialize a log entry object for post
    const logEntry: LogEntry = {
      type: mutation.type,
      target: mutation.target,
      addedNodes: mutation.addedNodes,
      removedNodes: mutation.removedNodes,
      previousSibling: mutation.previousSibling,
      nextSibling: mutation.nextSibling,
      attributeName: mutation.attributeName,
      attributeNamespace: mutation.attributeNamespace,
      oldValue: mutation.oldValue,
      newValue: '',
      description: '',
    };

    // Build a human-readable description of the mutation
    switch (mutation.type) {
      case 'childList':
        logEntry.description = `ChildList mutation: ${mutation.addedNodes.length} nodes added, ${mutation.removedNodes.length} nodes removed.`;
        break;
      case 'attributes':
        if (mutation.target instanceof Element) {
          logEntry.newValue = mutation.target.getAttribute(mutation.attributeName!);
          logEntry.description = `Attributes mutation: The ${mutation.attributeName} attribute was modified. Old value: ${mutation.oldValue}, New value: ${logEntry.newValue}`;
        }
        break;
      case 'characterData':
        if (mutation.target instanceof CharacterData) {
          logEntry.newValue = mutation.target.data;
          logEntry.description = `CharacterData mutation: Data changed from "${mutation.oldValue}" to "${logEntry.newValue}".`;
        }
        break;
      default:
        logEntry.description = 'Unknown mutation type.';
    }

    // Post mutation to backend server
    axiosInstance.post('/alert', {
      ...logEntry,
      website_url: window.location.host,
      type: mutation.type,
    });
  });
});

// Define the target body element to observer
const targetNode = document.body;

// Observer options
const observerConfig: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
  attributeOldValue: true,
  characterDataOldValue: true,
};

// Define event listener to trigger observer
browser.runtime.onMessage.addListener(
  (request: MessageRequest, sender: browser.Runtime.MessageSender, sendResponse: () => void) => {
    if (request.type === 'stop') {
      observer.disconnect();
    } else if (request.type === 'start') {
      observer.observe(targetNode, observerConfig);
    }
    sendResponse();
  }
);
