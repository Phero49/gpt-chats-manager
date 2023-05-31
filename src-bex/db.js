
export class db {
    constructor(collection) {
        this.collection = collection
    }

    //this method write to local storage

    async write(data) {
        //takes data then insert it
        const collection = {}
        collection[this.collection] = data

        await chrome.storage.local.set(collection)

    }

    async hasCollection() {
        //check if collection exist
        const collection = new Promise((resolve, reject) => {
            chrome.storage.local.get(this.collection, item => {
                if (item !== null || item != {}) {

                    resolve(true)
                }
                else {

                    resolve(false)


                }
            })
        })


        return await collection
    }

    async createCollection() {
        //create collection

        if (await this.hasCollection() == false) {
            const collectionObject = {};
            collectionObject[this.collection] = {}
            await chrome.storage.local.set(collectionObject)

            return true
        }

    }

    async InsertIntoCollection(key, data, max) {

        if (data != undefined) {

            if (await this.hasCollection()) {

                chrome.storage.local.get(this.collection, async (item) => {

                    const collection = item[this.collection]
                    if (max == undefined) {
                        collection[key] = data

                        await this.write(collection)
                    }
                    else {
                        const keys = Object.keys(collection)
                        const keyLength = keys.length

                        if (keyLength >= max) {
                            const lastKey = keys.pop()
                            delete collection[lastKey]
                            const ob = {}
                            ob[key] = data
                            const newCol = { ...collection, ...ob }
                            await this.write(newCol)

                        }
                        else {

                            const ob = {}
                            ob[key] = data
                            const newCol = { ...collection, ...ob }

                            await this.write(newCol)

                        }
                    }


                })
            }
            else {
                console.error('collection does not exist')
            }


        }
        else {
            return false
        }
    }

    async getMany({ where, filed, start, limit, all, key }) {

        const promise = new Promise((resolve, reject) => {
            chrome.storage.local.get(this.collection, (item) => {

                if (all == false) {
                    const collection = item[this.collection]
                    if (collection != null) {

                        const values = Object.values(collection)

                        if (values.length > 0) {

                            const slice = values.slice(start, limit)
                            resolve(slice)
                        }
                        else {
                            resolve([])
                        }
                    }
                    else {
                        resolve([])

                    }




                }
                else {


                    resolve(Object.values(item[this.collection]))

                }


            })
        })



        return await promise

    }

    async getOne(key) {

        const promise = new Promise((resolve, reject) => {
            chrome.storage.local.get(this.collection, (items) => {
                const item = items[this.collection][key]
                resolve(item)
            })
        })

        return await promise

    }

    async getCollection() {

        const promise = new Promise((resolve, reject) => {

            chrome.storage.local.get(this.collection, (item) => {
                resolve(Object.values(item[this.collection]))
            })
        })

        return await promise
    }

    async deletedITem(key) {
        var success = undefined
        chrome.storage.local.get(this.collection, (item) => {

            const collection = item[this.collection]
            if (collection[key] != undefined) {

                if (delete collection[key]) {
                    this.write(collection)

                }
                else {
                    success = false
                }

                success = true
            }
            else {
                success = false
            }

        })

        return success
    }

    async insertAoutoIndex(data, max) {
        chrome.storage.local.get(this.collection, (item) => {
            const col = item[this.collection]
            if (max == undefined) {
                col[Object.keys(col).length] = data

                this.write(col)

            }

        })
    }

    async cleardb() {
        await chrome.storage.local.remove(this.collection)
    }

}


export const myCollections = { 'my_chats': 'my_chats', 'recent': 'recent', 'folders': 'folders', 'folder_items': 'folder_items' }