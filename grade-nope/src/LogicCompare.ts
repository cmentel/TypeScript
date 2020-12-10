import ICompare from './ICompare'
import SFile from './SFile'
import Difference from './Difference'

/**
 * Class to represent a more in depth comparison between two SFiles
 * targetFile: The first file to be compared
 * diffFile: The second file to be compared
 */
export default class LogicCompare implements ICompare {
    private targetFile: SFile
    private diffFile: SFile
    constructor(target: SFile, diff: SFile) {
        this.targetFile = target
        this.diffFile = diff
    }
    // Return any possible instances of plagarism between the two member files in the form of a Difference[]
    compare(): Difference[] {
        return <Difference[]>[]
    }

    // Rate the similarity of the two member SFiles with a percent
    similarity(): number {
        return 0
    }
}