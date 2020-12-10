import Difference from "./Difference";
import ICompare from "./ICompare";
import Program from "./Program";

/**
 * REACT class to represent our comparison screen that only Teachers can access
 * target: The first program being compared
 * diff: The second program being compared
 * compares: List of the types of comparisons being done on the given programs
 */
export default class Comparison {
    private target: Program
    private diff: Program
    private compares: ICompare[]
    constructor(target: Program, diff: Program, compares: ICompare[]) {
        this.target = target
        this.diff = diff
        this.compares = compares
    }
    // Comapre the programs given the type of comparison and return all instances of plagarism 
    compareText(comp: ICompare): Difference[] {
        return <Difference[]>[]
    }
    // Compare programs given the type of comparison and return a percent based on the comparison 
    // and how many instances of plagarism were found
    compareSimilarity(comp: ICompare): number {
        return 0
    }
}