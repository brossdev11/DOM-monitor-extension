/**
 * Represents a log entry for mutation records, capturing various details about DOM changes.
 */
export interface LogEntry {
  type: MutationRecord['type'];
  target: Node;
  addedNodes: NodeList;
  removedNodes: NodeList;
  previousSibling: Node | null;
  nextSibling: Node | null;
  attributeName: string | null;
  attributeNamespace: string | null;
  oldValue: string | null;
  newValue: string | null;
  description: string;
}

/**
 * Represents a mapping of tab IDs to their active state.
 */
export type StorageTabs = {
  [key: number]: boolean; // Key is the tab ID, value indicates if the tab is active
};

/**
 * Represents the storage structure for managing active and ready tabs.
 */
export type StorageItems = {
  activeTabs: StorageTabs; // Tabs currently active
  readyTabs: StorageTabs; // Tabs that are ready (but may not be active)
};

/**
 * Represents a message request with a type indicating the desired action.
 */
export type MessageRequest = {
  type: 'start' | 'stop'; // Type of action to perform ('start' or 'stop')
};
