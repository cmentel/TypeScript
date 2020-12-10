import SFile from './SFile'

/**
 * Class to represent a program that can be submitted or analyzed
 * files: List of SFiles that this program has
 * uploadDate: When this program was uploaded to the site
 * studentID: ID associated with the student that uploaded this program
 */
export default class Program {
    private files: SFile[]
    private uploadDate: Date
    private studentID: number
    constructor(files: SFile[], uploadDate: Date, studentID: number) {
        this.files = files
        this.uploadDate = uploadDate
        this.studentID = studentID
    }
}