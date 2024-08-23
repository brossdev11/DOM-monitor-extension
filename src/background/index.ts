import browser from 'webextension-polyfill';
import { StorageItems } from '../utils/types';

/**
 * Starts or stops the extension functionality based on the tab state.
 * Updates icon and storage state accordingly.
 * @param tab - The tab that triggered the action.
 */
const start = (tab: browser.Tabs.Tab) => {
  browser.storage.local.get(['activeTabs', 'readyTabs']).then((items) => {
    const { activeTabs = {}, readyTabs = {} } = items as StorageItems;

    if (tab.id !== undefined) {
      // Toggle tab state between active and inactive
      if (activeTabs[tab.id]) {
        // If tab is currently active, set it to inactive
        activeTabs[tab.id] = false;
        browser.storage.local.set({ activeTabs });

        browser.action.setIcon({
          path: {
            16: 'images/extension_16-inactive.png',
            32: 'images/extension_32-inactive.png',
            48: 'images/extension_48-inactive.png',
            128: 'images/extension_128-inactive.png',
          },
        });

        browser.tabs.sendMessage(tab.id, { type: 'stop' });
      } else {
        // If tab is not active, set it to active
        if (!readyTabs[tab.id]) {
          readyTabs[tab.id] = true;
        }

        activeTabs[tab.id] = true;
        browser.storage.local.set({ readyTabs, activeTabs });

        browser.action.setIcon({
          path: {
            16: 'images/extension_16.png',
            32: 'images/extension_32.png',
            48: 'images/extension_48.png',
            128: 'images/extension_128.png',
          },
        });

        browser.tabs.sendMessage(tab.id, { type: 'start' });
      }
    }
  });
};

/**
 * Restarts the extension functionality for the given tab.
 * Updates the tab state and icon based on the active state.
 * @param tab - The tab that triggered the restart.
 */
const restart = (tab: browser.Tabs.Tab) => {
  browser.storage.local.get(['activeTabs']).then((items) => {
    const { activeTabs = {} } = items as StorageItems;
    if (tab.id !== undefined) {
      if (activeTabs[tab.id]) {
        browser.tabs.sendMessage(tab.id, { type: 'start' });
      } else {
        browser.action.setIcon({
          path: {
            16: 'images/extension_16-inactive.png',
            32: 'images/extension_32-inactive.png',
            48: 'images/extension_48-inactive.png',
            128: 'images/extension_128-inactive.png',
          },
        });
      }
    }
  });
};

// Listener for extension icon click
browser.action.onClicked.addListener((tab) => {
  browser.storage.local.get(['readyTabs']).then((items) => {
    const { readyTabs = {} } = items as StorageItems;

    if (tab.id !== undefined) {
      if (!readyTabs[tab.id]) {
        readyTabs[tab.id] = true;

        browser.storage.local.set({ readyTabs });
      }

      start(tab);
    }
  });
});

// Listener for tab removal
browser.tabs.onRemoved.addListener((tabId) => {
  browser.storage.local.get(['activeTabs', 'readyTabs']).then((items) => {
    const { activeTabs = {}, readyTabs = {} } = items as StorageItems;

    delete activeTabs[tabId];
    delete readyTabs[tabId];

    browser.storage.local.set({ readyTabs, activeTabs });
  });
});

// Listener for tab activation
browser.tabs.onActivated.addListener((activeInfo) => {
  restart({ id: activeInfo.tabId } as browser.Tabs.Tab);
});

// Listener for tab updates
browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  browser.storage.local.get(['activeTabs', 'readyTabs']).then((items) => {
    const { activeTabs = {}, readyTabs = {} } = items as StorageItems;

    if (changeInfo.status === 'complete') {
      readyTabs[tabId] = false;
      activeTabs[tabId] = false;

      browser.storage.local.set({ readyTabs, activeTabs });

      browser.action.setIcon({
        path: {
          16: 'images/extension_16-inactive.png',
          32: 'images/extension_32-inactive.png',
          48: 'images/extension_48-inactive.png',
          128: 'images/extension_128-inactive.png',
        },
      });
    }
  });
});
