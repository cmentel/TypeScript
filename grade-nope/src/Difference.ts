/**
 * Class to represent an instance of plagarism in two files
 * targetLoc: The starting and ending index of the similarity in the target file
 * diffLoc: The starting and ending index of the similarity in the diff file
 */
export default class Difference {
    public targetLoc: [number, number]
    constructor(targetLoc: [number, number]) {
        this.targetLoc = targetLoc
    }
}