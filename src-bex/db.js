// Class to interact with Chrome local storage for data manipulation
export class db {
    constructor(collection) {
        this.collection = collection;
    }

    // Method to write data to local storage
    async write(data) {
        const collection = {};
        collection[this.collection] = data;
        await chrome.storage.local.set(collection);
    }

    // Method to check if the collection exists in local storage
    async hasCollection() {
        const collection = new Promise((resolve,) => {
            chrome.storage.local.get(this.collection, async item => {

                // Resolve to true if the collection exists, otherwise resolve to false
                if (item[this.collection] == undefined) {

                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
        return await collection;
    }

    // Method to create the collection in local storage if it doesn't exist
    async createCollection() {
        if (await this.hasCollection() == false) {
            const collectionObject = {};
            collectionObject[this.collection] = {};
            await chrome.storage.local.set(collectionObject);
            return true;
        }
        else {
            return true
        }
    }

    // Method to insert data into the collection in local storage
    async InsertIntoCollection(key, data, max) {
        if (data != undefined) {
            if (await this.hasCollection()) {
                chrome.storage.local.get(this.collection, async (item) => {
                    var collection = item[this.collection];
                    if (collection == undefined) {
                        collection = {}
                    }
                    if (max == undefined) {
                        // Insert the data into the collection
                        collection[key] = data;
                        await this.write(collection);
                    } else {
                        const keys = Object.keys(collection);
                        const keyLength = keys.length;

                        if (keyLength >= max) {
                            // If the collection has reached its maximum size
                            // Remove the oldest item from the collection and insert the new data
                            const lastKey = keys.pop();
                            delete collection[lastKey];
                            const ob = {};
                            ob[key] = data;
                            const newCol = { ...collection, ...ob };
                            await this.write(newCol);
                        } else {
                            // Insert the new data into the collection
                            const ob = {};
                            ob[key] = data;
                            const newCol = { ...collection, ...ob };
                            await this.write(newCol);
                        }
                    }
                });
            }
        } else {
            return false;
        }
    }

    // Method to retrieve multiple items from the collection based on specified criteria
    async getMany({ start, limit, all, object }) {
        const promise = new Promise((resolve) => {
            chrome.storage.local.get(this.collection, (item) => {
                if (item != undefined) {
                    if (all == false) {
                        const collection = item[this.collection];
                        if (collection != null) {
                            const values = Object.values(collection);
                            if (values.length > 0) {
                                const slice = values.slice(start, limit);
                                resolve(slice);
                            } else {
                                resolve([]);
                            }
                        } else {
                            resolve([]);
                        }
                    } else {
                        if (object) {
                            resolve(item[this.collection]);

                        }
                        else {
                            resolve(Object.values(item[this.collection]));

                        }
                    }
                }
                else {
                    resolve([])
                }

            });
        });
        return await promise;
    }

    // Method to retrieve a single item from the collection based on the key
    async getOne(key) {
        const promise = new Promise((resolve,) => {

            chrome.storage.local.get(this.collection, async (items) => {
                if (items[this.collection] && items[this.collection][key]) {
                    const item = items[this.collection][key];
                    resolve(item);
                } else {
                    await this.createCollection();
                    resolve(null);
                }
            });
        });
        return await promise;
    }


    // Method to retrieve the entire collection
    async getCollection(values) {
        const promise = new Promise((resolve,) => {
            chrome.storage.local.get(this.collection, (item) => {
                if (values) {
                    resolve(Object.values(item[this.collection]));

                }
                else {
                    resolve(item)

                }
            });
        });
        return await promise;
    }

    // Method to delete an item from the collection based on the key
    async deletedITem(key) {
        return new Promise((resolve) => {
            chrome.storage.local.get(this.collection, (item) => {
                const collection = item[this.collection];
                if (collection[key] != undefined) {
                    if (delete collection[key]) {
                        this.write(collection).then(() => {
                            resolve(true);
                        });
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        });
    }

    // Method to insert data into the collection using an auto-generated index
    async insertAoutoIndex(data, max) {
        chrome.storage.local.get(this.collection, (item) => {
            const col = item[this.collection];
            if (max == undefined) {
                col[Object.keys(col).length] = data;
                this.write(col);
            }
        });
    }

    // Method to clear the entire collection from local storage
    async cleardb() {
        await chrome.storage.local.remove(this.collection);
    }

    // Method to export the entire database as a JSON string
    async exportdb() {
        const promise = new Promise((resolve,) => {
            chrome.storage.local.get(null, (items) => {
                const json = JSON.stringify(items);
                resolve(json);
            });
        });
        return await promise;
    }

    static async clear() {

        await chrome.storage.local.clear()


    }


}

// Exporting the dictionary of collections
export const myCollections = { 'my_chats': 'my_chats', 'chats_keys': 'chats_keys', 'recent': 'recent', 'folders': 'folders', 'folder_items': 'folder_items' };
