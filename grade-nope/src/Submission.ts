import Program from "./Program"

/**
 * REACT Class to represent our submission page students will use
 * assignmentID: the ID associated with this assignment
 * subProgram: The program that has been uploaded by a student
 */
export default class Submission {
    private assignmentID: number
    private subProgram: Program
    constructor(assignmentID: number, subProgram: Program) {
        this.assignmentID = assignmentID
        this.subProgram = subProgram
    }
    // Submit the given program to this submissions assignment
    submit(program: Program): void {

    }
}