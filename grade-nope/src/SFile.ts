/**
 * Class to represent a File in a program
 * fileName: the name of this file
 * content: the contents of this file
 */
export default class SFile {
    private fileName: string
    private content: string
    constructor(fileName: string, content: string) {
        this.fileName = fileName
        this.content = content
    }
    public getContent(): string {
        return this.content
    }
}