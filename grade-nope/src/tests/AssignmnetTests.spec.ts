
import { expect } from 'chai';
import Assignment from '../Assignment';
import Program from '../Program';
import SFile from '../SFile';

describe("testing assignment functions", () => {

    let dueD = new Date("2020-11-16");
    let uploadD = new Date("2020-11-01");
    let assignment = new Assignment(dueD,"hw1");
    let file = new SFile("test_file.docx","this is a test file");
    let program = new Program([file],uploadD,1);


    it("testing getters", () => {
        expect(assignment.getDueDate()).to.equal(dueD);
        expect(assignment.getAssignName()).to.equal("hw1");
        expect(assignment.getSubHis().length).to.equal(0);
    })

    it("testing addSubHistory", () => {
        assignment.addSubHistory(program);
        expect(assignment.getSubHis().length).to.equal(1);

    })



})